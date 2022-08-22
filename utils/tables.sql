CREATE TABLE towns (
    ID SERIAL PRIMARY KEY,
    town VARCHAR(15) NOT NULL,
    regcode VARCHAR(15) NOT NULL
);

CREATE TABLE regnumbers (
    ID SERIAL PRIMARY KEY,
    regno VARCHAR(10) NOT NULL,
    town_id INT,
    FOREIGN KEY (town_id) REFERENCES towns(ID) ON DELETE CASCADE
);

INSERT INTO towns (town, regcode) VALUES 
('Cape Town', 'ca'),
('Stellenbosch', 'ca'),
('Bellville', 'cy'),
('Kuils River', 'cf'),
('Wellington', 'cn'),
('Malmesbury', 'ck'),
('Worcester', 'cw'),
('Ceres', 'ct'),
('George', 'caw')