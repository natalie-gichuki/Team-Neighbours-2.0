from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from app.models.members import Member

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 200
    
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    gender = data.get('gender')
    password = data.get('password')

    if not all([name, email, phone, gender, password]):
        return jsonify({"msg": "All fields are required"})
    
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
        password_hash=hashed_password
    )

    db.session.add(new_member)
    db.session.commit()

    return jsonify({"msg": "Member registered successfully"}), 200


@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    member = Member.query.filter_by(email=email).first()
    if not member or not check_password_hash(member.password_hash, password):
        return jsonify({'message': 'Invalid email or password.'}), 401

    access_token = create_access_token(identity=member.id)
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': member.id,
            'name': member.name,
            'email': member.email,
            'role': member.role
        }
    }), 200