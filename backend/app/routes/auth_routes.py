from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from flasgger.utils import swag_from
from app.models.members import Member
from app.utils.email_service import send_verification_email
from flask_jwt_extended import decode_token
from flask import redirect


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
@swag_from({
    'tags': ['Auth'],
    'description': 'Register a new member',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'email': {'type': 'string'},
                    'phone': {'type': 'string'},
                    'gender': {'type': 'string'},
                    'password': {'type': 'string'},
                    'role': {
                        'type': 'string',
                        'enum': ['member', 'admin'],
                        'default': 'member'
                    }
                },
                'required': ['name', 'email', 'phone', 'gender', 'password']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Member registered successfully',
            'examples': {
                'application/json': {
                    'msg': 'Member registered successfully'
                }
            }
        },
        400: {
            'description': 'Email or phone already registered',
            'examples': {
                'application/json': {
                    'msg': 'Email/Phone already registered'
                }
            }
        }
    }
})
def register():
    if request.method == 'OPTIONS':
        return '', 200
    
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    gender = data.get('gender')
    password = data.get('password')
    role = data.get('role', 'member')

    allowed_roles = ['member', 'admin']

    if role not in allowed_roles:
        return jsonify({"msg": "Invalid role selected."}),400 

    if not all([name, email, phone, gender, password]):
        return jsonify({"msg": "All fields are required"}), 400
    
    
    # Check if user exists
    existing_user = Member.query.filter(
        (Member.email==email) | (Member.phone==phone)
    ).first()

    if existing_user:
        return jsonify({"msg": "Email/Phone already registered"}), 400
    
    # Hash password
    hashed_password = generate_password_hash(password)

    #create new member
    new_member = Member(
        name=name,
        email=email,
        phone=phone,
        gender=gender,
        password_hash=hashed_password,
        role=role
    )

    db.session.add(new_member)
    db.session.commit()

    token = create_access_token(
    identity=new_member.email,
    additional_claims={"type": "email_verification"},
    expires_delta=False  # or you can use timedelta(hours=1) for expiry
)

    send_verification_email(new_member.email, new_member.name, token)

    return jsonify({"msg": "Member registered successfully"}), 200


@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
@swag_from({
    'tags': ['Auth'],
    'description': 'Login a member',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'email': {'type': 'string'},
                    'password': {'type': 'string'}
                },
                'required': ['email', 'password']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Login successful',
            'examples': {
                'application/json': {
                    'access_token': 'your_jwt_token_here',
                    'user': {
                        'id': 1,
                        'name': 'Natalie',
                        'email': 'natalie@gmail.com',
                        'role': 'member'
                    }
                }
            }
        },
        401: {
            'description': 'Invalid email or password',
            'examples': {
                'application/json': {
                    'message': 'Invalid email or password.'
                }
            }
        }
    }
})
def login():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    member = Member.query.filter_by(email=email).first()
    if not member or not check_password_hash(member.password_hash, password):
        return jsonify({'message': 'Invalid email or password.'}), 401

    if not member.email_verified:
        return jsonify({
            "message": "Please verify your email before logging in."
        }), 403

    access_token = create_access_token(identity=member.id)
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': member.id,
            'name': member.name,
            'email': member.email,
            'role': member.role,
            'is_first_login': member.is_first_login
        }
    }), 200


@auth_bp.route("/tutorial-seen", methods=["POST"])
@jwt_required()
def tutorial_seen():
    member_id = get_jwt_identity()
    user = Member.query.get(member_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.is_first_login = False
    db.session.commit()
    return jsonify({"message": "Tutorial marked as seen"}), 200

@auth_bp.route("/verify-email/<token>")
def verify_email(token):
    try:
        decoded = decode_token(token)
        email = decoded["sub"]

        user = Member.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404

        user.email_verified = True
        db.session.commit()

        # Send welcome email
        send_welcome_email(user.email, user.name)

        # Redirect to frontend login page with a query param (optional)
        return redirect(f"{os.getenv('FRONTEND_URL')}/auth/login?verified=true")

    except Exception:
        return jsonify({"msg": "Invalid or expired token"}), 400