var express = require('express');
var router = express.Router();

/* Rota para a página inicial */
router.get('/', function(req, res, next) {
  res.render('index'); // Renderiza "views/index.ejs"
});

/* Rota para a página de combos */
router.get('/carrinho', function(req, res, next) {
  res.render('carrinho'); // Renderiza "views/carrinho.ejs"
});

/* Rota para a página inicial */
router.get('/login', function(req, res, next) {
  res.render('login'); // Renderiza "views/login.ejs"
});

/* Rota para a página de combos */
router.get('/cadastro', function(req, res, next) {
  res.render('cadastro'); // Renderiza "views/cadastro.ejs"
});

/* Rota para a página de combos */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard'); // Renderiza "views/dashboard.ejs"
});

/* Rota para a página de bebidas */
router.get('/produtos', function(req, res, next) {
  res.render('produtos'); // Renderiza "views/produtos.ejs"
});

module.exports = router;
