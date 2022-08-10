"use strict";
const express = require("express");
const route = express.Router();
const HomeRoute = require("../controller/homeRoute");
const CsvRead = require("../controller/csvRead/csvRead");
const VipUser = require("../controller/vipUser/vipUserController");

//------------------------------ API----------------------------------
//Home Route
route.get("/", HomeRoute.home);
//Csv read
route.post("/read-data", CsvRead.readData);

//Vipuser
route.post("/add-vip",VipUser.addVipUser)

// * route
route.use((req, res, next) => {
    res.status(401).send({ success: false, msg: "Route not found", data: {}, errors: '' });
});

/*route.get('*',()=>{
    res.status(401).send({ success: false, msg: "Route not found", data: {}, errors: '' });
})
route.post('*',()=>{
    res.status(401).send({ success: false, msg: "Route not found", data: {}, errors: '' });
})*/

module.exports = route;