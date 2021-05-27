const db = require("../models/companyModel");

module.exports = class CompanyModel {
	static async get() {
    try {
      const company = await db.find({});
      return company;
    } catch (error) {
      return error;
    }

  }
	
	static async create(model) {
    try {
      return await db.create(model); 
    } catch (error) {
      return error;
    }
  }
}
