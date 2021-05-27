const repository = require("../repository/CompanyRepository");
const { cnpj } = require("cpf-cnpj-validator");

module.exports = {
  getAll: async (request, response) => {
    try {
      const companys = await repository.get();
      return response.json(companys)
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  insert: async (request, response) => {
    try {
      const model = request.body;
      model.cnpj = model.cnpj.replace(/[^\d]+/g,'');
      if(!model.companyName)
        return response.status(406).end("ERR_COMPANY_NAME_FIELD_EMPTY");
      if(!model.fantasyName)
        return response.status(406).end("ERR_FANTASY_NAME_FIELD_EMPTY");
      if(!model.cnpj)
        return response.status(406).end("ERR_CNPJ_FIELD_EMPTY");
      if(!cnpj.isValid(model.cnpj))
        return response.status(406).end("ERR_CNPJ_NUMBER_INVALID");
      if(!model.openingDate)
        return response.status(406).end("ERR_OPENING_DATE_FIELD_EMPTY");
      if(new Date(model.openingDate) == 'Invalid Date')
        return response.status(406).end("ERR_OPENING_DATE_INVALID");
      if(!model.shareCapital)
        return response.status(406).end("ERR_SHARE_CAPITAL_FIELD_EMPTY");
      if(!model.numberEmployee)
        return response.status(406).end("ERR_NUMBER_EMPLOYEEE_FIELD_EMPTY");
      if(!model.zipCode)
        return response.status(406).end("ERR_ZIP_CODE_FIELD_EMPTY");
      if(!model.city)
        return response.status(406).end("ERR_CITY_FIELD_EMPTY");
      if(!model.state)
        return response.status(406).end("ERR_STATE_FIELD_EMPTY");
      if(!model.country)
        return response.status(406).end("ERR_COUNTRY_FIELD_EMPTY");
      
      let cnpjExists = await repository.existsCnpj(model.cnpj);
      if(cnpjExists.length > 0)
        return response.status(406).end("ERR_CNPJ_EXISTS");
      
      const company = await  repository.create(model);
      return response.json(company).end();
    } catch (error) {
      console.log(error);
      return response.status(500).end();
    }
  },
  get: async (request, response) => {

    try {
      if(!request.params.id)
        return response.status(400).end();
    
      const company = await repository.findById(request.params.id);
      if(!company)
        return response.status(404).end("Company NotFound");
    
      return response.json(company).end();
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  },
  update: async (request, response) => {
    try {
      const model = request.body;
      const id = request.params.id;
      const company = await repository.update(id, model);
      if (!company) {
        return response.status(404).end("Company not found");
      }
      return response.json({ message: "Company updated successfully." }).end();
    } catch (error) {
      console.log(error);
      return response.status(500).end();
    }
  },
  delete: async (request, response) => {
    try {
      if (!request.params.id)
        return response.send(400).end();
      const company = await repository.delete(request.params.id);
      if (!company) 
        return response.status(404).end("company not found");
      return response.status(204).end();
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }
}
