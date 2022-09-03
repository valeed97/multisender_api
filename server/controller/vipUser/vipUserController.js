"use strict";
const dotenv = require('dotenv');
dotenv.config();
var vipUserModel = require('../../model/vipUserModel');
const Validator = require('../validationController');

exports.addVipUser = async(req, res) =>  {
    try{
        let data = Validator.checkValidation(req.body);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        const newData = new vipUserModel({
            address: data.address,
            txHash: data.txHash,
            amount: data.amount,
            endTime: data.endTime,
        })

        // save user in the database
        newData.save(newData).then(data => {
            res.status(200).send({ success: true, msg: "data saved successfully", data: '', errors: '' });
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
    }catch (err) {
        console.error(err);
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: err });
    }
    
}


exports.removeVipUser = async(req, res) =>  {
    try{
        let data = Validator.checkValidation(req.query);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        vipUserModel.find({_id:data.id}).then((data)=>{
            if(data){
                vipUserModel.findOneAndDelete({_id:item._id}).then((data)=>{
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

exports.updateVipUser = async(req, res) =>  {
    try{
        let data = Validator.checkValidation(req.body);
        if (data['success'] === true) {
            data = data['data'];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: '' });
        }
        vipUserModel.find({_id:data.id}).then((data)=>{
            if(data){
                vipUserModel.findOneAndUpdate({_id:item._id},{endTime:data.endtime}).then((data)=>{
                    res.status(200).send({ success: true, msg: "User updated successfully", data: {}, error: '' });
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