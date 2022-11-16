const User = require('../../../../models/User');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../../dbConfig');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}, {}]});
            const all = await User.all;
            expect(all).toHaveLength(4)
        })
    });

    describe('get habits', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ id: 1 });
            const all = await User.getHabits(1);
            expect(all).toHaveLength(4)
        })
    });


    describe('delete', () => {
        test('it resolves with message on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ id: 1 });
            let testUser = new User({ id: 1, name: 'Test User'})
            const result = await testUser.delete();
            expect(result).toBe('User was deleted')
        })
    });

    describe('findById', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, name: 'Test User' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData ] });
            const result = await User.getUser(1);
            expect(result).toBeInstanceOf(User)
        })
    });

    describe('findByEmail', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, email: 'test@test.com', name: 'Test User' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData ] });
            const result = await User.findByEmail('test@test.com');
            expect(result).toBeInstanceOf(User)
        })
    });

    describe('create', () => {
        test('it resolves with user on successful db query', async () => {
            let habitData = { id: 1, name: 'New User' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await User.create('New User');
            expect(result).toBeInstanceOf(User)
        })
    });

    //habit check
    //getHabits
    //passwordcheck

    
})
