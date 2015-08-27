var twitter = require('ntwitter');
var pg = require('pg');

var express = require('express');
var app = express();

var server = app.listen(3000, function () {
  var conString = "postgres://mflamcdycenfta:vZquJOViXYVS0_-Kg2HoXzY7qm@ec2-54-204-3-200.compute-1.amazonaws.com:5432/dcd4cdk7e284fc";

  var twit = new twitter({
  consumer_key: 'Hw36acR3LCEJnlnzQhZXvlorx', // <--- FILL ME IN
  consumer_secret: 'HAorFG8dFXwaNuiMxJgmsvmIWacmANpPXL9imV4b5BwXBZJTBx', // <--- FILL ME IN
  access_token_key: '163828290-JQM57TF9Fxt6RqCes9xGqvGm9Z0l826nPmEZrgYD', // <--- FILL ME IN
  access_token_secret: '8EjYx5pLM7EYpOgxgSSlYYR5s6nKSnr07lGFfSrpu2ycM' // <--- FILL ME IN
  });

  //Tell the twitter API to filter on the watchSymbols
  
  var client = new pg.Client(conString);
  client.connect(function(err) {
  twit.stream('statuses/sample', function(stream) {
      stream.on('data', function (data) {
        if(data.user.lang == 'en')
        {
            if (data.entities.hashtags.length > 0)
            {
              data.entities.hashtags.forEach(function(hashtag) {
                if(hashtag.text.indexOf('?') < 0) {
                  var strQuery = "INSERT INTO `tagQueue`.`tagQueue` (`id`, `hashtag`, `is_processed`) VALUES (NULL, '" +hashtag.text + "', b'0');";
                  client.query(strQuery, function(err, rows){
                    done();
                  });
                }
              }
            }
        }
      });
    

    stream.on('end', function() {
      connection.destroy( );
    });
  });
  });
});
});
