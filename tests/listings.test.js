/* eslint-disable no-undef */
import { expect } from 'chai'
import request from 'supertest'
// import faker from 'faker'

const api = request('http://localhost:9000/api/v1')

describe('Listing Endpoints /api/v1/listings', () => {
  it('should return all listings', async () => {
    const res = await api.get('/listings')
    // eslint-disable-next-line no-unused-expressions
    expect(res.body.status).to.be.ok;
		// expect(res.body.result).to.be.greaterThan(0)
		// expect(res.body.data).to.be.an('Object')
  })

  it('should return a listing by ID', async () => {
    const ID = '616951c3b8d38d4f774441e2'
    const res = await api.get(`/listings/${ID}`)
    // eslint-disable-next-line no-unused-expressions
    expect(res.body.status).to.be.ok;
		expect(res.body.data).to.be.an('object')
  })
})

