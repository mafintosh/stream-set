# stream-set

Maintain a set of open streams

```
npm install stream-set
```

[![build status](http://img.shields.io/travis/mafintosh/stream-set.svg?style=flat)](http://travis-ci.org/mafintosh/stream-set)

## Usage

``` js
var streamSet = require('stream-set')
var net = require('net')

var activeSockets = streamSet()

var server = net.createServer(function (socket) {
  // when the socket ends/errors it will automatically be removed from the set
  activeSockets.add(socket)

  // will print "set size is 1"
  console.log('set size is', activeSockets.size)
  socket.on('close', function () {
    // will print "set size is 0"
    console.log('set size is', activeSockets.size)
  })
})

server.listen(10000, function () {
  var socket = net.connect(10000)
  // connect and destroy
  socket.on('connect', function () {
    socket.destroy()
  })
})
```

## API

#### `var set = streamSet()`

Create a new set

#### `set.add(stream)`

Add a stream to the set. If the stream ends/errors it will be removed from the set

#### `set.remove(stream)`

Manually remove a stream from the set

#### `set.has(stream)`

Check if a stream is in the set

#### `set.streams`

An array of streams in the set

#### `set.size`

The current size of the set

#### `set.forEach(fn)`

Iterate over all streams in the set

#### `stream = set.get(index)`

Get a stream from the set

## License

MIT
