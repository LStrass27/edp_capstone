# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load saved model
model_path = os.path.join(os.path.dirname(__file__), "salary_model.pkl")
model = joblib.load(model_path)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    job_role = data.get("job_role")
    location = data.get("location")

    if not job_role or not location:
        return jsonify({"error": "job_role and location are required"}), 400

    input_df = pd.DataFrame([{"job_role": job_role, "location": location}])
    prediction = model.predict(input_df)[0]

    return jsonify({"predicted_salary": round(prediction, 2)})

if __name__ == "__main__":
    app.run(port=5000)
