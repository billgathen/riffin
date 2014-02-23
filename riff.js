var Board  = require('johnny-five').Board,
    Piezo  = require('johnny-five').Piezo,
    Riff   = require('./riffin').Riff;

new Board().on('ready', function() {
  var piezo = new Piezo({
    pin: 9,
    board: this
  });

  // Create a new riff with a tempo
  var ironMan = new Riff({ bpm: 120 });
  // Load a track
  ironMan.tracks.push({
    // the device it will control
    output: piezo,
    // A note contains a pitch and # of beats
    // Anything that's not a valid pitch becomes a rest ('', ' ', 'rest', etc)
    notes:  [ ['e', 2], ['g', 2], ['g', 1], ['a', 1], ['a', 1], ['', 1] ]
  });

  var chromatic = new Riff({ bpm: 120 });
  chromatic.tracks.push({
    output: piezo,
    notes: [
      ['c',  1],
      ['c#', 1],
      ['d',  1],
      ['d#', 1],
      ['e',  1],
      ['f',  1],
      ['f#', 1],
      ['g',  1],
      ['g#', 1],
      ['a',  1],
      ['a#', 1],
      ['b',  1],
      ['C',  1]
    ]
  });

  var diatonic = new Riff({ bpm: 120 });
  diatonic.tracks.push({
    output: piezo,
    notes: [
      ['c', 1],
      ['d', 1],
      ['e', 1],
      ['f', 1],
      ['g', 1],
      ['a', 1],
      ['b', 1],
      ['C', 1]
    ]
  });

  // Tell a riff to play itself
  ironMan.play();

  // Jukebox! Make a request
  board.repl.inject({
    ironMan: ironMan,
    chromatic: chromatic,
    diatonic: diatonic
  });
});
