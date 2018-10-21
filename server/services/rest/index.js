const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('../../../config');
const apiRouter = require('./api');
const socket = require('./socket');

const app = express();
const server = https.createServer({
	key: fs.readFileSync(config.ssl.key, 'utf8'),
	cert: fs.readFileSync(config.ssl.cert, 'utf8')
}, app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRouter);

app.use('/admin', express.static(path.resolve(__dirname, '../../../client/admin/dist')));
app.use('/driver', express.static(path.resolve(__dirname, '../../../client/driver/dist')));

app.get('/admin/*', (req, res) => {
	return res.sendFile(path.resolve(__dirname, '../../../client/admin/dist/index.html'));
});

app.get('/driver/*', (req, res) => {
	return res.sendFile(path.resolve(__dirname, '../../../client/driver/dist/index.html'));
});

server.listen(config.rest, err => {
	if(err){
		console.log('REST: Error starting webserver');
		return;
	}
	console.log('REST: webserver started successfully', config.rest);

	socket.run(server);
});
