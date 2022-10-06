require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const viewsPath = path.join(__dirname, 'views');

// USE FILE SYSTEM TO LOCATE GUIDES
const fs = require('fs');

// EXPRESS CONFIGURATIONS
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', viewsPath);
app.use('/public', express.static(__dirname + '/public'));

//CONNECTIONS TO MONGODB
function makeNewConnection(uri) {
	var newConnection = mongoose.connect(uri);
	var db = mongoose.connection;
	console.log('db = ' + db);
	return db, console.log('Mongoose is ' + mongoose.connection.readyState);
}

// DATABASE CONNECTIONS
const estesdb = 'mongodb://localhost:27017/estes';

//CREATE ESTES DB SCHEMA
const estesSiteSchema = new mongoose.Schema({
	AlphaCode: String,
	terminalNum: Number,
	terminalName: String,
	streetAddress: String,
	city: String,
	state: String,
	zip: Number,
	phone: String,
	fax: String,
	terminalManager: String,
	wireless: String,
	cellular: String,
	opwIcuSci: String,
	crdRdrIp: String,
	crdRdrPort: Number,
	atgIp1: String,
	atgIp2: String,
	atgPort: Number,
	fsc: String,
	fscPort: Number,
	fscLogin: String,
	fscPassword: String,
	vendor1: String,
	vendor1Phone: String,
	vendor1Email: String,
	vendor2: String,
	vendor2Phone: String,
	vendor2Email: String,
	notes: String,
	atgModel: String,
	tank1: String,
	tank2: String,
	tank3: String,
	tank4: String,
	tank5: String,
	astUst: String,
	defNozz: String,
	defHose: String,
	dispMan1: String,
	dispMan2: String,
	dispMan3: String,
	dispMod1: String,
	dispMod2: String,
	dispMod3: String,
	diesNum: Number,
	curbHoseLength: Number,
	swivelPn: String,
	bwayPn: String,
	fuelFiltPn: String,
	manholeCoverDiam: String,
	numOfManholeCover: String,
	otherItems: String,
});

//CREATE ESTES DB MODEL
const EstesSite = mongoose.model('EstesSite', estesSiteSchema, (collection = 'estesSites'));

//CREATE ODFL DB SCHEMA
const odflSiteSchema = new mongoose.Schema({
	AlphaCode: String,
	terminalNum: Number,
	terminalName: String,
	streetAddress: String,
	city: String,
	state: String,
	zip: Number,
	phone: String,
	fax: String,
	terminalManager: String,
	wireless: String,
	cellular: String,
	opwIcuSci: String,
	crdRdrIp: String,
	crdRdrPort: Number,
	atgIp1: String,
	atgIp2: String,
	atgPort: Number,
	fsc: String,
	fscPort: Number,
	fscLogin: String,
	fscPassword: String,
	vendor1: String,
	vendor1Phone: String,
	vendor1Email: String,
	vendor2: String,
	vendor2Phone: String,
	vendor2Email: String,
	notes: String,
	atgModel: String,
	tank1: String,
	tank2: String,
	tank3: String,
	tank4: String,
	tank5: String,
	astUst: String,
	defNozz: String,
	defHose: String,
	dispMan1: String,
	dispMan2: String,
	dispMan3: String,
	dispMod1: String,
	dispMod2: String,
	dispMod3: String,
	diesNum: Number,
	curbHoseLength: Number,
	swivelPn: String,
	bwayPn: String,
	fuelFiltPn: String,
	manholeCoverDiam: String,
	numOfManholeCover: String,
	otherItems: String,
});

//CREATE ODFL DB MODEL
const OdflSite = mongoose.model('OdflSite', odflSiteSchema, (collection = 'odflSites'));

//CREATE SAIA DB SCHEMA
const saiaSiteSchema = new mongoose.Schema({
	AlphaCode: String,
	terminalNum: Number,
	terminalName: String,
	streetAddress: String,
	city: String,
	state: String,
	zip: Number,
	phone: String,
	fax: String,
	terminalManager: String,
	wireless: String,
	cellular: String,
	opwIcuSci: String,
	crdRdrIp: String,
	crdRdrPort: Number,
	atgIp1: String,
	atgIp2: String,
	atgPort: Number,
	fsc: String,
	fscPort: Number,
	fscLogin: String,
	fscPassword: String,
	vendor1: String,
	vendor1Phone: String,
	vendor1Email: String,
	vendor2: String,
	vendor2Phone: String,
	vendor2Email: String,
	notes: String,
	atgModel: String,
	tank1: String,
	tank2: String,
	tank3: String,
	tank4: String,
	tank5: String,
	astUst: String,
	defNozz: String,
	defHose: String,
	dispMan1: String,
	dispMan2: String,
	dispMan3: String,
	dispMod1: String,
	dispMod2: String,
	dispMod3: String,
	diesNum: Number,
	curbHoseLength: Number,
	swivelPn: String,
	bwayPn: String,
	fuelFiltPn: String,
	manholeCoverDiam: String,
	numOfManholeCover: String,
	otherItems: String,
});

//CREATE SAIA DB MODEL
const SaiaSite = mongoose.model('SaiaSite', saiaSiteSchema, (collection = 'saiaSites'));

// QUERY COLLECTION IN ESTES DB AND SHOW IN HTML

app.post('/search', function (req, res) {
	var userSearch = req.body.search;

	const searchOptions = req.body.searchOptions;
	console.log('searchOptions = ' + searchOptions);
	console.log('userSearch = ' + userSearch);
	var customerName = req.body.customerName;
	console.log('dbConnection = ' + mongoose.connection.readyState);
	var form = req.body.searchSubmit;

	// MAKE SEARCH OPTIONS LOWERCASE OR UPPERCASE DEPENDING ON DB
	if (searchOptions == 'AlphaCode') {
		userSearch = userSearch.toUpperCase();
	} else if (searchOptions == 'terminalName' || searchOptions == 'city') {
		searchLowerCase = userSearch.toLowerCase();
		userSearch = searchLowerCase.charAt(0).toUpperCase() + searchLowerCase.slice(1);
	}

	// CHOOSE WHICH CUSTOMER DATABASE TO SEARCH IN
	makeNewConnection(estesdb);
	if (customerName == 'estes') {
		var query = EstesSite.find();
	} else if (customerName == 'odfl') {
		var query = OdflSite.find();
	} else if (customerName == 'saia') {
		var query = SaiaSite.find();
	}
	console.log(customerName);

	// QUERY CUSTOMER DATABASE
	query
		.where(searchOptions)
		.equals(userSearch)
		.exec(function (err, foundSite) {
			console.log('DB is ' + mongoose.connection.readyState);
			console.log('form = ' + form);
			console.log('foundSite length = ' + foundSite.length);
			if (foundSite.length === 1) {
				res.render('search', { newSearch: foundSite, customerName: customerName });
			} else if (foundSite.length < 1) {
				res.render('error');
			} else if (foundSite.length > 1) {
				res.render('advancedSearch', {
					newSearch: foundSite,
					customerName: customerName,
				});
			}
		});
});

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/search', function (req, res) {
	res.render('search');
});

app.get('/dipSwitch', function (req, res) {
	res.render('dipSwitch');
});

app.get('/commonFSCCommands', function (req, res) {
	res.render('commonFSCCommands');
});

app.get('/tCheckError', function (req, res) {
	res.render('tCheckError');
});

app.get('/troubleShootFlowChart', function (req, res) {
	var filepath = '/data/troubleShootFlowChart.pdf';

	fs.readFile(__dirname + filepath, function (err, data) {
		res.contentType('application/pdf');
		res.send(data);
	});
});

app.get('/tlsTroubleshootingGuide', function (req, res) {
	var filepath = '/data/tlsTroubleshootingGuide.pdf';

	fs.readFile(__dirname + filepath, function (err, data) {
		res.contentType('application/pdf');
		res.send(data);
	});
});

app.get('/commonAtgCommands', function (req, res) {
	res.render('commonAtgCommands');
});

app.get('/loopbackTest', function (req, res) {
	res.render('loopbackTest');
});

app.get('/wirelessComms', function (req, res) {
	res.render('wirelessComms');
});

app.get('/javascripts/formulas', function (req, res) {
	res.sendFile(path.join(__dirname + 'javascripts' + 'formulas.js'));
});

app.listen(3000, function () {
	console.log('Server started on port 3000.');
});
