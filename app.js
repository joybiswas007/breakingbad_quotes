const express = require("express");
const ejs = require("ejs");
const https = require("https");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const url = 'https://api.breakingbadquotes.xyz/v1/quotes';

mongoose.connect("mongodb://127.0.0.1:27017/badDB");

app.use(express.static("public"));
app.set("view engine", "ejs");


const badSchema = mongoose.Schema({
	author: String,
	quote: String
});

const badQuotes = mongoose.model("Bad_Quote", badSchema);

app.get("/", function(req, res) {
	https.get(url, function(response) {
		response.on("data", function(data) {
			const quote = JSON.parse(data);
			const newQuote = new badQuotes({
				author: quote[0].author,
				quote: quote[0].quote
			});
			newQuote.save();
			res.render("home", {quotes: quote});
		});
	});
});

app.listen(port, function() {
	console.log("Running server on port: " + port);
});