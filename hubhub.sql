CREATE TABLE IF NOT EXISTS `user`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
	avatarUrl VARCHAR(300),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `moment`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	userId INT NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(userId) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS `comment`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	momentId INT NOT NULL,
	userId INT NOT NULL,
	commentId INT DEFAULT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(momentId) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(commentId) REFERENCES comment(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS `label`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(10) NOT NULL UNIQUE,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS `moment_label`(
	momentId INT NOT NULL,
	labelId INT NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(momentId, labelId),
	FOREIGN KEY (momentId) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (labelId) REFERENCES label(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `avatar`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	filename VARCHAR(255) NOT NULL UNIQUE,
	originalname VARCHAR(500) NOT NULL,
	mimetype VARCHAR(30),
	size INT,
	userId INT,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `file`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	filename VARCHAR(100) NOT NULL UNIQUE,
	mimetype VARCHAR(30),
	size INT,
	momentId INT,
	userId INT,
	banner VARCHAR(200),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (momentId) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT COUNT(*) AS count FROM moment;
SHOW CREATE TABLE file;
SELECT COUNT(*) AS addDynamicCount
      FROM moment
      WHERE DATE(createdAt) = CURDATE();
			
ALTER TABLE moment
ALTER TABLE file ADD COLUMN commentId INT DEFAULT NULL;
ALTER TABLE moment
DROP COLUMN createAt;



    SELECT IFNULL(JSON_ARRAYAGG(JSON_OBJECT(
      'id', c.id,
      'content', c.content,
      'commentId', c.commentId,
      'createTime', c.createdAt,
      'updateTime', c.updatedAt
--       'author', JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', CONCAT('${APP_HOST}:${APP_PORT}/', u.avatarUrl))
--       'reply', (
--         SELECT JSON_ARRAYAGG(JSON_OBJECT(
--           'id', cr.id,
--           'content', cr.content,
--           'createTime', cr.createdAt,
--           'updateTime', cr.updatedAt,
--           'author', JSON_OBJECT('id', ur.id, 'name', ur.name, 'avatarUrl', ur.avatarUrl)
--           ))
--         FROM comment cr
--         LEFT JOIN user ur ON cr.userId = ur.id
--         WHERE c.id = cr.commentId
--         ),
--       'images', IFNULL((
--         SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/image', file.filename))
--         FROM file
--         WHERE file.commentId = c.id), JSON_ARRAY()
--         )
    )), JSON_ARRAY()) AS list,
    (SELECT COUNT(*) FROM comment WHERE momentId = 17 AND commentId IS NULL) AS commentCount
    FROM (
      SELECT * FROM comment
      WHERE momentId = 17 AND commentId IS NULL
      ORDER BY createdAt DESC
      LIMIT 1, 10  -- Adjust this for pagination
    ) c
    LEFT JOIN user u ON c.userId = u.id;
		
		

