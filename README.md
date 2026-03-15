# UPI Fraud Detection System

## Project Overview

The UPI Fraud Detection System is a full-stack web application designed to detect suspicious UPI transactions using machine learning algorithms. The system analyzes transaction details and predicts whether a transaction is safe or fraudulent.

This project combines:

* Machine Learning model prediction
* Python AI engine
* Node.js backend
* React frontend
* MongoDB database for user authentication

## Features

* User Signup and Login
* AI-based fraud prediction
* Real-time transaction checking
* Hacker-themed animated frontend
* Secure password storage using bcrypt
* MongoDB cloud database integration

## Machine Learning Algorithms Used

* Logistic Regression
* K-Nearest Neighbors (KNN)
* Support Vector Classifier (SVC)
* Naive Bayes
* Decision Tree
* Random Forest
* Convolutional Neural Network (CNN)

## Best Performing Model

Random Forest was selected as the final deployed model because it provided the highest accuracy and stable fraud prediction performance.

## Tech Stack

### Frontend

* React
* Axios
* React Router

### Backend

* Node.js
* Express.js

### AI Engine

* Flask
* Scikit-learn
* TensorFlow

### Database

* MongoDB Atlas

## Project Structure

```text
upi fraud detection/
├── backend/
├── frontend/
├── ai-engine/
├── README.md
```

## Backend Structure

```text
backend/
├── server.js
├── package.json
├── .env
├── config/
├── models/
├── routes/
├── controllers/
├── services/
```

## Frontend Structure

```text
frontend/src/
├── App.jsx
├── main.jsx
├── pages/
├── components/
├── api/
```

## AI Engine Structure

```text
ai-engine/
├── app.py
├── fraud_model.pkl
├── scaler.pkl
├── upi_fraud_model.ipynb
```

## Dataset Details

Synthetic UPI fraud dataset with:

* 5000 rows
* transaction hour
* transaction date
* category code
* amount
* state code
* zip code
* fraud label

## Category Reference

* 0 Entertainment
* 1 Food Dining
* 2 Gas Transport
* 3 Grocery NET
* 4 Grocery POS
* 5 Health Fitness
* 6 Home
* 7 Kids Pets
* 8 Miscellaneous NET
* 9 Miscellaneous POS
* 10 Personal Care
* 11 Shopping NET

## State Code Reference

State codes are encoded numerically for machine learning input.

## Running the Project

### Start AI Engine

```bash
python app.py
```

### Start Backend

```bash
npm start
```

### Start Frontend

```bash
npm run dev
```

## API Flow

Frontend → Backend → Flask AI Engine → ML Model → Prediction

## Sample Output

* Safe Transaction
* Fraud Transaction

## Future Enhancement

* Live fraud monitoring dashboard
* Transaction history storage
* OTP risk analysis
* Device trust analysis