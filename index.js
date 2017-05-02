var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['A']);
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var os = require('os');
var path = require('path');
var port = 4000;
var globalData=0;
var av = require('tessel-av');
var camera = new av.Camera({
  width: 320,
  height: 240,
});

server.listen(port, function () {
  console.log(`http://${os.hostname()}.local:${port}`);
});



app.use(express.static(path.join(__dirname, '/public')));
app.get('/stream', (request, response) => {
  response.redirect(camera.url);
});
app.put('/trigger',(request, response) => {
  response.send(globalData);
})
ambient.on('ready', function () {
  ambient.setSoundTrigger(0.06);
 // Get points of light and sound data.
   this.pollingFrequency = 100;
  setInterval( function () {
      ambient.getSoundLevel( function(err, sounddata) {
        if(sounddata<0.05){
          globalData=0;
        }
        if (err) throw err;
//        console.log("Sound Level:", sounddata.toFixed(8));
      });
  }, 100); // The readings will happen every .5 seconds
});

ambient.on('sound-trigger', function(data){
  globalData = data;
  if(globalData > 0.06){
    console.log("data: "+ globalData);
    io.emit('data',globalData);
  }
  console.log("Something happened with sound: ", globalData);
  if(data < 0.07) {
    tessel.led[0].on();
     setTimeout(function () {
        tessel.led[0].off();
    }, 300);
  } else if(data < 0.09) {
    tessel.led[1].on();
     setTimeout(function () {
        tessel.led[1].off();
    }, 300);
  } else if(data < 0.11) {
    tessel.led[2].on();
     setTimeout(function () {
        tessel.led[2].off();
    }, 300);
  } else {
    tessel.led[3].on();
     setTimeout(function () {
        tessel.led[3].off();
    }, 300);
  }
})
ambient.on('error', function (err) {
  console.log(err);
});
