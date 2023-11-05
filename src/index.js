require('dotenv').config();
const express = require('express');
const cors = require('cors');

const loginRouter = require('./routes/loginRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');
const clientRouter = require('./routes/clientRouter');
const productRouter = require('./routes/productRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRouter);
app.use(categoryRouter);
app.use(userRouter);
app.use(clientRouter);
app.use(productRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});