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

    it('should retrieve a owner based on id', async () => {
        const res = await request(api).get('/users/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual('Beth')
    });

 
})
