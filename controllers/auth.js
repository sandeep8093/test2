const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



exports.signup = async (req, res) => {
  let { email, password,username  } = req.body;
  const newUser = new User({
    email: email,
    username:username,
    password: bcrypt.hashSync(password, 10),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.signin = async (req, res) => {
  // console.log(req.body.password);
  await User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {

        const payload = {
          id: user._id,
          email: user.email,
          username:user.username
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '2h',
        });

        return res.status(200).json({
          token,
          payload,
        });
      } else {
        return res.status(400).json({ message: 'wrong password' });
      }
    } else {
      return res.status(400).json({ message: 'user not found' });
    }
  });
};

exports.signout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'signout successfully' });
};

