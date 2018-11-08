const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const config = require('../../config');
const socket = require('./socket');
const admin = require('./router/admin');
const auth = require('./router/auth');
const missions = require('./router/missions');
const utilities = require('./router/utilities');
const cors = require('cors');

const app = express();
const server = https.createServer({
	key: fs.readFileSync(config.ssl.key, 'utf8'),
	cert: fs.readFileSync(config.ssl.cert, 'utf8')
}, app);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/admin', admin);
app.use('/auth', auth);
app.use('/missions', missions);
app.use('/utility', utilities);


server.listen(config.rest, err => {
	if(err){
		console.log('REST: Error starting webserver');
		return;
	}
	console.log('REST: webserver started successfully', config.rest);

	socket.run(server);
});
