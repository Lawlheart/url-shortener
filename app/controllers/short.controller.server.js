'use strict';

var Url = require('../models/urls.js');
var validator = require('validator');

function Shortener() {
  this.make = function(req, res) {
    if(!validator.isURL(req.params[0])) {
      res.json({error: "URL invalid"});
      return;
    }
    Url.count({}, function(err, data) {
      var newUrl = new Url({
        link: req.params[0],
        ref: data
      });
      newUrl.save(function(err, data) {
        if(err) {
          res.json(err);
        } else {
          res.json({
            'original_url': data.link,
            'shortened_url': "http://st-lb.herokuapp.com/" + data.ref
          });
        }
      });
    });
  };
  this.get = function(req, res) {
    Url.where({ ref: req.params.id}).findOne(function(err, data) {
      if(err) {
        res.json(err)
      } else {
        if(validator.isURL(data.link)) {
          res.redirect(data.link)
        } else {
          res.json({error: "bad data"})
        }
        
      }
    })
    
  };
};

module.exports = Shortener;