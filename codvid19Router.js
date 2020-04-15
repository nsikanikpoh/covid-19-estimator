var express = require('express');
var bodyParser = require('body-parser');
var easyxml = require('easyxml');
var covid = require('./covid');

var codvid19Router = express.Router();
codvid19Router.use(bodyParser.json());

codvid19Router.route('')
.options((req, res) => { res.sendStatus(200); })
  .post((req, res, next) => {
     covid.covid19ImpactEstimator(req.body)
      .then((data) => {
        console.log('data served', data)
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(data);
        }, (err) => next(err))
        .catch((err) => next(err));
  })

  codvid19Router.route('/')
  .options((req, res) => { res.sendStatus(200); })
    .post((req, res, next) => {
       covid.covid19ImpactEstimator(req.body)
        .then((data) => {
          console.log('data served', data)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
          }, (err) => next(err))
          .catch((err) => next(err));
    })

  codvid19Router.route('/json')
  .options((req, res) => { res.sendStatus(200); })
    .post((req, res, next) => {
          covid.covid19ImpactEstimator(req.body)
          .then((data) => {
            console.log('data served', data)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
          }, (err) => next(err))
          .catch((err) => next(err));
    })

    codvid19Router.route('/xml')
    .options((req, res) => { res.sendStatus(200); })
      .post((req, res, next) => {
            covid.covid19ImpactEstimator(req.body)
            .then((data) => {
              console.log('data served', data)
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/xml');
              var xml = easyxml.render(data);
              res.send(xml);
            }, (err) => next(err))
            .catch((err) => next(err));
      })

module.exports = codvid19Router;
