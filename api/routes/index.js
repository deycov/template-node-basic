const express = require("express");
const indexRouter = require("./index.router");
const productsRoutes = require("./products.routes.js");
const usersRoutes  = require("./users.routes.js");


const router = express.Router();

function appRoutes(app){
 app.use('/api/v1', router);

 router.use('/', indexRouter);
 router.use('/products', productsRoutes);
 router.use('/users',usersRoutes);
}

module.exports = { appRoutes };