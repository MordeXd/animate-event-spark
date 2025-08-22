from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import csv

app = Flask(__name__)
CORS(app)

DATA_FILE = os.path.join("storage", "users.csv")

# Ensure storage folder exists
if not os.path.exists("storage"):
    os.makedirs("storage")

# Create CSV file if not exists
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Full Name", "Mobile Number", "Email", "Password"])

@app.route('/')
def home():
    return jsonify({"message": "API is running successfully!"})

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        full_name = data.get("fullName")
        mobile_number = data.get("mobileNumber")
        email = data.get("email")
        password = data.get("password")

        with open(DATA_FILE, "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([full_name, mobile_number, email, password])

        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
