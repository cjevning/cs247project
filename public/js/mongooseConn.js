var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});
var kittySchema = mongoose.Schema({
    name: String
})
var Kitten = mongoose.model('Kitten', kittySchema)
var silence = new Kitten({ name: 'Silence' })
console.log(silence.name)
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.save(function (err, fluffy) {
  if (err) // TODO handle the error
  console.log("fluffy")
});

Kitten.find(function (err, kittens) {
  if (err) // TODO handle err
  console.log(kittens)
})