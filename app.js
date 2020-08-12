var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var { getPillboxes, addPillbox } = require("./data/pillbox");

var cors = require("cors");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Pillbox {
    pillboxid: Int
		userid: Int
		status: String
		consumed: Int
		remaining: Int
		frequency: String
		time: String
  },
  type Query {
    pillboxes: [Pillbox]
  },
  type Mutation {
    addPillbox(userid: Int!, status: String!, consumed: Int!, remaining: Int!, frequency: String!, time: String!): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  pillboxes: () => {
    return getPillboxes();
  },
  addPillbox: args => {
    console.log(args);
    return addPillbox(args);
  }
};

var app = express();
app.use(cors());
app.use(
  "/adminbff/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

var router = express.Router();

router.get('/', function (req, res, next) {
  res.json({status: 'UP'});
});

app.use("/health", router);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
