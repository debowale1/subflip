/* eslint-disable no-undef */
import mongoose from 'mongoose'
import { expect } from 'chai'
import request from 'supertest'
import faker from 'faker'
// import User from 'models/userModel'
// eslint-disable-next-line import/extensions
const api = request('http://localhost:9000/api/v1')
// User test suite

describe('User Test Suit', () => {
  before(function(done) {
    mongoose.connect('mongodb://localhost/subflip', function(error) {
        if (error) console.error('Error while connecting:\n%\n', error);
        console.log('connected');
      });
      done(error);
});



  describe('Users Endpoints /api/v1/users', () => {
    // test spec (unit test)
    it('should return all users', async () => {
      const res = await api.get('/users').set('Accept', 'application/json').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQ3MGZhNGZmNWE0OWViZmU4YTE0NSIsImlhdCI6MTY0Mzk5OTUzMCwiZXhwIjoxNjUxNzc1NTMwfQ.yWGQ75CcRjZHCjjp-St2WL-4WEGOpReC6Vxh0B5XIa0')
      // eslint-disable-next-line no-unused-expressions
      expect(res.body.status).to.be.ok;
      // expect(res.body.result).to.be.greaterThan(0)
      // expect(res.body.data).to.be.an('Object')
    })

    it('should create a new user', async () => {
      await api.post('/users').send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'pass1234',
        passwordConfirm: 'pass1234',
      }).set('Accept', 'application/json').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQ3MGZhNGZmNWE0OWViZmU4YTE0NSIsImlhdCI6MTY0Mzk5OTUzMCwiZXhwIjoxNjUxNzc1NTMwfQ.yWGQ75CcRjZHCjjp-St2WL-4WEGOpReC6Vxh0B5XIa0')
      expect(201)
    })

    it('should get a user by id', async () => {
      const ID = '61390c4e83d74a3f47e9220b'
      const res = await api.get(`/users/${ID}`).set('Accept', 'application/json').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQ3MGZhNGZmNWE0OWViZmU4YTE0NSIsImlhdCI6MTY0Mzk5OTUzMCwiZXhwIjoxNjUxNzc1NTMwfQ.yWGQ75CcRjZHCjjp-St2WL-4WEGOpReC6Vxh0B5XIa0')
      expect(res.body.data.data).to.be.an('object')
      expect(res.body.status).to.be.a('string')
      expect(res.statusCode).to.be.equal(200)
    })

    // it('should delete user by Id', async () => {
    //   const ID = '61fd6c10b6a4e0015ad1788d'
    //   const res = await api.delete(`/users/${ID}`).set('Accept', 'application/json').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmQ3MGZhNGZmNWE0OWViZmU4YTE0NSIsImlhdCI6MTY0Mzk5OTUzMCwiZXhwIjoxNjUxNzc1NTMwfQ.yWGQ75CcRjZHCjjp-St2WL-4WEGOpReC6Vxh0B5XIa0')
    //   expect(res.statusCode).to.be.equal(204)
    // })

  })

})

