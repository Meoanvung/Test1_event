//file config/jwtConfig.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
require('dotenv').config();
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('JWT Payload: ', jwt_payload);
    User.findOne({
        _id: jwt_payload._id
    }, (err, user) => {
        if (err) {
            return done(err, false);
        } else if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}));

exports.verifyUser = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        var token = authHeader.split(' ')[1];
    } else {
        var token = null;
    }
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};