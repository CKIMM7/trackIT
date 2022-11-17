const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }
const User = require('../../models/User')
const Habit = require('../../models/Habit')

describe('habits endpoints', () => {
    let api;
    beforeEach(async () => {
        // await resetTestDB()
    })

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should return a list of all habits in database', async () => {
        const res = await request(api).get('/habits')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeTruthy()
    });

    it('should retrieve a habit based on id', async () => {

        User.login('sam1@gmail.com','sam')

        const res = await request(api).get('/habits/2/test')
        expect(res.statusCode).toEqual(200)
        // expect(res.body.name).toEqual('Beth')
    });


    // describe('add habit', () => {
    //     test('it adds a habit', (done) => {
    //         const data = {
    //             id: 1,
    //             name: "Test text", 
    //             desc: null,
    //             freq: null,
    //             start_date: null,
    //             user_id: 1
    //         }
    //         request(api)
    //         .post('/habits')
    //         .send(data)
    //         .set('Content-Type', 'application/json')
    //         .expect(201, done);
    //     })
    // })

    describe('update habit', () => {
        test('it updates a habit', (done) => {
            const data = {
                id: 2,
                name: "Test text", 
                desc: null,
                freq: null,
                start_date: null,
                user_id: 1
            }
            request(api)
            .patch('/habits/2')
            .send(data)
            .set('Content-Type', 'application/json')
            .expect(200, done);
        })
    })

    describe('delete habit', () => {
        test('it deletes a habit', async (done) => {
            const data = { name: 'Test' }
            request(api)
            .delete('/habits/15')
            .send(data)
            .set('Content-Type', 'application/json')
            .expect(204, done);
        })
    })
 
})
