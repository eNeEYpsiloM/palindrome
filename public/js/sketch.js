function setup() {
  createCanvas(900, 400);
  drawData();
  console.log('running');

  var button = select('#submit');
  button.mousePressed(submitWord);
  button.mousePressed(clear, '#word');
}

function drawData() {
  loadJSON('all', gotData);
}

function submitWord() {
  var word = select('#word').value();
  loadJSON('add/' + word, finished);

  function finished(data) {
    loadJSON('check/' + word);
    console.log(data);
    drawData();
  }
}

function gotData(data) {
  background(51);
  console.log(data);
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    var description = data[word];
    var x = random(width);
    var y = random(height);
    fill(250);
    textSize(18);
    textAlign("center");
    text(word + " - " + description, x, y);
  }
}