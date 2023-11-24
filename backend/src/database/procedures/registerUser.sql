CREATE OR ALTER PROCEDURE registerUser(
    @userID VARCHAR(100),
    @fName VARCHAR(200),
    @lName VARCHAR(200),
    @email VARCHAR(250),
    @password VARCHAR(100),
    @cohortNumber VARCHAR(200)
)
AS BEGIN
    INSERT INTO Users(userID,fName,lName,email,password,cohortNumber)
     VALUES(@userID,@fName,@lName,@email,@password,@cohortNumber)

END