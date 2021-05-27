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

	static async findById(id){
    try {
      const company = await db.findById({ _id: id });
      return company;
    } catch (error) {
      return error;
    }
  }

	static async update(id, model) {
    try {
      const company =  db.findByIdAndUpdate(id, model);
      return company;
    } catch (error) {
      return error;
    }
  }

	static async delete(id) {
    try {
      const company = await db.findByIdAndDelete(id);
      return company;
    } catch (error) {
      return error;
    }
  }

	static async existsCnpj(cnpj){
    try {
      const cnpjexists = await db.find({ cnpj: cnpj });
      return cnpjexists;
    } catch (error) {
      return error;
    }
  }
}
