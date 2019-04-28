let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
// mongoose.connect('mongodb://localhost:27017/stickyDB', {
//     useMongoClient: true
// });
mongoose.connect('mongodb+srv://lipang:123@cluster0-hwju3.mongodb.net/test?retryWrites=true', {
    useMongoClient: true,
    useNewUrlParser: true
});



mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Initialize app
let initApp = require('./api/app');
initApp(app);

app.listen(port);
console.log('Stickies RESTful API server started on: ' + port);




// const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;

// const server = app.listen(port);

// const shutdownManager = new GracefulShutdownManager(server);

// process.on('SIGTERM', () => {
//   shutdownManager.terminate(() => {
//     console.log('Server is gracefully terminated');
//   });
// });