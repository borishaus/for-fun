const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

// API key for Alpha Vantage
const apikey_alphavantage = 'LZY1I0WNJBBGQTEW';

// Path to the cache file
const cacheFilePath = path.join(__dirname, 'cache.json');

// Function to get coffee data from the API or cache
const getCoffeeData = (req, res, next) => {
    // Construct the API URL with the API key
    const url = 'https://www.alphavantage.co/query?function=COFFEE&interval=monthly&apikey=' + apikey_alphavantage;
    console.log(url);

    // Check if the cache file exists
    if (fs.existsSync(cacheFilePath)) {
        // Read and parse the cache file
        const cacheData = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
        const today = moment().format('YYYY-MM-DD');
        console.log('Checking cache data, today is: ' + today + ', cache date: ' + cacheData.date);

        // If the cache data is from today, use it
        if (cacheData.date === today) {
            console.log('Using cached data');
            return res.render('coffeeData', { title: 'Coffee Data', coffeeData: cacheData.data });
        }
    }

    // If no valid cache, make an API request
    axios.get(url, { headers: { 'User-Agent': 'axios' } })
        .then(response => {
            const data = response.data;
            // Cache the data with today's date
            const cacheData = {
                date: moment().format('YYYY-MM-DD'),
                data: data
            };
            fs.writeFileSync(cacheFilePath, JSON.stringify(cacheData));
            // Render the data
            res.render('coffeeData', { title: 'Coffee Data', coffeeData: data });
        })
        .catch(err => {
            // Handle errors and render the error page
            console.log('Error:', err);
            res.render('error', { message: 'Error occurred', error: err });
        });
};

module.exports = getCoffeeData;
