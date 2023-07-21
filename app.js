const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 0 }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to calculate BMI
function calculateBMI(weight, height) {
  const heightInMeters = height / 100; // Convert height to meters
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(2); // Return BMI rounded to 2 decimal places
}

// Function to calculate body fat
function calculateBodyFat(bmi, age, gender) {
  let bodyFat;
  if (gender === 'male') {
    bodyFat = (1.20 * bmi) + (0.23 * age) - 16.2;
  } else {
    bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4;
  }
  return bodyFat.toFixed(2); // Return body fat percentage rounded to 2 decimal places
}

// Function to calculate ideal weight
function calculateIdealWeight(height, gender) {
  let idealWeight;
  if (gender === 'male') {
    idealWeight = 50 + 0.91 * (height - 152.4);
  } else {
    idealWeight = 45.5 + 0.91 * (height - 152.4);
  }
  return idealWeight.toFixed(2); // Return ideal weight rounded to 2 decimal places
}

// Function to calculate calories burned
function calculateCaloriesBurned(weight, time, speed, height) {
  const MET = 0.0175; // Metabolic Equivalent for Task
  const caloriesBurned = MET * weight * time * speed * height;
  return Math.round(caloriesBurned); // Return calories burned rounded to the nearest whole number
}

app.post('/bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const bmi = calculateBMI(weight, height);
  res.json({ bmi: bmi });
});

app.post('/bodyfat', (req, res) => {
  const bmi = parseFloat(req.body.bmi);
  const age = parseInt(req.body.age);
  const gender = req.body.gender;
  const bodyFat = calculateBodyFat(bmi, age, gender);
  res.json({ bodyFat: bodyFat });
});

app.post('/idealweight', (req, res) => {
  const height = parseFloat(req.body.height);
  const gender = req.body.gender;
  const idealWeight = calculateIdealWeight(height, gender);
  res.json({ idealWeight: idealWeight });
});

app.post('/caloriesburned', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const time = parseFloat(req.body.time);
  const MET = parseFloat(req.body.MET);
  const caloriesBurned = calculateCaloriesBurned(weight, time, MET);
  res.json({ caloriesBurned: caloriesBurned });
});


app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
