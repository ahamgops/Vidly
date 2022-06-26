const config= require('config');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../modules/users');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid email or password');

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    
    res.send(token);
});

function validate(user) {
    const schema = {
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(255),
    };

    return Joi.validate(user, schema);
}


module.exports = router;