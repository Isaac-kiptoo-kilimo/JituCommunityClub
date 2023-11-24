CREATE  TABLE Users(
    userID VARCHAR(100) PRIMARY KEY,
    fName VARCHAR(200) NOT NULL,
    lName VARCHAR(200) NOT NULL,
    email VARCHAR(250)NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) Default 'user',
    cohortNumber VARCHAR(200) NOT NULL
)

SELECT * FROM Users


UPDATE Users SET role = 'admin' WHERE email = 'isaackilimok2@gmail.com'

DROP TABLE Users