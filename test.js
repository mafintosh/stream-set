var tape = require('tape')
var streamSet = require('./')
var through = require('through2')

tape('add + remove', function (t) {
  var s = through()
  var set = streamSet()

  t.same(set.size, 0)
  set.add(s)
  t.same(set.size, 1)
  set.add(s)
  t.same(set.size, 1)
  t.same(set.streams[0], s)
  set.remove(s)
  t.same(set.size, 0)
  set.remove(s)
  t.same(set.size, 0)
  t.end()
})

tape('remove on destroy', function (t) {
  var s = through()
  var set = streamSet()

  set.add(s)

  s.on('close', function () {
    t.ok(!set.has(s))
    t.same(set.size, 0)
    t.end()
  })
  s.destroy()

})
