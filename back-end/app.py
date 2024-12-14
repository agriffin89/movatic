from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

STATION_STATUS_URL = "https://gbfs.bcycle.com/bcycle_madison/station_status.json"

@app.route('/api/stations', methods=['GET'])
def get_stations():
    try:
        # We fetch the station status data
        response = requests.get(STATION_STATUS_URL)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        
        # Parsing the JSON response
        station_status_data = response.json()
        
        # Returning the station status data
        return jsonify(station_status_data)
    except requests.exceptions.RequestException as e:
        # Handle any request exceptions
        return jsonify({"error": "Failed to fetch station data", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
