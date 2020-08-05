var express = require("express");
var router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
  }
});
 
var upload = multer({ storage: storage })

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/register", function (req, res, next) {
  res.render("userRegisterForm");
});

router.post("/register", upload.single('avatar'), function (req, res, next) {
  const body = req.body;
  console.log(req.file)

  // Comparamos password con repeat password enviados por usuario
  if (body.password != body.repeat_password) {
    // Si son diferentes enviamos error
    return res.send("ERROR");
  }

 

  // Para guardar en json
  // 1) Importar fs con require
  // 2) Parsear con stringify
  // 3) Guardar el objeto parseado en el archivo 

  // Guardar muchos usuarios
  // Leer el JSON
  // Parsearlo a Objeto literal
  // Agregarle un item con array.push(itemAAgregar)
  // Recien ahí guardar

   // Creamos un usuario tomando los valores que nos llegan en la petición
   const arrayDeUsuarios = JSON.parse(fs.readFileSync('data/usuarios.json'));

   const ultimoItemDelArray = arrayDeUsuarios[arrayDeUsuarios.length - 1]
 
   const usuarioAGuardar = {
    id: (ultimoItemDelArray.id + 1),
    nombre: body.nombre,
    apellido: body.apellido,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    avatar: req.file.filename
  };

  // images/products/ + imagenDelProducto

  arrayDeUsuarios.push(usuarioAGuardar);
  fs.writeFileSync('data/usuarios.json', JSON.stringify(arrayDeUsuarios));
  return res.send('Todo bien')



});

module.exports = router;
