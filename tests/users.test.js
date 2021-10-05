/* eslint-disable no-undef */
import { expect } from 'chai'
import request from 'supertest'
import faker from 'faker'
// eslint-disable-next-line import/extensions
const api = request('http://localhost:9000/api/v1')
// User test suite

describe('Users Endpoints /api/v1/users', () => {
  // test spec (unit test)
	// it('should return all users', async (done) => {
	// 	const users = await api.get('/users/')
	// 	expect(users).to.be.greaterThan(0)
	// 	// expect(res.body.data).to.be.an('Object')
  //   done()
	// })

	it('should create a new user', async () => {
    await api.post('/users').send({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'pass1234',
      passwordConfirm: 'pass1234',
    })
    expect(201)
  })

})

