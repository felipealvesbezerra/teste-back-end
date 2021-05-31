const mongoose = require('mongoose');
const customerRepository = require('../repositories/customer.repository')

module.exports = {
    async index(req, res) {
        let response = await customerRepository.getAll();
        return res.json(response);  
    },
    async show(req, res) {
        let response = await customerRepository.getById(req.params.id);
        return res.json(response);  
    },
    async store(req, res) {
        let response = await customerRepository.create(req.body);
        return res.json(response);  
    },
    async update(req, res) {
        let response = await customerRepository.update(req.params.id,req.body);
        return res.json(response);  
    },
    async delete(req, res) {
        let response = await customerRepository.delete(req.params.id);
        return res.json(response);  
    },
};