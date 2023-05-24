const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');


async function create(req, res) {
  try {

    const { name, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const payLaod = {
      name: name,
      email: email,
      password: encryptedPassword
    };

    const finduser = await User.findOne({ where: { email: req.body.email } })
    if (finduser) {
      return res.status(409).json({ message: 'Email already exist!' });
    } else {
      User.create(payLaod).then(data => {
        return res.status(201).json({ success: 'User has been created!' });
      }).catch(err => {
        return res.status(400).json({ error: 'User could not be created!' });
      });
    }
  } catch (err) {
    return res.status(400).json({ error: 'something went wrong!' });
  }
}



module.exports = {
  create: create,
}
