const Customer = require("../models/Customer")
const Rent = require("../models/Rent")



class RentController {

    async index(req, res) {
      try {
        const { customer_id } = req.params
        const {id, name, email, rents} = await Customer.findByPk(customer_id, {
          include: { association: 'rents'}
        })

        return res.send({id, name, email, rents})
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  
    async show(req, res) {
      try {
        const rent = await Rent.findByPk(req.params.id)
        if (!rent) {
         return res.status(404).send({erro: "Rent not found"})
        }

        return res.json(rent)
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  
    async store(req, res) {
      try {
        const { customer_id } = req.params
        const customer = await Customer.findByPk(customer_id)
        if(!customer) {
          return res.status(404).send({ error: "Customer not found" })
        }

        const rent = await Rent.create({
          ...req.body,
          customer_id, 
        })
  
        return res.json(rent)
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  
    async update(req, res) {
      try {
        const rent = await Rent.findByPk(req.params.id)
  
        await rent.update(req.body)
  
        return res.json({ rent })
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  
    async destroy(req, res) {
      try {
        const rent = await Rent.findByPk(req.params.id)
  
        await rent.destroy()
  
        return res.status(200).send({deleted: rent})
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  }
  
  module.exports = new RentController()