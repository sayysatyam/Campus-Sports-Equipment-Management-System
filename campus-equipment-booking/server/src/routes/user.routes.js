const express = require("express");
const db = require("../db");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

// GET /api/users/me
router.get("/me", requireAuth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT UserID AS "UserID", Name AS "Name", Email AS "Email", Role AS "Role", Department AS "Department", Phone AS "Phone", CreatedAt AS "CreatedAt" FROM Users WHERE UserID = $1',
      [req.user.userId],
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "User not found." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch profile." });
  }
});

// PATCH /api/users/me
router.patch("/me", requireAuth, async (req, res) => {
  const { name, department, phone } = req.body;
  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required." });
  }
  if (name.trim().length > 120) {
    return res
      .status(400)
      .json({ error: "Name must be 120 characters or fewer." });
  }
  if (department != null && typeof department !== "string") {
    return res.status(400).json({ error: "Department must be text." });
  }
  if (phone != null && typeof phone !== "string") {
    return res.status(400).json({ error: "Phone must be text." });
  }

  try {
    const result = await db.query(
      `UPDATE Users
       SET Name = $1, Department = $2, Phone = $3
       WHERE UserID = $4
       RETURNING UserID AS "UserID", Name AS "Name", Email AS "Email", Role AS "Role", Department AS "Department", Phone AS "Phone", CreatedAt AS "CreatedAt"`,
      [
        name.trim(),
        department?.trim() || null,
        phone?.trim() || null,
        req.user.userId,
      ],
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "User not found." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update profile." });
  }
});

// GET /api/users — Admin only
router.get("/", requireAuth, requireRole("Admin"), async (req, res) => {
  try {
    const result = await db.query(
      "SELECT UserID, Name, Email, Role, Department, Phone, CreatedAt FROM Users ORDER BY Name",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch users." });
  }
});

module.exports = router;
