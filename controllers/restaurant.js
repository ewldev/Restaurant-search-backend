const axios = require("axios");
require('dotenv').config();

const handleApiCall = (req, res ) => {
  axios
  .get(`https://api.yelp.com/v3/businesses/search`, {
    headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
    },
    params: {
      location: `${req.body.input} CA`,
      term: `${req.body.input2}`,
      categories: 'restaurants',
      sort_by: 'rating'
    }    
  })  
    .then(data => {
      res.json(data.data.businesses);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}
  
module.exports = {
  handleApiCall
}