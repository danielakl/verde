// @flow
'use strict';

import express from 'express';
import bodyParser from 'body-parser';

import articleRoute from "./routes/articleRoute";
import Database from "./database/Database";

const server = express();

// Automatically parse json content
server.use(bodyParser.json());

// Initialize database.
Database();

// REST API routes.
server.use("/api/article", articleRoute);

// Serve the React client
server.use(express.static(__dirname + '/../../client'));

// Start the web server at port 3000
server.listen(3000);

export default server;
