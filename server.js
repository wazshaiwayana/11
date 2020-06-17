
var express = require("express");
var apiRoutes = require("./routes/apiRoutes.js");
var htmlRoutes= require("./routes/htmlRoutes.js");


var app = express();
var PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use( apiRoutes);
app.use("/", htmlRoutes);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

