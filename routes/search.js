const Address = require('../models/Address');
const {
    verifyToken,
  } = require("../middleware");

const router = require("express").Router();

//search Address 
router.get("/", verifyToken, async (req, res) => {
    try{
        Address.find()
        .populate({
            
            match: {
              $or: [
                { 'address.name': { $regex: req.query.query, $options: 'i' } },
                { 'address.phone': { $regex: req.query.query, $options: 'i' } },
                
              ]
            }
          })
        
        .exec(function (err, listings) {
          if (err) {
            console.log(err);
            res.status(500).json({ error: err });
          }
          console.log(listings)
          listings = listings.filter(function (address) {
            // return only listings with query
            if (address) return true;
            return false;
          });
  
          //pagination
          const page = parseInt(req.query.page);
          const limit = parseInt(req.query.limit);
  
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
  
          const results = {};
  
          if (endIndex < listings.length) {
            results.next = {
              page: page + 1,
              limit: limit
            };
          }
  
          if (startIndex > 0) {
            results.previous = {
              page: page - 1,
              limit: limit
            };
          }
          results.results = listings.splice(startIndex, endIndex);
  
          return res.status(200).json(results);
        });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
    });

    
module.exports = router;