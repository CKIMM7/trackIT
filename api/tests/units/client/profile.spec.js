const fs = require('fs');
const path = require('path');
global.fetch = require('jest-fetch-mock');
// global.fetch = require('jest-environment-jsdom');
const profile = require('../../../../client/assets/js/profile');

jest.mock('../../../../client/assets/js/profile')

const editBtn = jest.fn();

describe('profile.js', () => {
    beforeEach(() => {
        fetch.enableMocks();
        const userId = 1;
    })

    afterEach(() => fetch.resetMocks())

    // test display, eventlisteners, results

    test('there is a userId', () => {
        expect(userId).toBe(1);
    })

    

});