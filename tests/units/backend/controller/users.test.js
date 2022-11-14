const { describe, default: test } = require('node:test');
const usersController = require('../../../api/controller/users');
const User = require('../../../api/models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('Users controller', () => {
    beforeEach(() =>  jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe('displayAll', () => {
        test('it returns all users with a 200 status code', async () =>{
            jest.spyOn(User, 'all', 'get')
                 .mockResolvedValue(['user1', 'user2', 'user3']);
            await usersController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['user1', 'user2', 'user3']);
        })
    })

    

})