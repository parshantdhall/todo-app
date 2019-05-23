const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

      // Requiring routes
const todoRoutes = require('./routes/todos');

// Some app Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Using static files
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

// Using routes
app.use('/api/todos', todoRoutes);
// Basic Routes
app.get('/', (req, res) => {
  res.sendFile('index.html');
});
app.get("*", (req, res) => {
  res.send('Error 404 No page Found');
});
app.listen(3000, () => {console.log("App runs at port 3000");});