const express = require('express');
const { get } = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const env = require('dotenv').load();


let items;
const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();
const checkAuth = (r, res, next) => {
	if (r.user && r.user.id) {    
		next();
	} else {    
		res.redirect('/login/github');
	}
}

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:4321/login/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {	  
    return cb(null, profile);    
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app
	.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))	
	.use(require('cookie-parser')())
	.use(session({	secret:	'mysecret',	resave:	true,	saveUninitialized:	true }))
	.use(passport.initialize())
  .use(passport.session())
  .get('/', r => r.res.end('Homepage'))
	.get('/users', checkAuth, async r => r.res.render('list', { title: 'Список логинов', items }))
	.get('/login', r => r.res.render('login'))
	.get('/login/github', passport.authenticate('github'))
	.get('/login/github/callback', 
        passport.authenticate('github', { failureRedirect: '/login' }),
        function(req, res) {    
            res.redirect('/users');
        })		
  .get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })
	.use(r => r.res.status(404).end('Error 404'))
	.use((e, r, res, n) => res.status(500).end(`Error 500 ${e}`))
	.set('view engine', 'pug')
	.listen(process.env.PORT || PORT, async () => {
		console.log('Start');
		({ data: { users: items } } = await get(URL));
	});
	
	
