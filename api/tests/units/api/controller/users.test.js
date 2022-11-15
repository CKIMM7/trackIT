const usersController = require('../../../../controller/users');
const User = require('../../../../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('Users controller', () => {
    beforeEach(() =>  jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe('displayAll', () => {
        test('it returns all users with a 200 status code', async () =>{
            const testData = ['user1', 'user2', 'user3'];

            // (object, methodName, accessType?)
            jest.spyOn(User, 'all', 'get')
                 .mockResolvedValue(testData);
            await usersController.displayAll(null, mockRes);

            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testData);
        })
    })

    describe('getUser', () => {
        test('get a user by id', async () => {
            
        })
    })

})