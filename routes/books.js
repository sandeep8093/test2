const Book = require("../models/Book");
const {
    verifyToken,
  } = require("../middleware");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newBook = new Book(req.body);

  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if(!updatedBook){
      return res.status(404).json({ msg: 'Book not found' });
  }
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json("Book has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});



//Get one book
router.get("/:id", verifyToken, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id );
    if(!book){
      return res.status(404).json({ msg: 'Book not found' });
  }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Get all Books
router.get("/", verifyToken, async (req, res) => {

  try {
    const savedBook = await Book.find();
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
