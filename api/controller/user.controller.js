var User = require('../model/user.model')

exports.getAll = async function (req, res) {
  const users = await User.find({}, function (err, product) {
    if (err) return next(err)
  })
  res.send(users)
  
}

exports.create = function (req, res) {
  let user = new User({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    cpf: req.body.cpf,
    rg: req.body.rg,
    celular: req.body.celular,
    sexo: req.body.sexo,
    dataNascimento: req.body.dataNascimento,
    cidade: req.body.cidade,
    estado: req.body.estado

  })
  user.save(function(err) {
    if (err) {
      return next(err)
    }
    res.send('Usuário criado.')
  })
}

exports.delete = function (req, res) {
  User.remove({ id: req.body.id }, function(err){
    if(err) return next(err)
  })

  res.send('Usuário deletado')
}

exports.alter = async function (req, res) {
  const oldUser = await User.findById(req.body.id, function(err){
    if(err) return next(err)
  })
  const newUser = new User({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    cpf: req.body.cpf,
    rg: req.body.rg,
    celular: req.body.celular,
    sexo: req.body.sexo,
    dataNascimento: req.body.dataNascimento,
    cidade: req.body.cidade,
    estado: req.body.estado
  })

  User.updateOne(oldUser, newUser, function(err, result){
    if(err){
      return next(err)
    }else{
      res.send(result)
    }

  })
}