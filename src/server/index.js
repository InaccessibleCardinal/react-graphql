const app = require('express')();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const bodyParser = require('body-parser');
//const headerMiddleware = require('./headerMiddleware');
const cors = require('cors');

// app.use(bodyParser.urlencoded({extended: true}));
//app.use(headerMiddleware);

app.use('/graphql', cors(), graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(9000, () => console.log('Listening on port 9000'));