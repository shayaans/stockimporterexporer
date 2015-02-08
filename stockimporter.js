var fs = require('fs');
var filePath = process.cwd() + '/data/input.csv';
if (fs.existsSync(filePath)) {
  fs.readFile(filePath, 'utf8', function (err,data) {
  if (err) {
    return console.error(err);
  }
  var readInput = data.split(/\n/g);
  var keys = readInput.shift().split(',');
  console.log(keys);

  var modifiers = keys.filter(function(key) {
    return key.indexOf('modifier') !== -1;
  });

  var labeledModifiers = [];
  modifiers.forEach(function(modifier) {
    var modifierName = modifier.match(/modifier_[0-9]/g)[0];
    if(labeledModifiers.indexOf(modifierName) === -1) {
      // Not already in the array
      labeledModifiers.push(modifierName);
    }
  });


  console.log(labeledModifiers);


    // Find the modifiers in keys. Find the index of the keys.
  // Associate the field with the value
  var modifierKeys = [];
  labeledModifiers.forEach(function(modifier) {
    var tmpObj = {};
    keys.forEach(function(key, index) {
      if(key.indexOf(modifier) !== -1) {
        var fieldName = key.substring(key.lastIndexOf('_') + 1);
        tmpObj[fieldName] = index;
      }
    });
    modifierKeys.push(tmpObj);
  });

  if(readInput[readInput.length - 1].length === 0) {
    readInput.pop();
  }

  var jsonifyMyObject = readInput.map(function(row) {
    var fields = row.split(',');

    var obj = {
      id: fields[0],
      description: fields[1],
      price: fields[2],
      cost: fields[3],
      price_type: fields[4],
      quantity_on_hand: fields[5],
      modifiers: []
    }

    modifierKeys.forEach(function(modifierKey) {
      console.log(modifierKey);
      var tmpObj = {};
      for(prop in modifierKey) {
        tmpObj[prop] = fields[modifierKey[prop]];
      }
      obj.modifiers.push(tmpObj);

    });

    // obj.modifiers = [
    // ]
// 
    // modifiers =



    return obj;
  });

  console.log(jsonifyMyObject);
  fs.writeFile(process.cwd() + "/data/outputdata.json", JSON.stringify(jsonifyMyObject,undefined, 2), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });

  // for(i = 1; i < readInput.length; i++) {    
  //   var oneRecord = readInput[i].split(',');
  //   //console.log(oneRecord);
  // }
  });
} else {
  console.error("File does not exist or you do not have read access to that file located at " + filePath);
}
