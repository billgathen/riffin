'use strict';

var Riff = function (opts) {
  this.bpm = opts.bpm || 120;
  this.beatDuration = 1000 / (this.bpm / 60);
  this.tracks = [];
}

Riff.prototype.pitchFor = function(note) {
  var convert = {
    "c": 1915,
    "c#": 1805,
    "db": 1805,
    "d": 1706,
    "d#": 1607,
    "eb": 1607,
    "e": 1519,
    "f": 1432,
    "f#": 1351,
    "gb": 1351,
    "g": 1275,
    "g#": 1204,
    "ab": 1204,
    "a": 1136,
    "a#": 1072,
    "bb": 1072,
    "b": 1012,
    "C": 956
  };
  return convert[note] || 0;
}

Riff.prototype.play = function() {
  var idx = 0;
  var that = this;
  this.tracks.forEach(function(track) {
    var pitches = [];
    var durations = [];
    track.notes.forEach(function(note) {
      pitches.push(that.pitchFor(note[0]));
      durations.push(note[1] * that.beatDuration);
    });
    that.playTrack(track.output, pitches, durations);
  });
}

Riff.prototype.playTrack = function(output, pitches, durations) {
  var i = 0;
  var next = function() {
    var pitch = pitches[i];
    var duration = durations[i];

    if (i++ === pitches.length) {
      // Track is over
      output.isPlaying = false;
      return;
    }

    if (pitch === 0) {
      output.noTone();
    } else {
      output.tone(pitch, duration);
    }

    setTimeout(next, duration);
  }.bind(output);

  // Playing track
  output.isPlaying = true;

  next();

  return output;
}

module.exports.Riff = Riff;
