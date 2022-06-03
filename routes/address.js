const Address = require("../models/Address");
const {
    verifyToken,
  } = require("../middleware");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newAddress = new Address(req.body);

  try {
    const savedAddress = await newAddress.save();
    res.status(200).json(savedAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if(!updatedAddress){
      return res.status(404).json({ msg: 'Address not found' });
  }
    res.status(200).json(updatedAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json("Address has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});



//Get one Address
router.get("/:id", verifyToken, async (req, res) => {
  try {
    let address = await Address.findById(req.params.id );
    
    if(!Address){
      return res.status(404).json({ msg: 'Address not found' });
  }
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all Addresss
router.get("/", verifyToken, async (req, res) => {

  try {
    Address.find() .exec(function (err, listings) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      listings = listings.filter(function (address) {
        // return only listings with query
        if (address) {
          //console.log(address)
          return true};
        return false;
      });
    const page = parseInt(req.query.page) ;
        const limit = parseInt(req.query.limit) ;

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
    })
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
