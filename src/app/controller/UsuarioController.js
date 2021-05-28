const yup = require('yup');
const Usuario = require('../schema/Usuario');
const Telefone = require('../schema/Telefone');
const bcrypt = require('bcryptjs');

module.exports = {
    /**
     * @api {post} /usuario Registro de Usuário
     * @apiGroup Usuário
     * 
     * @apiExample {json} Cadastro
     *  endpoint: http://localhost:3333/usuario
     * 
     *  body: 
     *  {
     *      "sexo": "F",
     *      "senha": "adm@vickie",
     *      "email": "vcamilaxs@gmail.com",
     *      "cpf": "50249536064",
     *      "data_nascimento": "2000-01-01",
     *      "ultimo_nome": "Sobrinho",
     *      "primeiro_nome": "Vitória",
     *      "telefone": [
     *          {
     *              "ddd": 81,
     *              "numero": 991645399,
     *              "whatsapp": true
     *          },
     *          {
     *              "ddd": 81,
     *              "numero": 988195248,
     *              "whatsapp": false
     *          }
     *      ]
     *  }
     * 
     * @apiParam (body) {String{1-1}="F", "M", "O"} sexo      
     * @apiParam (body) {String}                    senha
     * @apiParam (body) {String}                    email
     * @apiParam (body) {String{11-11}}             cpf
     * @apiParam (body) {Date="yyyy-mm-dd"}         data_nascimento
     * @apiParam (body) {String}                    ultimo_nome
     * @apiParam (body) {String}                    primeiro_nome
     * @apiParam (body) {Object[]}                  [telefone]          O usuário poderá cadastrar posteriormente, caso queira
     * 
     * @apiSuccess {String} message 
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 201 Created
     *  {
     *      "message": "Usuário cadastrado com sucesso!"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Cpf já cadastrado
     *  HTTP/1.1 409 Conflict 
     *  {
     *      "message": "CPF já cadastrado!"
     *  }
     * 
     * @apiErrorExample {json} Email já cadastrado
     *  HTTP/1.1 409 Conflict 
     *  {
     *      "message": "Email já cadastrado!"
     *  }
     * 
     */
    async register(req, res){
        const schema = yup.object({
            primeiro_nome: yup.string('O campo Primeiro Nome é do tipo texto!').required('O campo Primeiro Nome é obrigatório!'),
            ultimo_nome: yup.string('O campo Último Nome é do tipo texto!').required('O campo Último Nome é obrigatório!'),
            data_nascimento: yup.date('O campo Data de Nascimento é do tipo data!').required('O campo Data de Nascimento é obrigatório!'),
            cpf: yup.string('O campo CPF é do tipo data!').required('O campo CPF é obrigatório!'),
            email: yup.string('O campo Email é do tipo data!').email('O campo Email é inválido!').required('O campo Email é obrigatório!'),
            senha: yup.string('O campo Senha é do tipo texto!').required('O campo Senha é obrigatório!'),
            sexo: yup.string('O campo Sexo é do tipo texto!').required('O campo Sexo é obrigatório!')
        });

        try {
            await schema.validate(req.body);
        } catch(error){
            return res.status(400).json({ message: error.errors[0] });
        }

        let { primeiro_nome, ultimo_nome, data_nascimento, cpf, email, senha, sexo } = req.body;

        let usuario = await Usuario.findOne({ cpf: cpf });

        if(usuario) return res.status(409).json({ message: 'CPF já cadastrado!' });

        usuario = await Usuario.findOne({ email: email });

        if(usuario) return res.status(409).json({ message: 'Email já cadastrado!' });

        senha = await bcrypt.hash(senha, 8);

        usuario = await Usuario.create({
            primeiro_nome, 
            ultimo_nome, 
            data_nascimento, 
            cpf, 
            email, 
            senha,
            sexo
        });
        
        if(req.body.telefone){
            const { telefone } = req.body;

            for(let tel of telefone){
                let verifTel = await Telefone.findOne({
                    ddd: tel.ddd,
                    numero: tel.numero
                }); 

                if(!verifTel){
                    await Telefone.create({
                        ddd: tel.ddd,
                        numero: tel.numero,
                        whatsapp: tel.whatapp,
                        usuario: usuario._id
                    });
                }
            }
        }

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    },

    /**
     * @api {get} /usuario Listagem de Usuários (Todos)
     * @apiGroup Usuário
     * 
     * @apiSuccess {String} _id 
     * @apiSuccess {String} primeiro_nome
     * @apiSuccess {String} ultimo_nome
     * @apiSuccess {Date} data_nascimento
     * @apiSuccess {String} cpf
     * @apiSuccess {String} email
     * @apiSuccess {String} sexo
     * @apiSuccess {Date} createdAt
     * @apiSuccess {Date} updatedAt
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "60b05104fce0643b788cf9c6",
     *      "primeiro_nome": "Vitória",
     *      "ultimo_nome": "Sobrinho",
     *      "data_nascimento": "2000-01-01T00:00:00.000Z",
     *      "cpf": "50249536064",
     *      "email": "vcamilaxs@gmail.com",
     *      "sexo": "M",
     *      "createdAt": "2021-05-28T02:10:12.053Z",
     *      "updatedAt": "2021-05-28T02:10:12.053Z"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Sem usuários
     *  HTTP/1.1 404 Not Found
     *  {
     *      "message": "Não há usuários cadastrados!"
     *  }
     */
    async listAll(req, res){
        let usuario = await Usuario.find({ status: true }).select('-status -senha -__v');

        if(!usuario){
            return res.status(404).json({ message: 'Não há usuários cadastrados!' });
        }

        return res.status(200).json(usuario);
    },

    /**
     * @api {get} /usuario/:id Listagem de Usuário Único
     * @apiGroup Usuário
     * 
     * @apiSuccess {Boolean} status
     * @apiSuccess {String} primeiro_nome
     * @apiSuccess {String} ultimo_nome
     * @apiSuccess {Date} data_nascimento
     * @apiSuccess {String} cpf
     * @apiSuccess {String} email
     * @apiSuccess {String} sexo
     * @apiSuccess {Date} createdAt
     * @apiSuccess {Date} updatedAt
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "status": true,
     *      "primeiro_nome": "Vitória",
     *      "ultimo_nome": "Sobrinho",
     *      "data_nascimento": "2000-01-01T00:00:00.000Z",
     *      "cpf": "50249536064",
     *      "email": "vcamilaxs@gmail.com",
     *      "sexo": "M",
     *      "createdAt": "2021-05-28T02:10:12.053Z",
     *      "updatedAt": "2021-05-28T02:10:12.053Z"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Usuário não encontrado
     *  HTTP/1.1 404 Not Found
     *  {
     *      "message": "Usuário informado não cadastrado!"
     *  }
     */
    async listOne(req, res){
        let usuario = await Usuario.findById(req.params.id).select('-_id -senha -__v');

        if(!usuario){
            return res.status(404).json({ message: 'Usuário informado não cadastrado!' });
        }

        return res.status(200).json(usuario);
    },

    /**
     * @api {get} /usuario/filtro/:status Listagem de Usuários por Status
     * @apiGroup Usuário
     * 
     * @apiSuccess {String} _id 
     * @apiSuccess {String} primeiro_nome
     * @apiSuccess {String} ultimo_nome
     * @apiSuccess {Date} data_nascimento
     * @apiSuccess {String} cpf
     * @apiSuccess {String} email
     * @apiSuccess {String} sexo
     * @apiSuccess {Date} createdAt
     * @apiSuccess {Date} updatedAt
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "60b05104fce0643b788cf9c6",
     *      "primeiro_nome": "Vitória",
     *      "ultimo_nome": "Sobrinho",
     *      "data_nascimento": "2000-01-01T00:00:00.000Z",
     *      "cpf": "50249536064",
     *      "email": "vcamilaxs@gmail.com",
     *      "sexo": "M",
     *      "createdAt": "2021-05-28T02:10:12.053Z",
     *      "updatedAt": "2021-05-28T02:10:12.053Z"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Sem usuários
     *  HTTP/1.1 404 Not Found
     *  {
     *      "message": "Usuários não cadastrados com o filtro!"
     *  }
     */
    async listFilterByStatus(req, res){
        let usuario = await Usuario.find({ status: req.params.status }).select('-status -senha -__v');

        if(!usuario){
            return res.status(400).json({ message: 'Usuários não cadastrados com o filtro!' });
        }

        return res.status(200).json(usuario);
    },

    /**
     * @api {put} /usuario/:id Atualização de Usuário
     * @apiGroup Usuário
     * 
     * @apiExample {json} Atualização
     *  endpoint: http://localhost:3333/usuario/60adac4818bb7e4150c1a1bf
     * 
     *  body: 
     *  {
     *      "sexo": "M",
     *      "senha": "adm@vickie",
     *      "email": "vcamilaxs@gmail.com",
     *      "cpf": "50249536064",
     *      "data_nascimento": "2000-01-01",
     *      "ultimo_nome": "Sobrinho",
     *      "primeiro_nome": "Vitória",
     *      "status": false
     *  }
     * 
     * @apiParam (body) {String{1-1}="F", "M", "O"} [sexo]   
     * @apiParam (body) {String}                    [senha]
     * @apiParam (body) {String}                    [email]
     * @apiParam (body) {String{11-11}}             [cpf]
     * @apiParam (body) {Date="yyyy-mm-dd"}         [data_nascimento]
     * @apiParam (body) {String}                    [ultimo_nome]
     * @apiParam (body) {String}                    [primeiro_nome]
     * @apiParam (body) {Boolean}                   [status]            
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "sexo": "M",
     *      "senha": "adm@vickie",
     *      "email": "vcamilaxs@gmail.com",
     *      "cpf": "50249536064",
     *      "data_nascimento": "2000-01-01",
     *      "ultimo_nome": "Sobrinho",
     *      "primeiro_nome": "Vitória",
     *      "status": false
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Usuário não cadastrado
     *  HTTP/1.1 404 Not Found
     *  {
     *      "message": "Usuário informado não cadastrado!"
     *  }
     */
    async update(req, res){ 
        let usuario = await Usuario.findById(req.params.id).select('-_id, -__v');

        if(!usuario){
            return res.status(404).json({ message: 'Usuário informado não cadastrado!' });
        }

        if(req.body.primeiro_nome) usuario.primeiro_nome = req.body.primeiro_nome;
        if(req.body.ultimo_nome) usuario.ultimo_nome = req.body.ultimo_nome;
        if(req.body.data_nascimento) usuario.data_nascimento = req.body.data_nascimento;
        if(req.body.cpf) usuario.cpf = req.body.cpf;
        if(req.body.email) usuario.email = req.body.email;
        if(req.body.senha) usuario.senha = await bcrypt.hash(req.body.senha, 8);
        if(req.body.sexo) usuario.sexo = req.body.sexo;
        if(req.body.status) usuario.status = req.body.status;

        await usuario.save();

        return res.status(200).json(usuario);
    },

    /**
     * @api {delete} /usuario/:id Exclusão de Usuário
     * @apiGroup Usuário     
     * 
     * @apiSuccess {String} message 
     * 
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 OK
     *  {
     *      "message": "Usuário deletado com sucesso!"
     *  }
     * 
     * @apiError {String} message 
     * 
     * @apiErrorExample {json} Usuário não cadastrado
     *  HTTP/1.1 404 Not Found
     *  {
     *      "message": "Usuário informado não cadastrado!"
     *  }
     */
    async delete(req, res){
        let usuario = await Usuario.findByIdAndDelete(req.params.id);

        if(!usuario){
            return res.status(404).json({ message: 'Usuário informado não cadastrado!' });
        }

        await Telefone.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    }
};