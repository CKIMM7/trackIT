const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }


describe('users endpoints', () => {
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

    it('should return a list of all dogs in database', async () => {
        const res = await request(api).get('/users')
        expect(res.body).toBeTruthy()
    });

    // it('should retrieve a habit based on id', async () => {

    //     User.login('sam1@gmail.com','sam')

    //     const res = await request(api).get('/users/1')
    //     expect(res.statusCode).toEqual(200)
    //     expect(res.body.name).toEqual('Beth')
    // });


    describe('add habit', () => {
        test('it adds a habit', (done) => {
            const data = {
                name: "Test text", 
                email: "test@test.com",
                password: "password"
            }
            request(api)
            .post('/habits')
            .send(data)
            .set('Content-Type', 'application/json')
            .expect(201, done);
        })
    })

    describe('update habit', () => {
        test('it updates a user', (done) => {
            const data = {
                id: 1,
                name: "Test text", 
                email: "test@test.com",
                password: "password"
            }
            request(api)
            .patch('/users/1')
            .send(data)
            .set('Content-Type', 'application/json')
            .expect(200, done);
        })
    })

    // describe('delete user', () => {
    //     test('it deletes a user', async (done) => {
    //         const data = { name: 'Test' }
    //         request(api)
    //         .delete('/users/10')
    //         .send(data)
    //         .set('Content-Type', 'application/json')
    //         .expect(204, done);
    //     })
    // })
 
 
})
