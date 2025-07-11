import pandas as pd
import os

# Load employee data
data_path = os.path.join(os.path.dirname(__file__), "employee_data.csv")
df = pd.read_csv(data_path)

# Create username and password columns
df_credentials = pd.DataFrame()
df_credentials["employee_id"] = df["employee_id"]
df_credentials["username"] = df["employee_id"].astype(str) + "@capstone.com"
df_credentials["password"] = df["employee_id"].astype(str)  # Store as string

# Save to CSV
output_path = os.path.join(os.path.dirname(__file__), "user_credentials.csv")
df_credentials.to_csv(output_path, index=False)

print(f"User credentials saved to: {output_path}")
