const express = require('express');
const { get } = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;


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
    clientID: 'd03dc801f09d9c1eea6c',
    clientSecret: '6dc26a45c0f424750d093fab04c9647099d663f5',
    callbackURL: "http://127.0.0.1:4321/login/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
	  //console.log(profile.id);    
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
	.use(passport.initialize())
	.use(passport.session())
	//.use(session({	secret:	'mysecret',	resave:	true,	saveUninitialized:	true }))
	.get('/users', checkAuth, async r => r.res.render('list', { title: 'Список логинов', items }))
	.get('/login', r => r.res.render('login'))
	.get('/login/github', passport.authenticate('github'))
	.get('/login/github/callback', 
        passport.authenticate('github', { failureRedirect: '/login/github' }),
        function(req, res) {    
            res.redirect('/');
        })
		/*
	.post('/login/check', r => {
		const { login: l } = r.body;
		const user = items.find(({ login }) => login === l);
		if (user) {
			if (user.password === r.body.pass) {
				r.session.auth = 'ok';
				r.res.send('Good');
			} else {
				r.res.send('Wrong');
			}
		} else {
			r.res.send('No such user');
		}
	})
	*/
	.get('/logout', r => {
		r.session.destroy();
		r.res.render('login');		
	})
	.use(r => r.res.status(404).end('Error 404'))
	.use((e, r, res, n) => res.status(500).end(`Error 500 ${e}`))
	.set('view engine', 'pug')
	.listen(process.env.PORT || PORT, async () => {
		console.log('Start');
		({ data: { users: items } } = await get(URL));
	});
	
	
