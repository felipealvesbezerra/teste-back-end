const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
	{
		
		companyName: { type : String, required: true },
		fantasyName: { type: String, required: true },
		cnpj: { type: String, required: true },
		openingDate: { type: String, required: true },
		shareCapital: { type: String, required: true },
		numberEmployee: { type: String, required: true },
		zipCode: { type:String, required: true },
		city: { type : String, required: true },
		state: { type: String, required: true },
		country: { type: String, required: true }
	}
);

const companyModel = mongoose.model("company", companySchema);

module.exports = companyModel;
