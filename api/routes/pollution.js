const express = require("express");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

/* CREATE pollution (auth obligatoire) */
router.post("/", auth, async (req, res) => {
  const {
    titre,
    type_pollution,
    description,
    date_observation,
    lieu,
    latitude,
    longitude,
    photo_url
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pollution
      (user_id, titre, type_pollution, description, date_observation, lieu, latitude, longitude, photo_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        req.user.id,
        titre,
        type_pollution,
        description,
        date_observation,
        lieu,
        latitude,
        longitude,
        photo_url
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* GET all pollution */
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM pollution ORDER BY created_at DESC");
  res.json(result.rows);
});

/* GET pollution by user */
router.get("/mine", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM pollution WHERE user_id=$1",
    [req.user.id]
  );
  res.json(result.rows);
});

module.exports = router;
