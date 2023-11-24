
CREATE OR ALTER PROCEDURE getSingleUser(
    @userID	varchar(100)
)

AS
BEGIN
	SELECT	userID,
			email,
			fName,
			lName,
			role,
			cohortNumber
		
	from	Users where userID= @userID
END

