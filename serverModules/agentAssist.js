/*
 * Add migrated code from Java to nodejs for AgentAssist project
 */

var url = require('url');

var sendToClient = function (connection, message) {
    try {
        connection.send(JSON.stringify(message), function ack(error) {
            if (error != undefined) {
                console.log("Error sending data", JSON.stringify(message), error);
            }
        });
    } catch (e) {
        console.log("Error sending data", JSON.stringify(message))
    }
};

var getDashboard = function (connection, openSessions, dashboards, data) {
    console.log("Inside getDashboard");
    var returnData = [];
    for (var i in openSessions) {
        console.log("getDashboard row", i);
        returnData.push({
            username: openSessions[i].username,
            available: openSessions[i].available,
            cumulativeTime: openSessions[i].cumulativeTime
        });
    }
    data.message = returnData;
    data.status = "Success";
    for (var i in dashboards) {
        sendToClient(dashboards[i].connection, data);
    }
};

exports.login = function (connection, openSessions, dashboards, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "username": data.message.username,
        "available": true,
        "cumulativeTime": 0
    };
    data.status = "Success";
    sendToClient(connection, data);

    // send new user to the dashboard
    data.action = "getDashboard";
    getDashboard(connection, openSessions, dashboards, data);
};

exports.logout = function (connection, openSessions, dashboards) {
    delete openSessions[connection._ultron.id + ""];
    // send new user to the dashboard
    var data = {};
    data.status = "Success";
    data.action = "getDashboard";
    data.message = {};
    getDashboard(connection, openSessions, dashboards, data);
};

exports.registerDashboard = function (connection, openSessions, dashboards, data) {
    dashboards[connection._ultron.id] = {
        "connection": connection
    };
    // send new user to the dashboard
    data.action = "getDashboard";
    getDashboard(connection, openSessions, dashboards, data);
};

exports.toggleStatus = function (connection, openSessions, dashboards, data) {
    console.log("Inside available function:",data);
    var statusHandler;
    if(data.status == 'Unavailable'){
        statusHandler = false;
    }
    if(data.status == 'Available'){
       statusHandler = true;
    }
    openSessions[connection._ultron.id] = {
     "connection": connection,
     "username": data.username,
     "available": statusHandler,
       "cumulativeTime": 0
   };
   data.action = "getDashboard";
   getDashboard(connection, openSessions, dashboards, data);
};

exports.assignagent = function (req, res, openSessions, dashboards) {
    //http://10.2.211.196:8080/AgentAssist/vxml/InvokeAgentAPI.jsp
    //?CheckifMobileJSP=http%3A%2F%2F10.2.211.196%3A8080%2FVivintVivr2%2Fvxml%2FCheckIfMobile.jsp
    //&appUrl=http%3A%2F%2F10.2.211.196%3A8080%2FVivintVivr2
    //&audioPhrase=percolate60s_new.vox&callBackJSP=http%3A%2F%2F10.2.211.196%3A8080%2FVivintVivr2%2Fvxml%2Fdecision.jsp
    //&cancelFlag=false
    //&defaultVDN=84699
    //&grammarName=billing.grxml
    //&pageName=Billing
    //&primaryGateway=@172.16.254.125
    //&recordedFileName=http%3A%2F%2F10.2.211.195%2FArcMrcpConnector%2Flogs%2Faudio%2Faudio_en-us_nomatch_20170317-03081603_519.wav
    //&secondaryGateway=@172.16.254.122
    //&smartphone_ani=7325282639
    //&smartphone_cdr=ivr-sl1-PORT8-0317201703065525
    //&specialTransferVDN=null
    //&specialVDN11=84697
    //&status=pending
    //&waitForAgentCounter=200

    console.log("Inside assignagent function:");
    var url_parts = url.parse(req.url, true);
    var params = {};
    params.CheckifMobileJSP = url_parts.query.CheckifMobileJSP;
    params.appUrl = url_parts.query.appUrl;
    params.audioPhrase = url_parts.query.audioPhrase;
    params.callBackJSP = url_parts.query.callBackJSP;
    params.cancelFlag = url_parts.query.cancelFlag;
    params.defaultVDN = url_parts.query.defaultVDN;
    params.grammarName = url_parts.query.grammarName;
    params.pageName = url_parts.query.pageName;
    params.primaryGateway = url_parts.query.primaryGateway;
    params.recordedFileName = url_parts.query.recordedFileName;
    params.secondaryGateway = url_parts.query.secondaryGateway;
    params.smartphone_ani = url_parts.query.smartphone_ani;
    params.smartphone_cdr = url_parts.query.smartphone_cdr;
    params.specialTransferVDN = url_parts.query.specialTransferVDN;
    params.specialVDN11 = url_parts.query.specialVDN11;
    params.status = url_parts.query.status;
    params.waitForAgentCounter = url_parts.query.waitForAgentCounter;

    console.log("params", params);
    res.write(JSON.stringify(params));
    res.end();
};
