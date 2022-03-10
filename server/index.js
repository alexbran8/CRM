const cookieSession = require("cookie-session");

const bodyParser = require('body-parser')
const express = require("express");
const app = express();
const port = 4000;
const passport = require("passport");
const refresh = require('passport-oauth2-refresh');
const passportSetup = require("./config/passport-setup");
const authRoutes = require("./routes/auth-routes");

const sequelize = require("sequelize");
const DataTypes = sequelize.DataTypes;

const keys = require("./config/keys");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // parse cookie header
const path = require("path");
const config = require("./config/configProvider")();

const { ApolloServer } = require("apollo-server-express");
// var { graphqlHTTP } = require("express-graphql");
// var { buildSchema } = require("graphql");

const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
const context = require("./graphql/context");
const jwt = require('jsonwebtoken')
const db = require("./models");
const { AuthenticationError } = require('apollo-server-express')
// const strategy = require("./config/passport-setup");

// const refresh = require('passport-oauth2-refresh');

const options = {
  port: 4000,
  bodyParserOptions: { limit: "10mb", type: "application/json" },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
    const user = req.headers || '';
    // console.log(user)
    // console.log(token)
   
    // try to retrieve a user with the token
    // const user = getUser(token);
    var decoded = jwt.decode(token)
    console.log('exp',new Date(1000 * decoded.exp));
    console.log('now',new Date());

    if (new Date(1000 * decoded.exp) < new Date() )throw new AuthenticationError('token has expired');
   
    // optionally block the user
    // we could also check user roles/permissions here
    if (!user) throw new AuthenticationError('you must be logged in');
   
    // add the user to the context
    return { user };
   },

    uploads: {
      maxFieldSize: 1000000000,
      maxFileSize: 1000000000
    }
  // context,
  // introspection: true,
  // playground: {
  //   settings: {
  //     "schema.polling.enable": false,
  //     "editor.fontSize": 18,
  //   },
  // },
});
var getRawBody = require('raw-body')

// app.use(express.limit('4M'));
// app.use(function (req, res, next) {
//   getRawBody(req, {
//     // length: req.headers['content-length'],
//     limit: '2mb',
//     // encoding: contentType.parse(req).parameters.charset
//   }, function (err, string) {
//     if (err) return next(err)
//     req.text = string
//     next()
//   })
// })

app.use(express.json({limit: 2000000}));
app.use(express.urlencoded({limit: 2000000, extended: true}));

db.sequelize2
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


// define session
app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000
  })
)

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());

// deserialize cookie from the browser
app.use(passport.session());
// app.use(passport.refresh.initialize())
// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

// set up routes
app.use("/auth", authRoutes);
// require("./routes/dailyTasks.routes")(app);
// require("./routes/competence.routes")(app);
// require("./routes/resource.routes")(app);


const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

const authCheckMiddleware = require('./middleware/auth-check')
// app.use("/users", authCheck,  require("./controllers/users"));
// app.use("/usersPrivate", authCheck, require("./controllers/usersPrivate"));
// app.use("/schedule",  authCheck, require("./controllers/schedule"));
// app.use("/types", find(Types));


app.use("/", express.static(path.resolve(__dirname, "../client/public/dist")));

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

// apolloServer.applyMiddleware({ app, path: "/graphql" });


apolloServer.start().then(res => {
  apolloServer.applyMiddleware({ app, path: "/graphql" });
  app.listen(options, () => console.log(`Server is running on port ${port}!`));
 })

// connect react to nodejs express server
// app.listen(options, () => console.log(`Server is running on port ${port}!`));
