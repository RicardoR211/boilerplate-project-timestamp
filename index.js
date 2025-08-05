// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/:date?", (req, res) => {
    let dateString = req.params.date;
    let date;

    //Verificando se a strig da data é Unix ou Date
    if (!dateString) {
        //A data está vazia
        date = new Date();
    } else if (dateString.match(/^\d+$/)) {
        //Se for uma sequência de números UNIX
        date = new Date(parseInt(dateString));
    } else {
        //É uma data normal msm 
        date = new Date(dateString);
    }

    //Verificando se a data é válida
    if (date.toString() === "Invalid Date") {
        //Data inválida
        res.json({ error: "Invalid Date" });
    } else {
        //Data válida
        res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
