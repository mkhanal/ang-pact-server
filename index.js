/*jslint node: true, indent: 2 */
'use strict';
var restify, bunyan, routes, log, server, sugarjs;

restify = require('restify');
bunyan  = require('bunyan');
sugarjs = require('sugar');
routes  = require('./routes/');


log = bunyan.createLogger({
  name        : 'ang-pact-server',
  level       : process.env.LOG_LEVEL || 'info',
  stream      : process.stdout,
  serializers : bunyan.stdSerializers
});

server = restify.createServer({
  name : 'ang-pact-server',
  log  : log,
  formatters : {
    'application/json' : function (req, res, body) {
      res.setHeader('Cache-Control', 'must-revalidate');

      // Does the client *explicitly* accepts application/json?
      var sendPlainText = (req.header('Accept').split(/, */).indexOf('application/json') === -1);

      // Send as plain text
      if (sendPlainText) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      }

      // Send as JSON
      if (!sendPlainText) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      return JSON.stringify(body);
    }
  }
});

server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());

server.use(restify.CORS());
server.use(restify.fullResponse());


server.on('after', restify.auditLogger({ log: log }));
routes(server);

console.log('Server started.');
server.listen(8888, function () {
  log.info('%s listening at %s', server.name, server.url);
});

