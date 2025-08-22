from flask import Blueprint, request, jsonify
from storage import save_to_csv
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

register_bp = Blueprint('register', __name__)

@register_bp.route('/api/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()

        # Extract fields
        full_name = data.get("fullName")
        mobile_number = data.get("mobileNumber")
        email_id = data.get("emailId")
        address = data.get("address")
        referred_by = data.get("referredBy")
        has_interest = data.get("hasInterest", False)

        # Validation
        if not full_name or not mobile_number or not email_id or not address:
            return jsonify({"error": "All required fields must be filled."}), 400

        # Save to CSV
        save_to_csv({
            "full_name": full_name,
            "mobile_number": mobile_number,
            "email_id": email_id,
            "address": address,
            "referred_by": referred_by,
            "has_interest": has_interest
        })

        return jsonify({"message": "Registration saved to CSV successfully!"}), 201

    except Exception as e:
        print("Error saving to CSV:", e)
        return jsonify({"error": "Failed to save registration."}), 500
