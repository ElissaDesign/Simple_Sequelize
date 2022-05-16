const controller = require('../controllers/users');
const router = require('express').Router()
const Token = require('../middleWare/tokenAuth')

router
    .get('/', controller.getAll)
    .get('/:id', controller.getOne)
    .post('/', controller.createOne)
    .post('/login', controller.login)
    .put('/:id',Token.TokenVerify, controller.updateOne)
    .delete('/:id', controller.deleteOne);

module.exports =router;