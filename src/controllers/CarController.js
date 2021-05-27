const Car = require("../models/Car")


class CarController {
    async index(req, res) {
      try {
        const car = await Car.findAll()
  
        return res.send(car)
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  
    async show(req, res) {
      try {
        const car = await Car.findByPk(req.params.id)
        if (!car) {
         return res.status(404).send({erro: "Car not found"})
        }

        return res.send(car)
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  
    async store(req, res) {
      try {
        const car = await Car.create(req.body)
  
        return res.send({inserted_car: car})
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  
    async update(req, res) {
      try {
        const car = await Car.findByPk(req.params.id)
        if (!car) {
         return res.status(404).send({erro: "Car not found"})
        }
        await car.update(req.body)
  
        return res.send({ altered_car: car })
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  
    async destroy(req, res) {
      try {
        const car = await Car.findByPk(req.params.id)
  
        await car.destroy()
  
        return res.status(200).send({deleted_car: car})
      } catch (err) {
        return res.status(400).send({ error: err.message })
      }
    }
  }
  
  module.exports = new CarController()