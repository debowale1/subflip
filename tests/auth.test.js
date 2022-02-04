/* eslint-disable no-undef */
import mongoose from 'mongoose'
import { expect } from "chai"
import request from 'supertest'
import faker from 'faker'

const api = request('http://localhost:9000/api/v1')

describe("Subflip Authentication Test Suit", () => {

  before(function(done) {
    mongoose.connect('mongodb://localhost/subflip', function(error) {
        if (error) console.error('Error while connecting:\n%\n', error);
        console.log('connected');
        done(error);
      });
  });
  // after(async function(done){
  //   await mongoose.disconnect()
  //   done()
  // })

    describe('Authentication /auth', () => {
      it('user should be able to register', async () => {
        await api.post('/auth/register').send({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: 'pass1234',
          passwordConfirm: 'pass1234',
        })
        expect(200)
      })
      it('user should be able to log in', async () => {
        await api.post('/auth/login').send({
          username: faker.internet.userName(),
          password: 'pass1234',
        })
        expect(200)
      })
    
      it('user should be able to send forgot password request', async () => {
        await api.post('/auth/forgotPassword').send({
          email: faker.internet.email(),
        })
        expect(200)
      })
    
      it('user should be able to send password reset request', async () => {
        const token = '9897fc1fe876a78ac1bfd9b4e0904896e125453cb006655fb7038bb19c70a8f6'
        await api.patch(`/auth/resetPassword/${token}`).send({
          password: 'password',
          passwordConfirm: 'password',
        })
        expect(200)
      })
    })
})
