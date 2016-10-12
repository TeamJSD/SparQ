const request = require('request');
const qs = require('querystring');
const Config = require('./../../config.json');
const cookieParser = require('cookie-parser')

function authUser(req, res, next) {
	console.log(req.query.code)
	const redirect = 'http://localhost:3000/authorize';
  const code = req.query.code;
  const url = 'https://github.com/login/oauth/access_token?client_id='+ Config.id +'&redirect_uri='+redirect + '&client_secret='+ Config.secret+'&code=' + code + '&scope=user:email'

  request(url, function(err, res, body) {
    let obj = qs.parse(body);
    console.log(obj);
    req.body.access_token = obj.access_token;
    next();
  })

}

function setCookie(req, res, next) {
	let cookieID = req.body.access_token;
	res.cookie('userID', cookieID, { httpOnly: true });
	next();
}


module.exports = { authUser, setCookie }