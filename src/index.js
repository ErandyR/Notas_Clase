/*const express = require('express');
const bodyparser = require('body-parser');
const { userRouter } = require('./routers/userRouter');
const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use('/users', userRouter);

app.listen(process.env.PORT || 3000, function() {
  console.info(`Servidor corriendo en:`, this.address());
}).on('error', err => {
  console.error(err);
});

module.exports = { app };*/

const knex = require('knex')({
  client: 'mysql',
  connection:  {
    host: '127.0.0.1',
    user: 'admin',
    password: '12345',
    database: 'laboratoria'
  }
});

const bodyparser = require('body-parser');
const express = require('express');
const app = express();


app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/users', (request, response) => {
  knex
    .select('*').from('users')
    .then(results => {
      response.json(results);
    });
});

app.post('/users', (req, res) => {
  const {username, password} = req.body;
  knex
    .insert({username, password}).into('users')
    .then(newUserId => {
      res.json(newUserId);
    });
});

app.put('/users/:id', (req, res) => {
  const {username, password} = req.body;
  knex('users')
    .update({username, password}).where('id', req.params.id)
    .then(success => {
      res.json({success});
    });
});

app.delete('/users/:id', (req, res) => {
  knex('users').where('id', req.params.id).del()
    .then(success => {
      res.json({success});
    });
});

app.listen(3000, (err) => {
  if(err){
    console.error(err);
  }
  console.log('Servidor corriendo');
})

//knex.select('*').from('users').then(results => console.log(results));
//knex.insert({ username: 'Test', password: 'test' }).into('users').then(console.log);
//knex('users').update({ username: 'User_Test' }).where('username', 'Test').then(console.log);
//knex('users').where('id', req.params.id).del().then(console.log);
//knex.select('*').from('notes').where('user_id',2).then(console.log);