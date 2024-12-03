
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Diretório onde as imagens serão armazenadas
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Nome único para a imagem
  }
});
const upload = multer({
  dest: 'uploads/',  // Defina o diretório onde as imagens serão armazenadas
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Somente arquivos .jpg, .jpeg e .png são permitidos.'));
        }
        cb(null, true);
    }
});

// Importar funções do Firebase
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, serverTimestamp } = require("firebase/firestore");
const { doc, updateDoc, deleteDoc, getDocs , query, orderBy } = require("firebase/firestore");
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCppeDB9NkXVdnv416ii2j-3oulRB7nQYY",
  authDomain: "faustilo-login.firebaseapp.com",
  projectId: "faustilo-login",
  storageBucket: "faustilo-login.firebasestorage.app",
  messagingSenderId: "154524470471",
  appId: "1:154524470471:web:afaf9248e8ee94646542e2",
  measurementId: "G-BFT9WT5TH9"
};

// Inicializa Firebase e Auth
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

// Configuração do servidor
const app = express();

app.use(express.json()); // Permite requisições JSON

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

   // Defina o e-mail e senha autorizados
   const emailAutorizado = "admin@gmail.com";
   const senhaAutorizada = "admin1";
 

   try {
    // Verifica se o usuário conseguiu autenticar
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    console.log(`Usuário ${user.email} autenticado com sucesso!`);

    // Verifica se o e-mail corresponde ao do administrador
    if (email === emailAutorizado && senha === senhaAutorizada) {
      res.status(200).json({ message: 'Login bem-sucedido!', redirectTo: '/dashboard' });
    } else {
      res.status(200).json({ message: 'Login bem-sucedido!', redirectTo: '/produtos' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error.code, error.message);
    res.status(401).send('Email ou senha incorretos!');
  }

  
});


//Rota de Cadastro de Usuários
app.post('/cadastrar', async (req, res) => {
  const { email, senha } = req.body;

  try {
      // Criar o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      console.log(`Usuário ${user.email} cadastrado com sucesso!`);
      res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
      console.error('Erro ao cadastrar:', error.message);
      res.status(400).json({ message: 'Erro ao cadastrar: ' + error.message });
  }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development



  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//////////////////////////////////////////////////////////////////

/*// Rota para cadastrar um produto
app.post('/produtos/cadastrar', (req, res) => {
  const { nomeProduto, precoProduto } = req.body;

  // Lógica para salvar o produto no banco de dados
  // Aqui você pode usar Firebase ou outro banco de dados

  // Resposta de sucesso
  res.status(200).json({ message: 'Produto cadastrado com sucesso!' });
});

// Rota para listar produtos
app.get('/produtos', (req, res) => {
  const produtos = [
      { id: 1, nome: 'Pizza Margherita', preco: 30.00 },
      { id: 2, nome: 'Pizza Calabresa', preco: 35.00 }
  ];
  res.json(produtos);
});

// Rota para listar pedidos (exemplo simples)
app.get('/pedidos', (req, res) => {
  const pedidos = [
      { id: 1, cliente: 'João', status: 'Em Preparação' },
      { id: 2, cliente: 'Maria', status: 'Entregue' }
  ];
  res.json(pedidos);
});*/

///////////////////////////////////////////////////////////////////

// Rota para cadastro de produto

// Rota para cadastrar um produto
// Rota para cadastrar produto
app.post('/produtos/cadastrar', async (req, res) => {
  const { nomeProduto, precoProduto, imagemProduto } = req.body;

  if (!nomeProduto || !precoProduto || !imagemProduto) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
      const docRef = await addDoc(collection(db, "produtos"), {
          nome: nomeProduto,
          preco: parseFloat(precoProduto),
          imagem: imagemProduto,
          createdAt: new Date(),
      });

      res.status(200).json({ message: 'Produto cadastrado com sucesso!', id: docRef.id });
  } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      res.status(500).json({ message: 'Erro ao cadastrar produto' });
  }
});


// Rota para listar produtos
app.get('/produtos', async (req, res) => {
  try {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const produtos = [];
      querySnapshot.forEach((doc) => {
          produtos.push({ id: doc.id, ...doc.data() });
      });
      res.json(produtos);
  } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({ message: 'Erro ao listar produtos' });
  }
});





module.exports = app;

const port = 500;

app.listen(port, () => {
  console.log(`site hospedado em http://localhost:${port}`)
})