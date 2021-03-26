var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

// MORE IMPORTS HERE

app.use(require('body-parser').urlencoded({
    extended: true
}));

var formidable = require('formidable');

var credentials = require('./credentials.js');

app.use(require('cookie-parser')(credentials.cookieSecret));

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.render('home');
});

app.use(function (req, res, next){
    console.log("Looking for URL : " + req.url);
    next();
})

app.get('/junk', function (req, res, next){
    console.log('Tried to access /junk ');
    throw new Error('/junk doesn\'t exist')
});

app.use(function (err, req, res, next){
    console.error("Error : " + err.message);
    next();
})

app.get('/about', function (req, res){
    res.render('about');
});

app.get('/contact', function (req, res){
    res.render('contact', {csrf: 'CSRF token here'});
});

app.get('/thankyou', function (req, res){
    res.render('thankyou');
});

app.post('/process', function (req, res){
    console.log('Form '+req.query.form);
    console.log('CSRF token : '+ req.body._csrf);
    console.log('Email : '+ req.body.email);
    console.log('Question : '+ req.body.ques);
    res.redirect(303, '/thankyou');
});

app.get('/file-upload', function (req, res){
    res.render('thankyou');
    var now = new Date();
    res.render('file-upload', {
        year: now.getFullYear(),
        month: now.getMonth(),
    })
});

app.get('/file-upload/:year/:month',
    function (req, res){
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, file){
            if(err)
                return res.redirect(303, '/error');
            console.log('Received File')

            console.log(file)

            res.redirect(303, '/thankyou');
        });
    }
);

app.get('/cookie', function (req, res){
    res.cookie('username', 'Waleed Butt',
        {expire: new Date() + 9999}).send('username has the value' +
        'of Waleed Butt');
});

app.get('/listcookie', function (req, res){
    console.log("Cookies : ", req.cookies);
    res.send('Look in the console for cookies');
});

app.get('/deletecookie', function (req, res){
    res.clearCookie('username');
    res.send('username Cookie Deleted');
});

var session = require('express-session');

var parseurl = require('parseurl');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: credentials.cookieSecret,
}));

app.use(function (req, res, next){
    var views = req.session.views;

    if(!views) views = req.session.views = {};

    var pathname = parseurl(req).pathname;

    views[pathname] = (views[pathname] || 0) + 1;

    next();
});

app.get('/viewcount', function (req, res, next){
    res.send("You've viewed this page " +
        req.session.views['/viewcount'] + 'times');
});

var fs = require('fs');

app.get('/readfile', function (req, res, next){
    fs.readFile('./public/randomfile.txt', function (err, data){
        if(err) return console.error(err);

        res.send('The File : ' + data.toString());
    });
});

let count = 0;

app.get('/writefile', function (req, res, next){
    let file = './public/random file'+count+'.txt';

    fs.writeFile(file, 'Writing to file '+count,
        function (err){

        if (err) return console.error(err);

        fs.readFile(file, function (err, data){
            if(err) return console.error(err);

            res.send('The File : ' + data.toString());
        });

        count+=1;

    });

});


app.use(function (req, res){
    res.type('text/html');
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res){
    console.error("Error : " + err.stack);
    res.type('text/html');
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'), function (){
    console.log("Express started on http://localhost:"+ app.get('port')+
        "\nPress Ctrl-C to terminate");
});

