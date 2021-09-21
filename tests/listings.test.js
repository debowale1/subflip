/* eslint-disable no-undef */
import { expect } from 'chai'
import request from 'supertest'
// import faker from 'faker'

const api = request('http://localhost:9000/api/v1')

describe('Lisiting /api/v1/listings', () => {
  it('should return all listings', async () => {
    const res = await api.get('/listings')
    // eslint-disable-next-line no-unused-expressions
    expect(res.body.status).to.be.ok;
		// expect(res.body.result).to.be.greaterThan(0)
		// expect(res.body.data).to.be.an('Object')
  })
})
