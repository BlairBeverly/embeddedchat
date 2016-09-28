var express  = require( 'express' ),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    bp       = require('body-parser'),
    cors     = require('cors')
    app      = express();

app.use(cors())
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use( express.static( path.join( root, 'node_modules' )));

app.use(bp.json())

require('./server/config/db.js');

var server = app.listen( port, function() {
  console.log( 'server running on port ${ port }' );
});

require('./server/config/routes.js')(app, server);
