const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const mongoose = require('mongoose');

const passwordMongoDB = 'cQvUZ5sxufMGy6m';
const userNameMongoDB = 'graphql';

mongoose.connect(`mongodb://${userNameMongoDB}:${passwordMongoDB}@ds115701.mlab.com:15701/heroku_5lc6f430`, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to database');
})
app.use('/graphql', graphqlHTTP({
  schema, 
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
})