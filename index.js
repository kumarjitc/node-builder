const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

const config = require('./server/routes/config-routes');
const build = require('./server/routes/run-routes');
const store = require('./server/routes/store-routes');
const workflow = require('./server/routes/workflow-routes');

let http = require("http").Server(app);

// Request Payload Configuration
app.use(express.json());
app.use(express.raw());

// CORS Config
app.use(cors());

/**
 * Module Routes
 */
// Config
app.use('/', config);
app.use('/configs', config);
// Build
app.use('/build', build);
// Store
app.use('/store', store);
// Workflow
app.use('/workflow', workflow);

http.listen(port, () => {
    console.info('Application Running At Port', port);
})
