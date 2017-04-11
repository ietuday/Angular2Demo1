var builder = require('xmlbuilder');

exports.subdialogReturn = function (namelist, callback) {
    var xml = builder.create('vxml', {encoding: 'utf-8'})
            .att('version', '2.1')
            .att('xmlns', 'http://www/w3/org/2001/vxml')
            .att('xml:lang', 'en-US')
            .ele('form')
            .ele('block')
            .ele('return', {'namelist': namelist})
            .end({pretty: true});
    callback(xml);
};

