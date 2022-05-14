const users = require('../models/users');

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
        const user = await users.findOne(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.createOne = async (req, res, next) => {
    try {
        const USER_MODEL = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            address: req.body.address,
            password: req.body.password
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
            const user = await users.findOneAndUpdate(USER_MODEL, {where: {id: req.body.id}})
            console.log("Hello, user")
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

