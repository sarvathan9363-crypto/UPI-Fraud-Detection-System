from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

model = pickle.load(open("fraud_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    values = [
        data['trans_hour'],
        data['trans_day'],
        data['trans_month'],
        data['trans_year'],
        data['category'],
        data['upi_number'],
        data['trans_amt'],
        data['state_code'],
        data['zip']
    ]

    arr = np.array([values])

    arr = scaler.transform(arr)

    prediction = model.predict(arr)

    result = "Fraud Transaction" if prediction[0] == 1 else "Safe Transaction"

    return jsonify({
        "prediction": result
    })

if __name__ == '__main__':
    app.run(port=5000)