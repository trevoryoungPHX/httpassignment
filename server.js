let http = require('http');
let port = process.env.PORT || 8000;
var fs = require('fs');
var runningCount = 0;


let server = http.createServer(function(req, res) {

  if(req.method === "GET" && req.url === "/intro"){
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to backend!');
  }

  else if(req.method === "GET" && req.url === "/pets"){
    let myPets = ["Austin", "Target", "Pumpkin"];
    let stringPets = JSON.stringify(myPets)
    res.setHeader('Content-Type', 'text/plain');
    res.end(stringPets);
  }
  else if(req.method === "GET" && req.url === "/getinfo") {
    fs.readFile('./static/info.txt', 'utf8', function(err, data) {
  if (err) {
    throw err;
  }
  res.setHeader('Content-Type', 'text/plain');
  res.end(data)
});
  }
  else if(req.method === "POST" && req.url === "/count") {
    runningCount++;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Count = " + runningCount);
  }
  else if (req.method === "GET" && req.url === "/getcount"){
    var postCount = "Current count: " + runningCount;
    res.setHeader('Content-Type', 'text/plain');
    res.end(postCount);
  }
  else if (req.method === "GET" && req.url === "/index"){
    fs.readFile('./static/index.html', 'utf8', function(err, data) {
  if (err) {
    throw err;
  }
  res.setHeader('Content-Type', 'text/html');
  res.end(data)
});
}
else if(req.method === "GET" && req.url === "/dynamic"){
  fs.readFile('./dynamic/index.html', 'utf8', function(err, data) {
    var newCount = data.replace('{{count}}', runningCount)
if (err) {
  throw err;
}
res.setHeader('Content-Type', 'text/html');
res.end(newCount)
});
}
})

server.listen(port, function() {
  console.log('Listening on port', port);
});
