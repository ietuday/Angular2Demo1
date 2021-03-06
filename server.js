// Global variables
var port = '9000';
var openSessions = {};
var dashboards = {};

var http = require('http');
var ejs = require('ejs');
var request = require('request');
var url = require('url');
var fs = require('fs');
var vivintVivr2 = require("./serverModules/vivintVivr2.js");
var agentAssist = require("./serverModules/agentAssist.js");
var agentAssistCall = require("./serverModules/agentAssistCall.js")

var WebSocketServer = require('ws').Server;
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/dist'));

app.set('views', __dirname + '/dist');

app.engine('html', ejs.renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.render(index.html));
app.get('/receivecall', (req, res) => vivintVivr2.receivecall(req, res, port));
app.get('/decision', (req, res) => vivintVivr2.decision(req, res, port));
app.get('/cdr', (req, res) => vivintVivr2.registerCDR(req, res));
app.get('/assignagent', (req, res) => agentAssist.assignagent(req, res, openSessions, dashboards));

app.get('*', (req, res) => res.render('index.html'));

var httpServer = http.createServer(app);
httpServer.listen(port);
console.log("Listen PORT: ", port);

var wss = new WebSocketServer({
    server: httpServer
});

wss.on("open", function (con) {
    console.log(
            "open", con
            );
});

wss.on('connection', function (connection) {
    console.log("******** new app connected: connection.id", connection._ultron.id);
    connection.send(JSON.stringify({
        action: "wsConnected",
        email: "",
        data: "",
        status: "New ws connection"
    }));
    connection.on('message', function (message) {
        console.log("Server onMessage", message);

        var data;
        try {
            data = JSON.parse(message);
            if (data.a == undefined) {
                data.message = data.message;
            } else {
                return;
            }
        } catch (e) {
            console.log("Invalid JSON");
            return;
        }

        console.log("process action", data.action);
        switch (data.action) {

            case "login" :
                agentAssist.login(connection, openSessions, dashboards, data);
                break;

            case "logout" :
                agentAssist.logout(connection, openSessions, dashboards);
                break;

            case "registerDashboard" :
                agentAssist.registerDashboard(connection, openSessions, dashboards, data);
                break;

            case "toggleStatus" :
                agentAssist.toggleStatus(connection, openSessions, dashboards, data);
                break;

            case "getCdr" :
                    agentAssistCall.getCdr(connection, openSessions, dashboards, data);
                    break;
        }

    });

    connection.on("close", function () {
        console.log("Closing connection", this._ultron.id);
        agentAssist.logout(connection, openSessions);
    });

});
