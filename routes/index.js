var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  fs.stat('marcopolo.txt', function (err, stat) {
    if (err) {
      console.log(err);
    }
    if (stat) {
      fs.unlink('marcopolo.txt', function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  function getThousand(index) {
    var result = '';
    for (var i = index; i < index + 1000; i++) {
      if (i % 4 === 0 && i % 7 === 0) {
        result += 'marcopolo ';
      } else if (i % 4 === 0) {
        result += 'marco ';
      } else if (i % 7 == 0) {
        result += 'polo ';
      } else {
        result += i + ' ';
      }
    }
    return result;
  }
  function getAll() {
    var result = '';
    for (var i = 0; i < 1000; i++) {
      result = getThousand((i * 1000) + 1) + " \n";
      fs.appendFileSync('marcopolo.txt', result);
    }
  }
  getAll();
  const readStream = fs.createReadStream('marcopolo.txt');
  readStream.on('open', function () {
    // This just pipes the read stream to the response object
    readStream.pipe(res);
  });

  // This catches any errors that happen while creating the readable stream
  readStream.on('error', function (err) {
    res.end(err);
  });

  readStream.on('end', function () {
    fs.unlink('marcopolo.txt', function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
});

module.exports = router;
