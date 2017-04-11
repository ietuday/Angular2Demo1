exports.getCdr = function (connection, openSessions, dashboards, data) {
    openSessions[connection._ultron.id] = {
        "connection": connection,
        "username": data.message.username,
        "available": data.message.status,
        "cumulativeTime": 0
    };
    data.status = "Success";
    sendToClient(connection, data);

    // send new user to the dashboard
    data.action = "getDashboard";
    console.log("######@@@@@@@$$$$$$$$$",openSessions);
    // getDashboard(connection, openSessions, dashboards, data);
};
