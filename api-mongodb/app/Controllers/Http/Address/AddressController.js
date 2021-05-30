'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Address = use("App/Models/Address"); 

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {
  /**
   * Show a list of all addresses.
   * GET addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new address.
   * GET addresses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) { 
  }

  /**
   * Create/save a new address.
   * POST addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const { street, neightborhood, city, state, zip_code,  latitude, longitude, complement } = request.all();

    try {

      const address = await Address.create({
        street: street, 
        neightborhood: neightborhood,
        city: city,
        state: state, 
        zip_code: zip_code,
        latitude: latitude, 
        longitude: longitude,
        complement: complement
      }) 

      return response.status(200).json(address)

    } catch (error) {

      return response.status(400).json({
        message: "error creating address"
      })

    }
  }

  /**
   * Display a single address.
   * GET addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    try {

      const address = await Address.find(params.id)

      if (!address) {
        return response.status(404).json({
          message: "address not found"
        })
      }

      return response.status(200).json(address);

    } catch (error) {

      console.log(error)

      return response.status(400).json({
        message: "error showing address"
      })

    } 

  }

  /**
   * Render a form to update an existing address.
   * GET addresses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update address details.
   * PUT or PATCH addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const data = request.all();

    try {

      const address = await Address.find(params.id)

      if (!address) {
        return response.status(404).json({
          message: "address not found"
        })
      }

      await address.merge(data)

      return response.status(200).json(address);

    } catch (error) {

      console.log(error)

      return response.status(400).json({
        message: "error showing address"
      })

    } 
  }

  /**
   * Delete a address with id.
   * DELETE addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    try {

      const address = await Address.find(params.id)

      if (!address) {
        return response.status(404).json({
          message: "address not found"
        })
      }

      await address.delete()

      return response.status(200).json({
        message: "address deleted successfully"
      });

    } catch (error) {

      console.log(error)

      return response.status(400).json({
        message: "error showing address"
      })

    } 

  }
}

module.exports = AddressController
