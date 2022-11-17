const usersController = require('../../../../controller/users');
const User = require('../../../../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('Users controller', () => {
    let userId = 1;
    let name, email, password;

    beforeEach(() => {
        jest.clearAllMocks();
        name: 'user1';
        email = 'test1@mail.com';
        password = 'pass1';
    });
    afterAll(() => jest.resetAllMocks());

    // --method not being used?
    // err: no of calls: 0 --> method is not being used
    // describe('currentUser', () => {
    //     test('returns user data for auth', async () => {
    //         const mockAccessToken = jest.fn();
    //         const testUser  = { 
    //             cookie: mockAccessToken,
    //             id: userId,
    //             email: email
    //         }
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(testUser);
    //     }) 
    // })

    describe('displayAll', () => {
        let testData = ['user1', 'user2', 'user3'];

        // (object, methodName, accessType?)
        jest.spyOn(User, 'all', 'get')
             .mockResolvedValue(testData);
        
        test('it returns all users with a 200 status code', async () => {
            await usersController.displayAll(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testData);
        })
        test('it returns error message with a 500 status code', async () => {
            testData.push('user4');
            return await usersController.displayAll(null, mockRes).catch(e =>
                expect(e).toEqual({
                    status: 500,
                    error: "Error retrieving authors"
                })
            );
        })
    })

    describe('getUser', () => {
        let testData = {id: userId, email: email};
        let mockReq = { params: { id: userId } }

        jest.spyOn(User, 'getUser')
            .mockResolvedValue(testData)

        test('return a user by id with a 200 status code', async () => {  
            await usersController.getUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testData);
        })
        test('it returns error message with a 404 status code', async () => {
            userId = 2;
            return await usersController.getUser(mockReq, mockRes).catch(e =>
                expect(e).toEqual({
                    status: 404,
                    error: "Error retrieving user"
                })
            );
        })
    })

    describe('getHabits', () => {
        let testData = {id: userId, email: email};
        let mockReq = { params: { id: userId } }

        jest.spyOn(User, 'getHabits')
            .mockResolvedValue(testData)

        test('return user\'s habits by id with a 200 status code', async () => {  
            await usersController.getHabits(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testData);
        })
        test('it returns error message with a 404 status code', async () => {
            userId = 2;
            return await usersController.getHabits(mockReq, mockRes).catch(e =>
                expect(e).toEqual({
                    status: 404,
                    error: "Error retrieving user"
                })
            );
        })
    })  

    describe('create', () => {
        let testData = { name: 'user4', email: 'test4@mail.com', password: 'pass4' };
        let mockReq = { body: testData }
        
        jest.spyOn(User, 'create')
            .mockResolvedValue(new User(testData));

        test('create a new user with a 201 status code', async () => {
            await usersController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new User(testData));
        })
        test('it returns error message with a 404 status code', async () => {
            email = 'test1@mail.com'
            return await usersController.create(mockReq, mockRes).catch(e =>
                expect(e).toEqual({
                    status: 404,
                    error: `Error creating user: ${e}`
                })
            );
        })
    })

    // // err: not a function?  <<<<<<
    // describe('update', () => {
    //     const testData = { id: userId, name: name };
    //     const mockReq = { body: testData };

    //     jest.spyOn(User, 'update').mockResolvedValue(testData);

    //     test('update users info with a 200 status code', async () => {
    //         await usersController.update(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(testData);
    //     })
    //     test('it returns error message with a 500 status code', async () => {
    //         return await usersController.update(mockReq, mockRes).catch(e =>
    //             expect(e).toEqual({
    //                 status: 500,
    //                 error: 'reject("Error updating user'
    //             })
    //         );
    //     })
    // })

    // // err: not a function? <<<<<
    // describe('destroy', () => {
    //     test('delete a user with a 204 status code', async() => {
    //         jest.spyOn(User.prototype, 'delete')
    //             .mockResolvedValue("User was deleted");
            
    //         const mockReq = { params: { id: 1 } }
    //         await usersController.delete(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(204);
    //     })
    // })

    // // fail: 500 status code
    // describe.skip('login', () => {
    //     test('login user with a 200 status code', async() => {
    //         const testData = { email: 'test1@mail.com', password: 'pass1' };
    //         const mockReq = { body: testData };

    //         jest.spyOn(User, 'login')
    //             .mockResolvedValue(testData);
                
    //         await usersController.update(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(new User(testData));
    //     })
    // })

    // // fail: 500 status code
    // describe.skip('signup', () => {
    //     test('signup new user with a 201 status code', async() => {
    //         const testData = { name: 'user1', email: 'test1@mail.com', password: 'pass1' };
    //         const mockReq = { body: testData };

    //         jest.spyOn(User, 'signup')
    //             .mockResolvedValue(testData);

    //         await usersController.update(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(201);
    //         expect(mockJson).toHaveBeenCalledWith(new User(testData)); 
    //     })

    //     test.skip('password has been hashed', () => {

    //     })
    // })

    // // still need to edit <<<<<<<<
    // describe.skip('getHabits', () => {
    //     test('returns a list of users habits with a 200 status code', async() => {
    //         const testData = [];

    //         jest.spyOn(User, 'getHabits')
    //             .mockResolvedValue(testData);
    //         await usersController.getHabits(null, mockRes)
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(testData);
    //     } )
    // })




})