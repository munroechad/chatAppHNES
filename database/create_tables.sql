-- create_tables.sql

-- Users table stores information about users
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
    -- Add other user-related fields as needed
);

-- Chats table stores information about chat rooms
CREATE TABLE IF NOT EXISTS chats (
    chat_id INTEGER PRIMARY KEY,
    chat_name VARCHAR(255) NOT NULL
    -- Add other chat-related fields as needed
);

-- User_Chat table links users to chats (many-to-many relationship)
CREATE TABLE IF NOT EXISTS user_chat (
    user_chat_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    chat_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
);

-- Messages table stores chat messages
CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    chat_id INTEGER NOT NULL,
    message_text TEXT NOT NULL,
    message_time DATETIME NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
);


-- User_Status table stores user online status
CREATE TABLE IF NOT EXISTS user_status (
    user_status_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    is_online BOOLEAN NOT NULL,
    last_login TIMESTAMP,
    last_logout TIMESTAMP,
    status_message TEXT,
    -- Add other status-related fields as needed
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


-- Session_Tokens table stores tokens for password reset
CREATE TABLE IF NOT EXISTS session_tokens (
    session_token_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    token VARCHAR(255) NOT NULL,
    purpose VARCHAR(50) NOT NULL,
    expiration_timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (token),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

