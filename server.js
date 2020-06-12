const express = require('express');
const path = require('path');
const routes = require('./routes/send.route');
const app = express();


app.use(express.json({limit: '100mb'}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'view')));
app.use(routes);


app.listen(3000, ()=>{
  console.log('Serviço esta ok!');
})