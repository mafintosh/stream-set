var eos = require('end-of-stream')
var events = require('events')
var util = require('util')

module.exports = StreamsSet

function StreamsSet () {
  if (!(this instanceof StreamsSet)) return new StreamsSet()
  events.EventEmitter.call(this)
  this.streams = []
  this.size = 0
}

util.inherits(StreamsSet, events.EventEmitter)

StreamsSet.prototype.forEach = function (fn) {
  this.streams.forEach(fn)
}

StreamsSet.prototype.get = function (i) {
  return i >= this.size ? null : this.streams[i]
}

StreamsSet.prototype.has = function (stream) {
  return this.streams.indexOf(stream) > -1
}

StreamsSet.prototype.remove = function (stream) {
  var i = this.streams.indexOf(stream)
  if (i > -1) {
    this.streams.splice(i, 1)
    this.size--
    this.emit('remove', stream)
  }
  return stream
}

StreamsSet.prototype.add = function (stream) {
  var self = this
  if (this.has(stream)) return stream
  this.streams.push(stream)
  this.size++
  eos(stream, function () {
    self.remove(stream)
  })
  this.emit('add', stream)
  return stream
}
