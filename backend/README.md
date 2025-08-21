
# Event Registration Backend

This is a **Flask backend** for an Event Registration form. It stores form submissions in **MongoDB** and provides a REST API for the frontend.

---

## Features

- Accepts registration data via a POST API.
- Stores data in MongoDB.
- Basic validation for required fields.
- CORS enabled to allow requests from frontend.

---

## Tech Stack

- Python 3.x
- Flask
- PyMongo
- MongoDB (local or Atlas)
- Flask-CORS

---

## Project Structure

```
backend/
│
├── app.py              # Main Flask app
├── config.py           # Configuration (Mongo URI)
├── models/
│   └── user.py         # MongoDB schema/collection
├── routes/
│   └── register.py     # Registration API route
└── requirements.txt    # Python dependencies
```

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <repo-url>
cd backend
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set MongoDB URI (optional if using local MongoDB):

```bash
export MONGO_URI="your_mongodb_connection_string"
```

4. Run the server:

```bash
python app.py
```

5. API Endpoint:

```
POST http://127.0.0.1:5000/api/register
```

6. Sample JSON body:

```json
{
  "fullName": "John Doe",
  "mobileNumber": "9876543210",
  "emailId": "john@example.com",
  "address": "City, Country",
  "referredBy": "Friend",
  "hasInterest": true
}
```

---

## Notes

- Ensure MongoDB is running before starting the backend.
- CORS is enabled to allow requests from frontend (React app).
