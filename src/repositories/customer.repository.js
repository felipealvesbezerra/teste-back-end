const mongoose = require('mongoose');

const Customer = require('../models/customer.model');

module.exports = {
    async getAll() {
        try{
            let customers =   await Customer.find();
            return {
                success:true,
                data:customers,
            }
        }
        catch(e){
            return {
                success:false,
                data:null,
                message:String(e)
            }
        }
    },
    async getById(id) {
        try{
            const customer = await Customer.findById(id);
            return {
                success:true,
                data:customer || null,
            }
        }
        catch(e){
            return {
                success:false,
                data:null,
                message:String(e)
            }
        }
    },
    async create(customer) {
        try{
            const customerModel = new Customer(customer);
            await customerModel.save();
            return {
                success:true,
                data:customer
            }
        }
        catch(e){
            return {
                success:false,
                message:String(e)
            }
        }
    },
    async update(id,customer) {
        try{
           
            let customerData = await Customer.findById(id);
            if(!customerData){
                return {
                    success:false,
                    message:'Customer not found!'
                }
            }
            let newCustomer = {...customerData.toObject(),...customer};
            if(!newCustomer["address"])
                newCustomer["address"] = {};
            await Customer.update(newCustomer);
            return {
                success:true,
                data:newCustomer
            }
        }
        catch(e){
            return {
                success:false,
                message:String(e)
            }
        }
    },
    async delete(id) {
        try{
            await Customer.findByIdAndRemove(id);
            return {
                success:true,
                data:id
            }
        }
        catch(e){
            return {
                success:false,
                message:String(e)
            }
        }
    },
};

