require('dotenv').config();
const express = require('express');
const loginRouter = require('./routes/loginRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());

app.use(loginRouter);
app.use(categoryRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));