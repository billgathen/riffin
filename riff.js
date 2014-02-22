var Board  = require('johnny-five').Board,
    Piezo  = require('johnny-five').Piezo,
    Riff   = require('./riffin').Riff;

new Board().on('ready', function() {
  var piezo = new Piezo({
    pin: 9,
    board: this
  });

  var ironMan = new Riff({ bpm: 120 });
  ironMan.tracks.push({
    output: piezo,
    notes:  [ ['e', 2], ['g', 2], ['g', 1], ['a', 1], ['a', 1], ['', 1] ]
  });

  var chromatic = new Riff({ bpm: 120 });
  chromatic.tracks.push({
    output: piezo,
    notes: [
      ['c', 1],
      ['c#', 1],
      ['d', 1],
      ['d#', 1],
      ['e', 1],
      ['f', 1],
      ['f#', 1],
      ['g', 1],
      ['g#', 1],
      ['a', 1],
      ['a#', 1],
      ['b', 1],
      ['C', 1]
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

  board.repl.inject({
    ironMan: ironMan,
    chromatic: chromatic,
    diatonic: diatonic
  });
});
