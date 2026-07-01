const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const URL = "mongodb+srv://9d27shravaniyadav_db_user:d9TizNIByTQINoCY@cluster0.i6kamy3.mongodb.net/?appName=Cluster0";

const app = express();
app.use(express.json());
app.use(cors());

// ADD MOVIE
app.post("/sm", async (req, res) => {
	try {
		const con = new MongoClient(URL);
		await con.connect();

		const db = con.db("movies1july26");
		const coll = db.collection("movies");

		const doc = {
			movie: req.body.movie,
			year: req.body.year,
			watched: false
		};

		const response = await coll.insertOne(doc);
		res.send(response);
		con.close();
	} catch (error) {
		res.send(error);
	}
});

// GET MOVIES
app.get("/gm", async (req, res) => {
	try {
		const con = new MongoClient(URL);
		await con.connect();

		const db = con.db("movies1july26");
		const coll = db.collection("movies");

		const response = await coll.find().toArray();
		res.send(response);

		con.close();
	} catch (error) {
		res.send(error);
	}
});

// DELETE MOVIE
app.delete("/dm", async (req, res) => {
	try {
		const con = new MongoClient(URL);
		await con.connect();

		const db = con.db("movies1july26");
		const coll = db.collection("movies");

		const doc = { _id: new ObjectId(req.body._id) };

		const response = await coll.deleteOne(doc);
		res.send(response);

		con.close();
	} catch (error) {
		res.send(error);
	}
});

// UPDATE MOVIE
app.put("/um", async (req, res) => {
	try {
		const con = new MongoClient(URL);
		await con.connect();

		const db = con.db("movies1july26");
		const coll = db.collection("movies");

		const filter = { _id: new ObjectId(req.body._id) };

		const movieDoc = await coll.findOne(filter);

		const response = await coll.updateOne(filter, {
			$set: { watched: !movieDoc.watched }
		});

		res.send(response);

		con.close();
	} catch (error) {
		res.send(error);
	}
});

app.listen(9000, () => {
	console.log("ready @ 9000");
});