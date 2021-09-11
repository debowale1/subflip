/* eslint-disable no-undef */
import { expect } from 'chai'
import request from 'supertest'
import faker from 'faker'
// eslint-disable-next-line import/extensions
// import app from '../backend/app.js'
const api = request('http://localhost:9000/api/v1')
// User test suite

describe('GET /api/v1/users', () => {
  // test spec (unit test)
	it('should return all users', async () => {
		const res = await api.get('/users')
		expect(res.body.status).to.be.a('String')
		expect(res.body.result).to.be.greaterThan(0)
		expect(res.body.data).to.be.an('Object')
	})

	it('should create a new user', async () => {
    await api.post('/users').send({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'pass1234',
      passwordConfirm: 'pass1234',
    })
    // expect(res.body.data.user).to.be.an('Object')
    expect(201)
  })

})

