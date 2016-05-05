/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var request = require('request');

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

/*
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */
app.post('/auth/facebook', function (req, res) {
    var fields = ['name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: '339dbe1b587e60735d39373b0334803d',
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({url: accessTokenUrl, qs: params, json: true}, function (err, response, accessToken) {
        if (response.statusCode !== 200) {
            return res.status(500).send({message: accessToken.error.message});
        }

        // Step 2. Retrieve profile information about the current user.
        request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
            if (response.statusCode !== 200) {
                return res.status(500).send({message: profile.error.message});
            }
            res.send(profile);
            if (req.header('Authorization')) {
                // User.findOne({facebook: profile.id}, function (err, existingUser) {
                //     if (existingUser) {
                //         return res.status(409).send({message: 'There is already a Facebook account that belongs to you'});
                //     }
                    // var token = req.header('Authorization').split(' ')[1];
                    // var payload = jwt.decode(token, 'uniquetoken'); //unique JWT token
                    // User.findById(payload.sub, function (err, user) {
                    //     if (!user) {
                    //         return res.status(400).send({message: 'User not found'});
                    //     }
                    //     user.facebook = profile.id;
                    //     user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                    //     user.displayName = user.displayName || profile.name;
                    //     user.save(function () {
                    //         var token = createJWT(user);
                    //         res.send({token: token});
                    //     });
                    // });

                // });
            } else {
                // Step 3. Create a new user account or return an existing one.
                // User.findOne({facebook: profile.id}, function (err, existingUser) {
                //     if (existingUser) {
                //         var token = createJWT(existingUser);
                //         return res.send({token: token});
                //     }
                //     var user = new User();
                //     user.facebook = profile.id;
                //     user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                //     user.displayName = profile.name;
                //     user.save(function () {
                //         var token = createJWT(user);
                //         res.send({token: token});
                //     });
                // });
            }
        });
    });
});


switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function (req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
            '\n__dirname = ' + __dirname +
            '\nprocess.cwd = ' + process.cwd());
});
