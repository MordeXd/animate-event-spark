from flask import Blueprint, request, jsonify
from models.user import users_collection

register_bp = Blueprint('register', __name__)

@register_bp.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    
    full_name = data.get("fullName")
    mobile_number = data.get("mobileNumber")
    email_id = data.get("emailId")
    address = data.get("address")
    referred_by = data.get("referredBy")
    has_interest = data.get("hasInterest", False)

    # Basic validation
    if not full_name or not mobile_number or not email_id or not address:
        return jsonify({"error": "All required fields must be filled."}), 400

    # Insert into MongoDB
    user_data = {
        "full_name": full_name,
        "mobile_number": mobile_number,
        "email_id": email_id,
        "address": address,
        "referred_by": referred_by,
        "has_interest": has_interest
    }

    try:
        users_collection.insert_one(user_data)
        return jsonify({"message": "Registration successful!"}), 201
    except Exception as e:
        print("Error inserting user:", e)
        return jsonify({"error": "Failed to register user."}), 500
