import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v4} from 'uuid'
import { Request, Response } from 'express'
import { deleteUserController, getAllUsersControllers, getSingleUserController, loginUserController, registerUserController, updateUserController } from './userControllers'


describe ("User Registration", ()=>{
 
    let res:any;

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    })

    it("successfully registers a user", async()=>{
        const req = {
            body: {
                fName: "John",
                lName: "Doe",
                email: "John.Doe@thejitu.com",
                password: "HashedPass@word123",
                cohortNumber: "QA20",
            }
        }

       
        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("HashedPass@word123" as never)

        const mockedInput = jest.fn().mockReturnThis() 

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = { 
            request: jest.fn().mockReturnValue(mockedRequest)
        }

      

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await registerUserController(req as Request, res as any)

        // Assertions

        expect(res.json).toHaveBeenCalledWith({message: 'User Registered Successfully'})
        expect(res.status).toHaveBeenCalledWith(200)
        expect(mockedInput).toHaveBeenCalledWith('password',  mssql.VarChar, 'HashedPass@word123')
        expect(mockedInput).toHaveBeenCalledWith('fName',  mssql.VarChar, 'John')
        expect(mockedInput).toHaveBeenCalledWith('lName',  mssql.VarChar, 'Doe')
        expect(mockedInput).toHaveBeenCalledWith('email',  mssql.VarChar, 'John.Doe@thejitu.com')
        expect(mockedInput).toHaveBeenCalledWith('cohortNumber',  mssql.VarChar, 'QA20')
    })

})


    describe("User Update and Details", () => {
        let res: any;
      
        beforeEach(() => {
          res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
          };
        });
      
        it("Updates user details", async () => {
          const req = {
            params: {
              userID: "7fda9578-0147-49f3-a90e-a34a10cf13ef"
            },
            body: {
              fName: "John",
              lName: "Doe",
              email: "John.Doe@thejitu.com",
              cohortNumber: "QA20"
            }
          };
      
        
          const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
      
          const mockedRequest = {
            input: jest.fn().mockReturnThis(),
            execute: mockedExecute
          };
      
          const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
          };
      
          jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);
      
          await updateUserController(req as any, res as any);
      
          expect(res.json).toHaveBeenCalledWith({ message: "User updated successfully" });
        });

        
      
      
        it("Gets single user", async () => {
          const req = {
            params: {
              userID: "027ac79c-c123-42d9-a99d-676ec6959487"
            }
          };

          const mockedOneUser={
                userID: "027ac79c-c123-42d9-a99d-676ec6959487",
                fName: "John",
                lName: "Doe",
                email: "John.Doe@thejitu.com",
                role: "user",
                cohortNumber: "QA20"
              }
          
      
          jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [mockedOneUser]})
          } as never);
      
          await getSingleUserController(req as any, res as any);
      
          expect(res.json).toHaveBeenCalledWith([mockedOneUser]);
        });



      
        it("Deletes user", async () => {
          const req = {
            params: {
              userID: "4c30c181-36a9-4715-aeee-0906e1069b01"
            }
          };
      
          const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
      
          const mockedRequest = {
            input: jest.fn().mockReturnThis(),
            execute: mockedExecute
          };
      
          const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
          };
      
          jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);
      
          await deleteUserController(req as any, res as any);
      
          expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
        });



        it("Gets all users", async () => {
          const req = {};
      
          const mockedUsers = [
            {
                userID: "027ac79c-c123-42d9-a99d-676ec6959487",
                fName: "Jonh",
                lName: "Doe",
                email: "John.Doe@thejitu.com",
                password: "$2b$05$nNcHBxc3A.V4nCklut/UJ.yHkgOgwATS8Ryzs395oG34PHcP13Wlq",
                role: "user",
                cohortNumber:"QA20",
              },
              {
                userID: "4c30c181-36a9-4715-aeee-0906e1069b01",
                fName: "Emmanuel",
                lName: "Manu",
                email: "Emmanuel.Manu@thejitu.com",
                password: "$2b$05$1IXTWWJVp3FSN.JxhT1cEO8n/eonz.gS.YdPPe/exhpNnh4CaCNvq",
                role: "user",
                cohortNumber: "QA20",
              }
          ];
      
          jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: mockedUsers })
          } as never);
      
          await getAllUsersControllers(req as any, res as any);
      
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.json).toHaveBeenCalledWith(mockedUsers);
        });

    })

    describe ("Testing Login Functionality", ()=>{

      let res:any
  
      beforeEach(()=>{
          res={
              status: jest.fn().mockReturnThis(),
              json: jest.fn().mockReturnThis()
          }
      })
  
      it('Returns an error if email or password is empty' ,async()=>{
          const req = {
              body:{
                  email: "",
                  password: ""
              }
          }
  
          await loginUserController(req as Request, res)
  
          expect(res.json).toHaveBeenCalledWith({"error": "\"email\" is not allowed to be empty"})
  
      })
  
      it('Returns an error if email or password is missing' ,async()=>{
          const req = {
              body:{
                  
              }
          }
  
          await loginUserController(req as Request, res)
  
          expect(res.json).toHaveBeenCalledWith({"error": "\"email\" is required"})
  
      })
  
      it("Returns an error if email is not in database", async()=>{
          const req = {
              body:{
                  email: "Emmanuel.Manu@thejitu.com",
                  password: "12345678@Em"
              }
          }
  
          jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
              request: jest.fn().mockReturnThis(),
              input: jest.fn().mockReturnThis(),
              execute: jest.fn().mockResolvedValueOnce({recordset: []})
          } as never)
  
          await loginUserController(req as Request, res)
  
          expect(res.json).toHaveBeenCalledWith({error: "Email not found"}) 
      })
  
      it("Handles incorrect password scenario", async()=>{
          const req = {
              body:{
                  email: "Emmanuel.Manu@thejitu.com",
                  password: "12345678@EM"
              }
          }
  
          jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
              request: jest.fn().mockReturnThis(),
              input: jest.fn().mockReturnThis(),
              execute: jest.fn().mockResolvedValueOnce({
                  recordset: [{
                      email: 'Emmanuel.Manu@thejitu.com',
                      password: 'hashedPwd'
                  }]
              })
          } as never)
  
          jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)
  
          await loginUserController(req as Request, res)
  
          expect(res.json).toHaveBeenCalledWith({error: "Incorrect password"})
      })
  
      it("successfully logs in a user and returns a token", async()=>{
  
          let expectedUser = {
              userID: "7fda9578-0147-49f3-a90e-a34a10cf13ef",
              fName: "Emmanuel",
              lName: "Manu",
              email: "Emmanuel.Manu@thejitu.com",
              password: "$2b$05$9HCBX0QnlqDQQTg6dnCwuuTa97.aiYa1e.Svg1xKUscNDTYZ6ydDi",
              role: "user",
              hasBooked: 1,
              resetPassword: null
          }
  
          const req = {
              body:{
                  email: expectedUser.email,
                  password: "12345678@Em"
              }
          }
  
          jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
              request: jest.fn().mockReturnThis(),
              input: jest.fn().mockReturnThis(),
              execute: jest.fn().mockResolvedValueOnce({recordset: [expectedUser]})
          } as never)
  
          jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)
  
          jest.spyOn(jwt, 'sign').mockReturnValueOnce("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0YzMwYzE4MS0zNmE5LTQ3MTUtYWVlZS0wOTA2ZTEwNjliMDEiLCJmdWxsTmFtZSI6Ik1hbnUiLCJlbWFpbCI6ImVtbWFudWVsbWFudUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImhhc0Jvb2tlZCI6MCwicmVzZXRQYXNzd29yZCI6MCwiaWF0IjoxNzAwNzczMjg0LCJleHAiOjE3MDA5NDYwODR9.9zZD1KEtt5kIsbD6u9RWZuit9pqT5T31QazznTVaxZg" as never)
  
          await loginUserController(req as Request, res)
  
          expect(res.json).toHaveBeenCalledWith({
              message: "Logged in successfully",
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0YzMwYzE4MS0zNmE5LTQ3MTUtYWVlZS0wOTA2ZTEwNjliMDEiLCJmdWxsTmFtZSI6Ik1hbnUiLCJlbWFpbCI6ImVtbWFudWVsbWFudUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImhhc0Jvb2tlZCI6MCwicmVzZXRQYXNzd29yZCI6MCwiaWF0IjoxNzAwNzczMjg0LCJleHAiOjE3MDA5NDYwODR9.9zZD1KEtt5kIsbD6u9RWZuit9pqT5T31QazznTVaxZg"
          }) 
      }) 
  
      })
  


    