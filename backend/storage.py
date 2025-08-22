import csv
import os
from config import Config

# Ensure CSV file exists with headers
def init_csv():
    if not os.path.exists(Config.CSV_FILE):
        with open(Config.CSV_FILE, mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["Full Name", "Mobile Number", "Email ID", "Address", "Referred By", "Has Interest", "Timestamp"])

# Save a new registration to CSV
def save_to_csv(user_data):
    from datetime import datetime
    with open(Config.CSV_FILE, mode="a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([
            user_data["full_name"],
            user_data["mobile_number"],
            user_data["email_id"],
            user_data["address"],
            user_data.get("referred_by", "N/A"),
            "Yes" if user_data.get("has_interest", False) else "No",
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ])
