const express = require("express");
const cors = require("cors");
const pool = require("./db");

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ data: "hello from backend" });
});

app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (err) {
    console.error('Health check failed:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('DB initialized');
}

initDb()
  .then(() => app.listen(PORT, () => console.log(`be running on ${PORT}`)))
  .catch((err) => {
    console.error('DB init failed', err);
    process.exit(1);
  });
