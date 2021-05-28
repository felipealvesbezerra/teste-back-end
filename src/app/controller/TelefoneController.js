const yup = require('yup');
const Telefone = require('../schema/Telefone');
const Usuario = require('../schema/Usuario');

module.exports = {
    /**
     * @api {post} /telefone/:id Registro de Telefone
     * @apiGroup Telefone
     * 
     * @apiExample {json} Cadastro
     *  endpoint: http://localhost:3333/telefone/60b05104fce0643b788cf9c6
     * 
     *  body: 
     *  {
     *      "ddd": "81",
     *      "numero": "991645399",
     *      "whatsapp": false
     *  }
     * 
     * @apiParam (body) {Number}                    ddd      
     * @apiParam (body) {Number}                    numero
     * @apiParam (body) {Boolean}                   whatsapp
     * 
     * @apiSuccess {String} message 
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 201 Created
     *  {
     *      "message": "Telefone cadastrado com sucesso!"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Usuário não cadastrado
     *  HTTP/1.1 404 Not Found 
     *  {
     *      "message": "Usuário informado não cadastrado!"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Telefone já cadastrado
     *  HTTP/1.1 409 Conflict 
     *  {
     *      "message": "O número de telefone já está cadastrado!"
     *  }
     * 
     */
    async register(req, res){
        // Validação dos campos
        const schema = yup.object({
            ddd: yup.number('O campo DDD é do tipo número').required('O campo DDD é obrigatório!'),
            numero: yup.number('O campo Número é do tipo número!').required('O campo Número é obrigatório!'),
            whatsapp: yup.boolean('O campo Whatsapp é do tipo boolean!')
        });

        try {
            await schema.validate(req.body);
        } catch(error){
            return res.status(400).json({ message: error.errors[0] });
        }

        // Verificação se o usuário informado existe
        let usuario = await Usuario.findOne({ _id: req.params.id });

        if(!usuario){
            return res.status(404).json({ message: 'Usuário informado não cadastrado!' });
        }

        // Validação de repetição de números na base de dados
        let telefone = await Telefone.findOne({
            ddd: req.body.ddd,
            numero: req.body.numero
        });

        if(telefone){
            return res.status(409).json({ message: 'O número de telefone já está cadastrado!' });
        }

        // Cadastro do telefone na base de dados
        telefone = {
            ddd: req.body.ddd,
            numero: req.body.numero,
            usuario: req.params.id
        };

        if(req.body.whatsapp) Object.assign(telefone, { whatsapp: req.body.whatsapp });

        await Telefone.create(telefone);

        return res.status(201).json({ message: 'Telefone cadastrado com sucesso!' });
    },

    /**
     * @api {get} /telefone Listagem de Telefones (Todos)
     * @apiGroup Telefone
     * 
     * @apiSuccess {Boolean} whatsapp
     * @apiSuccess {String} _id
     * @apiSuccess {Number} ddd
     * @apiSuccess {Number} numero
     * @apiSuccess {String} usuario
     * @apiSuccess {Date} createdAt
     * @apiSuccess {Date} updatedAt
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "whatsapp": false,
     *      "_id": "60afc1a0d65d172134d2df6d",
     *      "ddd": 5555,
     *      "numero": 116666,
     *      "usuario": "60afc1a0d65d172134d2df6c",
     *      "createdAt": "2021-05-28T02:10:12.053Z",
     *      "updatedAt": "2021-05-28T02:10:12.053Z"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Sem Telefones
     *  HTTP/1.1 404 Not Found
     *  {
     *      "message": "Não há telefones cadastrados!"
     *  }
     */
    async listAll(req, res){
        let telefone = await Telefone.find().select('-__v');

        if(!telefone){
            return res.status(404).json({ message: 'Não há telefones cadastrados!' });
        }

        return res.status(200).json(telefone);
    },

    /**
     * @api {get} /telefone/:id Listagem de Telefone por Usuário
     * @apiGroup Telefone
     * 
     * @apiSuccess {Boolean} whatsapp
     * @apiSuccess {String} _id
     * @apiSuccess {Number} ddd
     * @apiSuccess {Number} numero
     * @apiSuccess {Date} createdAt
     * @apiSuccess {Date} updatedAt
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "whatsapp": false,
     *      "_id": "60afc1a0d65d172134d2df6d",
     *      "ddd": 5555,
     *      "numero": 116666,
     *      "createdAt": "2021-05-28T02:10:12.053Z",
     *      "updatedAt": "2021-05-28T02:10:12.053Z"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Sem Telefones
     *  HTTP/1.1 404 Not Found
     *  {
     *      "message": "Telefones não cadastrados para o usuário informado!"
     *  }
     */
    async listFilterByUser(req, res){
        let telefone = await Telefone.find({ usuario: req.params.id }).select('-__v, -usuario');

        if(telefone.length == 0){
            return res.status(404).json({ message: 'Telefones não cadastrados para o usuário informado!' });
        }

        return res.status(200).json(telefone);
    },

    /**
     * @api {put} /telefone/:id Atualização de Telefone
     * @apiGroup Telefone
     * 
     * @apiExample {json} Atualização
     *  endpoint: http://localhost:3333/telefone/60b05104fce0643b788cf9c6
     * 
     *  body: 
     *  {
     *      "ddd": "81",
     *      "numero": "991645399",
     *      "whatsapp": false
     *  }
     * 
     * @apiParam (body) {Number}                    ddd      
     * @apiParam (body) {Number}                    numero
     * @apiParam (body) {Boolean}                   whatsapp
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      {
     *          "whatsapp": false,
     *          "ddd": 85,
     *          "numero": 116666,
     *          "usuario": "60afc1a0d65d172134d2df6c",
     *          "createdAt": "2021-05-27T15:58:24.253Z",
     *          "updatedAt": "2021-05-28T02:51:53.058Z"
     *      }
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Telefone já cadastrado
     *  HTTP/1.1 409 Conflict 
     *  {
     *      "message": "O número de telefone já está cadastrado!"
     *  }
     * 
     */
    async update(req, res){
        let telefone;

        // Verificação se já existe o telefone cadastrado (ddd + numero)
        if(req.body.ddd && req.body.numero){
            telefone = await Telefone.findOne({
                ddd: req.body.ddd,
                numero: req.body.numero
            });
        } else if(req.body.ddd){
            telefone = await Telefone.findById(req.params.id).select('numero -_id');

            telefone = await Telefone.findOne({
                ddd: req.body.ddd,
                numero: telefone.numero
            });
        } else if(req.body.numero){
            telefone = await Telefone.findById(req.params.id).select('ddd -_id');

            telefone = await Telefone.findOne({
                ddd: telefone.ddd,
                numero: req.body.numero
            });
        }

        if(telefone) return res.status(409).json({ message: 'Número de telefone já cadastrado!' });

        // Verificação dos campos para atualização e comando de atualização
        telefone = await Telefone.findById(req.params.id).select('-usuario, -__v, -_id');

        if(req.body.ddd) telefone.ddd = req.body.ddd;
        if(req.body.numero) telefone.numero = req.body.numero;
        if(req.body.whatsapp) telefone.whatsapp = req.body.whatsapp;

        await telefone.save();

        return res.status(200).json(telefone);
    },

    /**
     * @api {delete} /telefone/:id Exclusão de Telefone
     * @apiGroup Telefone     
     * 
     * @apiSuccess {String} message 
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "message": "Telefone deletado com sucesso!"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Telefone não cadastrado
     *  HTTP/1.1 404 Not Found
     *  {
     *      "message": "Telefone informado não cadastrado!"
     *  }
     */
    async delete(req, res){
        let telefone = await Telefone.findByIdAndDelete(req.params.id);

        if(!telefone){
            return res.status(404).json({ message: 'Telefone informado não cadastrado!' });
        }

        return res.status(200).json({ message: 'Telefone deletado com sucesso!' });
    }
};