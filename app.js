
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var lifts = require('./routes/lifts');
var liftlists = require('./routes/liftlists');
var user = require('./routes/user');
var create = require('./routes/create');
var history = require('./routes/user_history');
var store = require('./routes/store');
var add = require('./routes/addLifts');
var list = require('./routes/listInProgress');
var viewList = require('./routes/viewList');
var viewLift = require('./routes/viewLift');
// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
var local_database_name = 'cs147project';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/B', index.viewAlt)
app.get('/lifts', lifts.view);
app.get('/liftlists', liftlists.view);
app.get('/user_login', user.login);
app.get('/user_logout', user.logout);
app.get('/user_create', user.create);
app.get('/create', create.view);
app.get('/create/b', create.viewAlt);
app.get('/user_history', history.view);
app.get('/store', store.view);
app.post('/store/addLift/:id', store.addLift);
app.post('/store/addLift2/:name', store.addLift2);
app.get('/addLifts/:id', add.view);
app.get('/liftlists/create/:name', liftlists.create);
app.post('/liftlists/addTo/:listID/:liftID', liftlists.addTo);
app.post('/liftlists/deleteFrom/:listID/:liftID', liftlists.deleteFrom);
app.get('/listInProgress/:id', list.doList);
app.get('/viewList/:id', viewList.view);
app.post('/user_history/:id/:name/:reps/:weight', history.addTo);
app.get('/viewLift/store/:name', viewLift.storeView);
app.get('/viewLift/non/:name', viewLift.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});