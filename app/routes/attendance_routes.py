from flask import Blueprint, request, jsonify
from app import db
from app.models.attendance import Attendance
from flasgger.utils import swag_from
from app.utils.auth_helpers import role_required

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
    date = data.get('date')
    status = data.get('status')

    if not member_id or not date or not status:
        return jsonify({"msg": "Missing required fields: member_id, date, status"}), 400
    
    # Create a new attendance record
    attendance = Attendance(member_id=member_id, date=date, status=status)
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