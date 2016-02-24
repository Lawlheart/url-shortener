'use strict';

var Url = require('../models/urls.js');
var validator = require('validator');

function Shortener() {
  this.make = function(req, res) {
    var query = "";
    if(req.query) {
      query = "?";
      for(var key in req.query) {
        query += key + "=" + req.query[key] + "&";
      }
    }
    if(!validator.isURL(req.params[0])) {
      res.json({error: "URL invalid"});
      return;
    }
    Url.count({}, function(err, data) {
      if(err) {
        console.log(err);
        return;
      }
      var newUrl = new Url({
        link: req.params[0] + query,
        ref: data
      });
      newUrl.save(function(err, data) {
        if(err) {
          res.json(err);
        } else {
          res.json({
            'original_url': newUrl.link,
            'shortened_url': "http://st-lb.herokuapp.com/" + newUrl.ref
          });
        }
      });
    });
  };
  this.get = function(req, res) {
    Url.where({ ref: req.params.id }).findOne(function(err, data) {
      if(err) {
        res.json(err);
      } else {
        res.redirect(data.link);
      }
    });
  };
};

module.exports = Shortener;