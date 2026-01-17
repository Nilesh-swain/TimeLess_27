from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import the middleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

# Load WAQI API token from .env
load_dotenv()
WAQI_API_KEY = os.getenv("AQI_API")

app = FastAPI(title="AQI API")

# ===== CORS Configuration =====
# This allows your React frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],           # Allows all methods (POST, GET, etc.)
    allow_headers=["*"],           # Allows all headers
)

# ===== Request model =====
class LatLon(BaseModel):
    lat: float
    lon: float

# ===== Helper to classify AQI =====
def classify_aqi(aqi: int) -> str:
    if aqi <= 50:
        return "Good"
    elif aqi <= 100:
        return "Moderate"
    elif aqi <= 200:
        return "Poor"
    elif aqi <= 300:
        return "Very Poor"
    else:
        return "Severe"

# ===== AQI POST Endpoint =====
@app.post("/aqi")
def get_aqi(payload: LatLon):
    lat = payload.lat
    lon = payload.lon

    if not WAQI_API_KEY:
        return {"error": "WAQI API token not found in backend"}

    url = f"https://api.waqi.info/feed/geo:{lat};{lon}/?token={WAQI_API_KEY}"

    try:
        res = requests.get(url)
        data = res.json()

        if data["status"] != "ok":
            return {"error": "Unable to fetch AQI data"}

        raw = data["data"]
        
        # Safe access for pollutants that might be missing
        pollutants_raw = raw.get("iaqi", {})
        
        response = {
            "location": raw["city"]["name"],
            "aqi": raw["aqi"],
            "category": classify_aqi(raw["aqi"]),
            "dominant_pollutant": raw.get("dominentpol"),
            "pollutants": {
                "pm25": pollutants_raw.get("pm25", {}).get("v"),
                "pm10": pollutants_raw.get("pm10", {}).get("v"),
                "no2": pollutants_raw.get("no2", {}).get("v"),
                "so2": pollutants_raw.get("so2", {}).get("v"),
                "co": pollutants_raw.get("co", {}).get("v"),
                "o3": pollutants_raw.get("o3", {}).get("v"),
            },
            "timestamp": raw["time"]["iso"]
        }
        return response

    except Exception as e:
        return {"error": str(e)}