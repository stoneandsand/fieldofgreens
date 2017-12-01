const axios = require('axios');
const config = require('./config.js')

//SAMPLE API FUNCTIONS

//Search by Product Description
const fda = (query) => {
  let formatted = query.split(' ').join('+');
  axios.get(`https://api.fda.gov/food/enforcement.json?api_key=${config.API_KEY}&search=product_description:"${formatted}"&limit=10`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

//Searching by Date Filter
const fdaDate = () => {
  axios.get(`https://api.fda.gov/food/enforcement.json?api_key=${config.API_KEY}&search=report_date:[2016-01-01+TO+2017-12-31]&limit=10`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}