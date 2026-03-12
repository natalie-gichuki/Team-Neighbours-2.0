from flask import Blueprint, request, jsonify
from app import db
from app.models.attendance import Attendance
from flasgger.utils import swag_from
from datetime import datetime
from app.utils.auth_helpers import role_required
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.members import Member


attendance_bp = Blueprint('attendance', __name__)


# POST REQUEST
@attendance_bp.route('/attendance', methods=['POST', 'OPTIONS'])
@swag_from({
    'tags': ['Attendance'],
    'description': 'Record member attendance',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'member_id': {'type': 'integer'},
                    'date': {'type': 'string', 'format': 'date'},
                    'status': {'type': 'string', 'enum': ['present', 'absent', 'late']}
                },
                'required': ['member_id', 'date', 'status']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Attendance recorded successfully',
            'example': {
                'application/json': {
                    'msg': 'Attendance recorded successfully.'
                }
            }
        },
        400: {
            'description': 'Bad Request',
            'example': {
                'application/json': {
                    'msg': 'Missing required fields or invalid data.'
                }
            }
        }
    }
})

@role_required('admin')
def record_attendance():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()

    #Basic validation to avid key error
    member_id = data.get('member_id')
    date_str = data.get('date')
    status = data.get('status')

    if not member_id or not date_str or not status:
        return jsonify({"msg": "Missing required fields: member_id, date, status"}), 400
    
    # Convert date string to datetime.date
    try:
        date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"msg": "Date must be in YYYY-MM-DD format"}), 400
    # Create a new attendance record
    attendance = Attendance(member_id=member_id, date=date_obj, status=status)
    db.session.add(attendance)
    db.session.commit()

    return jsonify({"msg": "Attendance recorded successfully"})


# GET REQUEST
@attendance_bp.route('/attendance/<int:member_id>', methods=['GET', 'OPTIONS'])
@swag_from({
    'tags': ['Attendance'],
    'description': 'Get specific member attendance records',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'member_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        200: {
            'description': 'Attendance records retrieved successfully',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'member_id': {'type': 'integer'},
                        'date': {'type': 'string', 'formart': 'date'},
                        'status': {'type': 'string'}
                    }
                }
            }, 
            'example': {
                'application/json': [
                    {
                        'id': 1,
                        'member_id': 1,
                        'date': '2026-1-31',
                        'status': 'present'
                    }
                ]
            }
        },
        404: {
            'description': 'Member not found',
            'examples': {
                'application/json': {
                    'msg': 'Member not found'
                }
            }
        }
    }
})
@role_required('admin', 'member')
def get_specifiedAttendance(member_id):
    if request.method == 'OPTIONS':
        return '', 200
    
    attendances = Attendance.query.filter_by(member_id=member_id).all()

    if not attendances:
        return jsonify({"msg": "No attendance records for this member"}), 404
    
    return jsonify([attendance.to_dict() for attendance in attendances]), 200


@attendance_bp.route('/attendance', methods=['GET', 'OPTIONS'])
@swag_from({
    'tags': ['Attendance'],
    'description': 'Get all attendance records',
    'security': [{'Bearer': []}],
    'responses': {
        200: {
            'description': 'Attendance records retrieved successfully.',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'member_id': {'type': 'integer'},
                        'date': {'type': 'string', 'formart': 'date'},
                        'status': {'type': 'string'}
                    }
                }
            },
            'example': {
                'application/json': [
                    {
                        'id': 1, 
                        'member_id': 1,
                        'date': '2026-01-26',
                        'status': 'late'
                    },
                    {
                        'id': 2,
                        'member_id': 2,
                        'date': '2026-02-16',
                        'status': 'absent'
                    }
                ]
            }
        }
    }
})
@role_required('admin')
def get_all_attendances():
    if request.method == 'OPTIONS':
        return '', 200
    
    attendances = Attendance.query.all()

    return jsonify([attendance.to_dict() for attendance in attendances]), 200  


# DELETE ATTENDANCE RECORD
@attendance_bp.route('/attendance/<int:attendance_id>', methods=['DELETE', 'OPTIONS'])
@swag_from({
    'tags': ['Attendance'],
    'description': 'Delete a attendance record',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'attendance_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        200: {
            'description': 'Attendance record deleted successfully',
            'examples': {
                'application/json': {
                    'msg': 'Attendance record deleted successfully'
                }
            }
        },
        404: {
            'description': 'Attendance not found',
            'examples': {
                'application/json': {
                    'msg': 'Attendance not found'
                }
            }
        }
    }
})
@role_required('admin')
def delete_attendance(attendance_id):
    if request.method == 'OPTIONS':
        return '', 200
    
    attendance = Attendance.query.get(attendance_id)

    if not attendance:
        return jsonify({"msg": "Attendance record not found"})
    
    db.session.delete(attendance)
    db.session.commit()

    return jsonify({"msg": "Attendance record deleted successfully."}), 200


@attendance_bp.route('/attendance/<int:attendance_id>', methods=['PATCH'])
@swag_from({
    'tags': ['Attendance'],
    'description': 'Update a attendance record',
    'security': [{'Bearer': []}],
    'parameters': [
        {
            'name': 'attendance_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        },
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'member_id': {'type': 'integer'},
                    'date': {'type': 'string', 'format': 'date'},
                    'status': {'type': 'string', 'enum': ['present', 'absent', 'late']}
                }
            }   
        }
    ],
    'responses': {
        200: {
            'description': 'Attendance record updated successfully',
            'examples': {
                'application/json': {
                    'msg': 'Attendance record updated successfully'
                }
            }
        },
        404: {
            'description': 'Attendance not found',
            'examples': {
                'application/json': {
                    'msg': 'Attendance not found'
                }
            }
        }
    }
})
@role_required('admin')
def update_attendance(attendance_id):
    if request.method == 'OPTIONS':
        return '', 200
    
    attendance = Attendance.query.get(attendance_id)

    if not attendance:
        return jsonify({"msg": "Attendance record not found"})
    
    data = request.get_json()

    member_id = data.get('member_id')
    date_str = data.get('date')
    status = data.get('status')

    if member_id:
        attendance.member_id = member_id
    if date_str:
        try:
            attendance.date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"msg": "Date must be in YYYY-MM-DD format"}), 400
    if status:
        attendance.status = status

    db.session.commit()

    return jsonify({"msg": "Attendance record updated successfully."}), 200


@attendance_bp.route('/attendance/my', methods=['GET'])
@swag_from({ 
    'tags': ['Attendance'],
    'description': 'Get attendance records for the logged-in member',
    'security': [{'Bearer': []}],
    'responses': {
        200: {
            'description': 'attendance records retrieved successfully',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'member_id': {'type': 'integer'},
                        'date': {'type': 'string', 'format': 'date'},
                        'status': {'type': 'string'}
                    }
                }
            },
            'examples': {
                'application/json': [
                    {
                        'id': 1,
                        'member_id': 1,
                        'date': '2023-10-01',
                        'status': 'present'
                    },
                    {
                        'id': 2,
                        'member_id': 1,
                        'date': '2023-10-02',
                        'status': 'absent'
                    }
                ]
            }
        },
        404: {
            'description': 'Member not found',
            'examples': {
                'application/json': {
                    'msg': 'Member not found'
                }
            }
        }
    }
})
@jwt_required()
@role_required('admin', 'member')
def get_my_attendance():
    # get logged-in user id from JWT
    member_id = get_jwt_identity()  # JWT stores member.id

    # get contributions for that member
    attendances = Attendance.query.filter_by(member_id=member_id).all()

    return jsonify([c.to_dict() for c in attendances]), 200