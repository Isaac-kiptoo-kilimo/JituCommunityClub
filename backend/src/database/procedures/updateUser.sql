
CREATE OR ALTER  PROCEDURE updateUser(
    @userID VARCHAR(100),
    @fName VARCHAR(200),
    @lName VARCHAR(200),
    @email VARCHAR(250),
    @cohortNumber VARCHAR(250)
    
)
AS
BEGIN
	UPDATE Users SET fName=@fName,lName=@lName,email=@email,cohortNumber=@cohortNumber WHERE userID = @userID;
end;