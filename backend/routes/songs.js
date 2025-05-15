// routes/songRoutes.js

const express = require("express");
const Song = require("../models/Song");
const router = express.Router();

/**
 * @route   GET /stats/summary
 * @desc    Returns overall song statistics: totals + genre, artist, album breakdown
 */
router.get("/stats/summary", async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();

    // Distinct artists and albums (case-insensitive)
    const [artistDocs, albumDocs, totalGenres] = await Promise.all([
      Song.aggregate([
        { $project: { lowerArtist: { $toLower: "$artist" } } },
        { $group: { _id: "$lowerArtist" } },
      ]),
      Song.aggregate([
        {
          $project: {
            lowerAlbum: {
              $cond: [
                { $or: [{ $eq: ["$album", null] }, { $eq: ["$album", ""] }] },
                "Single",
                { $toLower: "$album" },
              ],
            },
          },
        },
        { $group: { _id: "$lowerAlbum" } },
      ]),
      Song.distinct("genre"),
    ]);

    const totalArtists = artistDocs.length;
    const totalAlbums = albumDocs.length;

    // Genre breakdown with percentages
    const genreStats = await Song.aggregate([
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
          percentage: {
            $multiply: [{ $divide: ["$count", totalSongs] }, 100],
          },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Artist breakdown with percentage
    const artistStats = await Song.aggregate([
      {
        $group: {
          _id: { $toLower: "$artist" },
          songs: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          songs: 1,
          percentage: {
            $multiply: [{ $divide: ["$songs", totalSongs] }, 100],
          },
        },
      },
      { $sort: { songs: -1 } },
    ]);

    // Album breakdown with "Single" fallback
    const albumStats = await Song.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $or: [{ $eq: ["$album", null] }, { $eq: ["$album", ""] }] },
              "Single",
              { $toLower: "$album" },
            ],
          },
          songs: { $sum: 1 },
        },
      },
      { $sort: { songs: -1 } },
    ]);

    // Final response
    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres: totalGenres.length,
      genreStats,
      artistStats,
      albumStats,
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to generate statistics" });
  }
});

/**
 * @route   POST /
 * @desc    Create a new song
 */
router.post("/", async (req, res) => {
  try {
    const song = new Song(req.body);
    const saved = await song.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to create song", details: err.message });
  }
});

/**
 * @route   GET /
 * @desc    Get all songs, sorted by creation date (newest first)
 */
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

/**
 * @route   PUT /:id
 * @desc    Update a song by ID
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Song not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update song", details: err.message });
  }
});

/**
 * @route   DELETE /:id
 * @desc    Delete a song by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Song.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Song not found" });
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete song" });
  }
});

module.exports = router;
