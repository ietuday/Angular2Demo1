exports.logMessageJson = {
    "appName": 'VivintVivr2',
    "moduleName": "index",
    "webServer": "",
    "smartphone_ani": "",
    "smartphone_dnis": "",
    "exitState": "user disonnected",
    "outcome": "disconnected",
    "logType": "V",
//    dirPath: "/home/arc/.ISP/Telecom/Exec/.recording/Daily_"
    dirPath: "/Users/devendraphadke/NetBeansProjects/AgentAssist2/recording/Daily_"
};

//################################################################################
//# VivintVivr2 Properties
//################################################################################

//################################################################################
//# Logging Levels:
//#
//# N-Normal or D-Detailed or d-Diagnose or V-Verbose
//################################################################################
exports.logType="V";

//################################################################################
//# GetTelcoTransferExtension
//#
//# Define the Development and Production endpoints to be used to invoke 
//# GetTelcoTransferExtension webservice. 
//# By default Development endpoint is enabled. Please disable the Development
//# endpoint and enable the Production endpoint when deployed on Production.
//################################################################################
//#
//# Development endpoint
//#endpoint=https://msappdev.vivint.com/TomKlineTest/api/StreetTracker/GetTelcoTransferExtension
//# Production endpoint
exports.endpoint="https://msapp.vivint.com/pda/api/StreetTracker/GetTelcoTransferExtension";

//################################################################################
//# callBackURL
//#
//# This is used to invoke Agent Assist API
//################################################################################
exports.agentAssistURL="http\://192.168.10.131:8080/AgentAssist/vxml/";
//#agentAssistURL=http\://192.168.10.140:8080/AgentAssist/vxml/
//################################################################################
exports.defaultVDN="84699";
exports.primaryGateway="@172.16.254.125";
exports.secondaryGateway="@172.16.254.122";
//################################################################################
//# specialTransfer VDN
exports.specialVDN1="84652";
exports.specialVDN2="84876";
exports.specialVDN3="84669";
exports.specialVDN4="84695";
exports.specialVDN5="84687";
exports.specialVDN6="84698";
exports.specialVDN7="81416";
exports.specialVDN8="81417";
exports.specialVDN9="81419";
exports.specialVDN10="81420";
exports.specialVDN11="84697";
exports.specialVDN12="84696";
exports.specialVDN13="84715";
exports.specialVDN14="84741";

//#CustomerLoyalty VDN
exports.custLoyalty1 ="84653";
exports.custLoyalty2 ="84655";
exports.custLoyalty3 ="84677";
exports.custLoyalty4 ="84651";
exports.custLoyalty5 ="84696";
exports.custLoyalty6 ="84612";
exports.custLoyalty7 ="84615";
//#noinput VDN
exports.noinputVDN ="84679";
//#camera VDN
exports.cameraVDN ="84681";
//#Spanish VDN
exports.spanishVDN ="84667";
//################################################################################
exports.allowBargein=false
//################################################################################
//#data 24_7 service for check mobile phone no. or not
//################################################################################
exports.smsService="Data24_7";
exports.gatewayURL = "https://api.data24-7.com/v/2.0?api=T";
exports.gatewayUser = "aumtechinc";
exports.gatewayPass = "pallavi123";
exports.fromMailUsername="roadside@aumtech.com";
exports.fromMailPassword="Aumtech123*";
exports.mailSMTPauth=true
exports.mailSMTPstarttls=true
exports.mailSMTPhost="smtp.gmail.com";
exports.mailSMTPport="587";
//################################################################################
exports.apiTimeout=15
//################################################################################