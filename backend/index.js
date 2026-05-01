const express = require('express')
const { Pool } = require('pg')
require('dotenv').config()

const app = express()
app.use(express.json())

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

// Health check endpoint - important for Kubernetes later
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Get all votes
app.get('/votes', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT option, COUNT(*) as count FROM votes GROUP BY option'
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Cast a vote
app.post('/vote', async (req, res) => {
  const { option } = req.body
  if (!option) {
    return res.status(400).json({ error: 'option is required' })
  }
  try {
    await pool.query('INSERT INTO votes (option) VALUES ($1)', [option])
    res.json({ message: `Vote cast for ${option}` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
