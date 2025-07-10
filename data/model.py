import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
import joblib
import os

# Load data
data_path = os.path.join(os.path.dirname(__file__), "employee_data.csv")
df = pd.read_csv(data_path)

# Define features and target
X = df[["job_role", "location"]]
y = df["salary"]

# Preprocessing for categorical columns
preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), ["job_role", "location"])
    ]
)

# Build pipeline
pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", LinearRegression())
])

# Train model
pipeline.fit(X, y)

# Save model
model_path = os.path.join(os.path.dirname(__file__), "salary_model.pkl")
joblib.dump(pipeline, model_path)

print(f"✅ Salary prediction model trained and saved to: {model_path}")
