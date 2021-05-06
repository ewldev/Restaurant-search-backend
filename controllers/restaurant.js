const axios = require("axios");
require('dotenv').config();

const handleApiCall = (req, res ) => {
  axios
  .get(`https://api.yelp.com/v3/businesses/search`, {
    headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
    },
    params: {
      location: `${req.body.input}`,
      term: `${req.body.input2}`
    }    
  })  
    .then(data => {
      res.json(data.data.businesses);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}
  

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}