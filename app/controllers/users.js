const users = require('../models/users');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.getAll = async (req, res, next) => {

    try {
        const All =  await users.findAll();
        return res.status(200).json(All);
    } catch (error) {
        return res.status(500).json(error);
    }
  
}
exports.getOne = async (req, res, next) => {
    try {
        const user = await users.findByPk(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.createOne = async (req, res, next) => {
    const login_email = await users.findOne({ where: {email: req.body.email}});
    const login_name = await users.findOne({ where: {name: req.body.name}});
    if(login_email && login_name) {
        return res.status(200).json("You already have an account, Please sign in")
    }else {
        if(login_email){
           return res.status(200).json("Email is already in use")
        }
        try {
            const Salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, Salt);
            const USER_MODEL = {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                address: req.body.address,
                password: hashedPass
            }
    
            try {
                const user = await users.create(USER_MODEL)
                console.log("user created successfully")
                return res.status(200).json(user);
            } catch (error) {
                return res.status(500).json(error);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};


exports.login = async (req, res, next) => {
    try {
        const userlogin = await users.findOne({ where: {email: req.body.email}});
        if(!userlogin) return res.status(400).json("Wrong inputs!");
        const validated = await bcrypt.compare(req.body.password,userlogin.password)
        if(!validated){
            return res.status(400).json("Wrong password!");
        } 
        else {
            const user = userlogin.email;
            const Token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            await userlogin.save();
       return res.status(200).json({message: "You have successfully Logged in ", Token});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
    
};

exports.updateOne = async (req, res, next) => {
    try {
        const USER_MODEL = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            address: req.body.address,
            password: req.body.password
        }
        try {
            const user = await users.update(USER_MODEL, {where: {id: req.params.id}})
            // console.log("Hello, user")
            return res.status(200).json({message: "user Updated " ,user})
        } catch (error) {
            return res.status(500).json(error);
        }
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const user = await users.destroy({where: {id: req.params.id }})
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error);
    }
}

