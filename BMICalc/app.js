// Project Name: BMI Calculator
// Description: School Assignment to build a BMI calculator that is described as 
// "
    // The user enters a weight and height, and the server calculaters the Body Mass Index
    // and sends back a formatted page with the result.

    // BMI formula given:   weight (lbs) / height (in)^2 * 703
    //                      weight (kg) / (cm)^2 x 10000
// "
// Date: 2026-09-21
// Author: Brantly Stringer
// Student ID: 300389597

// Imports
import path from 'node:path';
import express from 'express';
import { log, time, timeLog } from 'node:console';

// Declare server
const app = express();

// Set up pug
app.set('view engine', 'pug');

// Middle Ware for receiving user data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up serving styles & content
app.use('/static', express.static('public'));

// Routes
// Get Request for user entry point
app.get('/', (req, res) => {
    console.log(req.ip);
    res.render('index');
});

// Post Request to send BMI
app.post('/submit', (req, res) => {
    console.log(req.ip);
    // Get height
    const userHeight = Number(req.body.userHeight);
    // Get weight
    const userWeight = Number(req.body.userWeight);
    // Calculate BMI
    const userBmi = ((userWeight*703) / (userHeight*userHeight));
    // Round to 1 decimal point
    const roundedBMI = userBmi.toFixed(1);

    // Check if data entered is Not a Number (NaN)
    if (isNaN(roundedBMI))
        {
            // if it is NaN return 400
            res.status(400).render('badData', { code: "400" });
        }
    else if (userHeight <= 0 | userWeight <= 0)
        {
            // if it is NaN return 400
            res.status(400).render('badData', { code: "400" }); 
        }
    else
        {
            // Send to pug
            res.render('dataEntry', {
            height: userHeight, 
            weight: userWeight,
            bmi: roundedBMI});
        }
});

// Catching everything else
app.use((req, res) => {
    console.log(req.ip);
    res.status(404).send('<h1>404</h1><p>Page no Found</p>');
});

// Create listener on port 3000
app.listen(3000, () => {
    // Display in terminal
    console.log("Server running at http://localhost:3000");
});
