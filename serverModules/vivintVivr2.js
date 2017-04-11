/* 
 * Add migrated code from Java to nodejs for VivintVivr2 project
 */

var vxmlUtilities = require("./vxmlUtilities.js");
var config = require("./config.js");
var url = require('url');
var fs = require('fs');

exports.receivecall = function (req, res, port) {

    console.log("START index", config);
    var url_parts = url.parse(req.url, true);
    config.logMessageJson.smartphone_ani = url_parts.query.ANI;
    config.logMessageJson.smartphone_dnis = url_parts.query.DNIS;
    config.logMessageJson.webServer = req.protocol + "://" + req.get('host') + "/";

    var logMessage = JSON.stringify(config.logMessageJson);

    if (config.logMessageJson.logType == "V") {
        console.log("logType:", config.logMessageJson.logType, "|index.jsp", logMessage);
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '_' + mm + '_' + yyyy;
    var dir = config.logMessageJson.dirPath + today;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var callRecPath = dir + "/";

    fs.readFile('./vxml/index.vxml', 'utf-8', (err, data) => {
        if (err)
            throw err;
        var vxmlfile = data
                .replace(/<%=smartphone_ani%>/g, config.logMessageJson.smartphone_ani)
                .replace(/<%=smartphone_dnis%>/g, config.logMessageJson.smartphone_dnis)
                .replace(/<%=webServer%>/g, config.logMessageJson.webServer)
                .replace(/<%=appName%>/g, config.logMessageJson.appName)
                .replace(/<%=logType%>/g, config.logMessageJson.logType)
                .replace(/<%=exitState%>/g, config.logMessageJson.exitState)
                .replace(/<%=outcome%>/g, config.logMessageJson.outcome)
                .replace(/<%=logMessage%>/g, '')
                .replace(/<%=callRecPath%>/g, callRecPath);
//                .replace(/<%=logMessage%>/g, logMessage)

        console.log(config.logMessageJson, vxmlfile);
        res.write(vxmlfile);
        setTimeout(() => {
            res.end();
        }, 10);
    });
};

exports.decision = function (req, res, port) {
//    http://10.0.10.63:9000/decision?portname=24&smartphone_ani=121&smartphone_cdr=tom-PORT24-0316201714051779&smartphone_dnis=9999&specialTransferVDN=
    var url_parts = url.parse(req.url, true);
    console.log("decision Start" + config.logMessageJson.smartphone_dnis);

    config.logMessageJson.moduleName = "decision";

    // Request Parameters
    config.logMessageJson.smartphone_ani = url_parts.query.ANI;
    config.logMessageJson.smartphone_dnis = url_parts.query.DNIS;
    config.logMessageJson.webServer = req.protocol + "://" + req.get('host') + "/";
    var smartphone_ani = url_parts.query.smartphone_ani;
    var portname = url_parts.query.portname;
    var numberToDial = url_parts.query.numberToDial;
    var specialTransferVDN = url_parts.query.specialTransferVDN;
    var state = "NA";
    var audioFileName = "#";
    try {
        audioFileName = url_parts.query.audioFileName;
        if (audioFileName == "") {
            audioFileName = "#";
        }
    } catch (e) {
        audioFileName = "#";
    }

    //Area code received by reading areacode.properties
    if (config.areacode == undefined) {
        var state = "NA";
    } else {
        var state = config.areacode.smartphone_ani == undefined ? "NA" : config.areacode.smartphone_ani;
    }

    var primaryGateway = config.primaryGateway;
    var secondaryGateway = config.secondaryGateway;
    var defaultVDN = config.defaultVDN == undefined ? "84699" : config.defaultVDN;
    var specialVDN1 = config.specialVDN1;
    var specialVDN2 = config.specialVDN2;
    var specialVDN3 = config.specialVDN3;
    var specialVDN4 = config.specialVDN4
    var specialVDN5 = config.specialVDN5
    var specialVDN6 = config.specialVDN6
    var specialVDN7 = config.specialVDN7
    var specialVDN8 = config.specialVDN8
    var specialVDN9 = config.specialVDN9
    var specialVDN10 = config.specialVDN10
    var specialVDN11 = config.specialVDN11
    var specialVDN12 = config.specialVDN12
    var specialVDN13 = config.specialVDN13
    var specialVDN14 = config.specialVDN14

    var custLoyalty1 = config.custLoyalty1
    var custLoyalty2 = config.custLoyalty2
    var custLoyalty3 = config.custLoyalty3
    var custLoyalty4 = config.custLoyalty4
    var custLoyalty5 = config.custLoyalty5
    var custLoyalty6 = config.custLoyalty6
    var custLoyalty7 = config.custLoyalty7

    var noinputVDN = config.noinputVDN
    var cameraVDN = config.cameraVDN
    var spanishVDN = config.spanishVDN

    config.logMessageJson.webServer = req.protocol + "://" + req.get('host') + "/";
    var agentAssistURL = config.agentAssistURL;

    // Derived Parameters and variables
    config.logMessageJson.exitState = "Greeting";
    config.logMessageJson.outcome = "disconnected in decision.jsp";

    var systemname = "ivr";
    if(config.logMessageJson.smartphone_cdr != undefined) {
        systemname = config.logMessageJson.smartphone_cdr.substring(0, config.logMessageJson.smartphone_cdr.indexOf("-"));
    } else {
        console.log("logType:" + config.logMessageJson.logType + "|Inside decision.jsp");
    }

    var allowBargein = config.allowBargein;
    config.logMessageJson.audioFileName = audioFileName;
    config.logMessageJson.agentAssistURL = agentAssistURL;
    config.logMessageJson.exitState = config.logMessageJson.exitState;
    config.logMessageJson.audioFileName = audioFileName;
    config.logMessageJson.outcome = config.logMessageJson.outcome;

    var logMessage = JSON.stringify(config.logMessageJson);
    logMessage = logMessage.replace("\"", "");

    if (config.logMessageJson.logType == "V") {
        console.log("logType:" + config.logMessageJson.logType + "|Inside decision.jsp" + logMessage);
    }

    fs.readFile('./vxml/decision.vxml', 'utf-8', (err, data) => {
        if (err)
            throw err;
        var vxmlfile = data
                .replace(/<%=smartphone_ani%>/g, config.logMessageJson.smartphone_ani)
                .replace(/<%=smartphone_dnis%>/g, config.logMessageJson.smartphone_dnis)
                .replace(/<%=webServer%>/g, config.logMessageJson.webServer)
                .replace(/<%=appName%>/g, config.logMessageJson.appName)
                .replace(/<%=logType%>/g, config.logMessageJson.logType)
                .replace(/<%=exitState%>/g, config.logMessageJson.exitState)
                .replace(/<%=outcome%>/g, config.logMessageJson.outcome)
                .replace(/<%=logMessage%>/g, '')
                .replace(/<%=audioFileName%>/g, audioFileName)
                .replace(/<%=specialTransferVDN%>/g, specialTransferVDN)
                .replace(/<%=systemname%>/g, systemname)
                .replace(/<%=primaryGateway%>/g, primaryGateway)
                .replace(/<%=secondaryGateway%>/g, secondaryGateway)
                .replace(/<%=defaultVDN%>/g, defaultVDN)
                .replace(/<%=specialVDN1%>/g, specialVDN1)
                .replace(/<%=specialVDN2%>/g, specialVDN2)
                .replace(/<%=specialVDN3%>/g, specialVDN3)
                .replace(/<%=specialVDN4%>/g, specialVDN4)
                .replace(/<%=specialVDN5%>/g, specialVDN5)
                .replace(/<%=specialVDN6%>/g, specialVDN6)
                .replace(/<%=specialVDN7%>/g, specialVDN7)
                .replace(/<%=specialVDN8%>/g, specialVDN8)
                .replace(/<%=specialVDN9%>/g, specialVDN9)
                .replace(/<%=specialVDN10%>/g, specialVDN10)
                .replace(/<%=specialVDN11%>/g, specialVDN11)
                .replace(/<%=specialVDN12%>/g, specialVDN12)
                .replace(/<%=specialVDN13%>/g, specialVDN13)
                .replace(/<%=specialVDN14%>/g, specialVDN14)
                .replace(/<%=custLoyalty1%>/g, custLoyalty1)
                .replace(/<%=custLoyalty2%>/g, custLoyalty2)
                .replace(/<%=custLoyalty3%>/g, custLoyalty3)
                .replace(/<%=custLoyalty4%>/g, custLoyalty4)
                .replace(/<%=custLoyalty5%>/g, custLoyalty5)
                .replace(/<%=custLoyalty6%>/g, custLoyalty6)
                .replace(/<%=custLoyalty7%>/g, custLoyalty7)
                .replace(/<%=noinputVDN%>/g, noinputVDN)
                .replace(/<%=cameraVDN%>/g, cameraVDN)
                .replace(/<%=spanishVDN%>/g, spanishVDN)
                .replace(/<%=state%>/g, state)
                .replace(/<%=allowBargein%>/g, allowBargein)
                .replace(/<%=agentAssistURL%>/g, agentAssistURL)
//                .replace(/<%=logMessage%>/g, logMessage)

        console.log(config.logMessageJson, vxmlfile);
        res.write(vxmlfile);
        setTimeout(() => {
            res.end();
        }, 10);
    });

};

exports.registerCDR = function (req, res) {
    console.log('Inside registerCDR');
    var url_parts = url.parse(req.url, true);
    var smartphone_cdr = url_parts.query.smartphone_cdr;
    var smartphone_ani = url_parts.query.smartphone_ani;
    var smartphone_dnis = url_parts.query.smartphone_dnis;
    var portname = url_parts.query.portname;
    console.log('url_parts', smartphone_cdr, smartphone_ani, smartphone_dnis, portname);
    var namelist = 'p1 p2';

    vxmlUtilities.subdialogReturn(namelist, function (xml) {
        console.log(xml);

        res.write(xml);
        setTimeout(() => {
            res.end();
        }, 10);

    });
};
