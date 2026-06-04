const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const redis = require("../config/redis");
// 🔹 Song Schema
  

const Song = require("../models/songModel")

// 🔹 CREATE Song
router.post("/", async (req, res) => {
  try {
     console.log(req.body);
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//for redis uncoomet this
//comment previous one
router.get("/", async (req, res) => {
  try {
    const { title } = req.query;

    const cacheKey = title ? `songs:${title}` : "songs:all";

    // 🔹 1. Check cache
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache HIT");
      return res.json(JSON.parse(cachedData));
    }

    console.log("Cache MISS");

    // 🔹 2. Fetch from DB
    let filter = {};
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    const songs = await Song.find(filter);

    // 🔹 3. Store in cache (AFTER fetching)
    await redis.set(cacheKey, JSON.stringify(songs), "EX", 60);

    res.json(songs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// router.get("/", async (req, res) => {
//   try {
//     const { title } = req.query;
//     // 🔹 2. Fetch from DB
//     let filter = {};
//     if (title) {
//       filter.title = { $regex: title, $options: "i" };
//     }

//     const songs = await Song.find(filter);

//     res.json(songs);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// 🔹 GET Single Song
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Not found" });
    res.json(song);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// 🔹 UPDATE Song
router.put("/:id", async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(song);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
});

// 🔹 DELETE Song
router.delete("/:id", async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
});

module.exports = router;




