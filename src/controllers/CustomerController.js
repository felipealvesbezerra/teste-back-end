const Customer = require("../models/Customer")
const Sequelize = require('sequelize')

class CustomerController {
  async index(req, res) {
    try {
      const customer = await Customer.findAll()

      return res.send(customer)
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }

  async show(req, res) {
    try {
      const customer = await Customer.findByPk(req.params.id)
      if (!customer) {
        return res.status(404).send({ erro: "Customer not found" })
      }

      return res.send(customer)
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }

  async store(req, res) {
    try { 
      const customer = await Customer.create(req.body)

      return res.status(201).send({ inserted_customer: customer })
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }

  async update(req, res) {

    const Op = Sequelize.Op
 
    try {
      const customer = await Customer.findByPk(req.params.id)
      if (!customer) {
        return res.status(404).send({erro: "Customer not found"})
       }
      await customer.update(req.body)
      
      return res.status(200).send({ altered_customer: customer })
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }

  async destroy(req, res) {
    try {
      const customer = await Customer.findByPk(req.params.id)
      if (!customer) {
        return res.status(404).send({erro: "Customer not found"})
       }

      await customer.destroy()

      return res.status(200).send({ deleted_customer: customer })
    } catch (err) {
      return res.status(400).send({ error: err.message })
    }
  }
}

module.exports = new CustomerController()