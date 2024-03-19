CREATE TABLE items (
  id    SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done  BOOLEAN
);

INSERT INTO items (title, done) VALUES ('Build a time machine', 'FALSE');
INSERT INTO items (title, done) VALUES ('Learn to fly by flapping our arms', 'TRUE');
INSERT INTO items (title, done) VALUES ('Learn to speak dolphin', 'FALSE');