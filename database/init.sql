-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    option VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed some initial options
INSERT INTO votes (option) VALUES ('cats');
INSERT INTO votes (option) VALUES ('dogs');
