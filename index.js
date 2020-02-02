var restify = require('restify');
const mongoose=require('mongoose');
var server = restify.createServer();
var io = require('./realtime');
global._io = io;
server.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
const corsMiddleware = require('restify-cors-middleware')
const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['http://localhost:4200'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
  })
server.pre(cors.preflight);
var bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
serverl=server.listen(3100,()=>{
    console.log('listening on port 3100');
});

io.connect(serverl);
mongoose.connect('mongodb://localhost:27017/BellLabs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database"); 
       
}).catch(err => {
    console.log('Could not connect  to the database. Exiting now...', err);
    process.exit();
});
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => {
    require('./routes/charts.routes')(server,io);
    console.log(`Server started on port 3100`);
});




