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

  it('should return all listings', async () => {
    const ID = '68hy789356103877hdy'
    const res = await api.get(`/listings/${ID}`)
    // eslint-disable-next-line no-unused-expressions
    expect(res.body.status).to.be.ok;
		expect(res.body.data).to.be.an('object')
  })
})

