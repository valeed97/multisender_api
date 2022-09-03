"use strict";
const dotenv = require('dotenv');
dotenv.config();
var userModel = require('../../model/userModel');
const Validator = require('../validationController');

exports.addUser = async(req, res) =>  {
    try{
        let data = Validator.checkValidation(req.body);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        console.log(data.address)
        console.log(data.refaddress)
        if((data.address).toUpperCase() != (data.refaddress).toUpperCase()){
            const isUser = await userModel.find({address: (data.address).toUpperCase()}).countDocuments();
            if(isUser == 0){
                var isRef = 1;
                if(data.refaddress !== "0x"){
                    isRef = await userModel.find({address: (data.refaddress).toUpperCase()}).countDocuments();
                }
                if(isRef == 1){
                    const newData = new userModel({
                        address: (data.address).toUpperCase(),
                        refaddress: (data.refaddress).toUpperCase()
                    })
            
                    // save user in the database
                    newData.save(newData).then(data => {
                        res.status(200).send({ success: true, msg: "User registered successfully", data: '', errors: '' });
                    }).catch(err => {
                        console.log(err)
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating a create operation"
                        });
                    });
                }else{
                    res.status(203).send({ success: false, msg: "Referrel address is not registered", data: '', errors: '' });
                }
                
            }else{
                res.status(203).send({ success: false, msg: "Address already registered", data: '', errors: '' });
            }  
        }else{
            res.status(203).send({ success: false, msg: "User and referral address can not be same", data: '', errors: '' });
        }
        
    }catch (err) {
        console.error(err);
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
    }
    
}
exports.removeUser = async(req, res) =>  {
    try{
        let data = Validator.checkValidation(req.query);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        userModel.find({_id:data.id}).then((data)=>{
            if(data){
                userModel.findOneAndDelete({_id:item._id}).then((data)=>{
                    res.status(200).send({ success: true, msg: "User removed from vip", data: {}, error: '' });
                })
            }else{
                res.status(202).send({ success: false, msg: "User not found", data: {}, error: '' });
            }
        })
        
    }catch (err) {
        console.error(err);
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
    }
    
}
