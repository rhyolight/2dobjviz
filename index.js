let express = require('express')

let app = express()
let port = process.env.PORT || 8080
let baseUrl = 'http://localhost'

// This serves the static files for the JS client program.
app.use(express.static('static'))

app.listen(port, function(){
    console.log(`serving HTML from ${baseUrl}:${port}/index.html`)
    console.log(`listening on *:${port}`);
});
