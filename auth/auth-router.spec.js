const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');

describe('server', () => {
	beforeEach(async () => {
		await db('users').truncate();
	});

	describe('POST /REGISTER', () => {
		it('should return 201 status', () => {
			return request(server)
				.post('/api/auth/register')
				.send({
					username: 'admin',
					password: 'admin'
				})
				.set('Content-Type', 'application/json')
				.then(res => {
					expect(res.status).toBe(201);
					expect(res.body.username).toBe('admin');
				});
		});

		it('username should be {Name}', () => {
			return request(server)
				.post('/api/auth/register')
				.send({
					username: 'admin',
					password: 'admin'
				})
				.set('Content-Type', 'application/json')
				.then(res => {
					expect(res.status).toBe(201);
					expect(res.body.username).toBe('admin');
				});
		});
	});
});

let token;

describe('POST /LOGIN', () => {
	it('should return 200 status', () => {
		return request(server)
			.post('/api/auth/login')
			.send({
				username: 'admin',
				password: 'admin'
			})
			.set('Content-Type', 'application/json')
			.then(res => {
				expect(res.status).toBe(200);
				expect(res.body.message).toBe('Log in as > admin');
			});
	});

	it('username should be `${username}`', () => {
		return request(server)
			.post('/api/auth/login')
			.send({
				username: 'admin',
				password: 'admin'
			})
			.set('Content-Type', 'application/json')
			.then(res => {
				expect(res.status).toBe(200);
				expect(res.body.message).toBe('Log in as > admin');
			});
	});
});

describe('GET /api/users', () => {
	it('returns json OK', () => {
		return request(server)
			.get('/api/auth/users')
			.expect('Content-Type', /json/);
	});

	it('should return 200 Status', () => {
		return request(server)
			.get('/api/auth/users')
			.set(
				'Authorization',
				`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTczODM4NDc5LCJleHAiOjE1NzM5MjQ4Nzl9.HjnYr3Op11fHPYmwVceARN4WcSgWNG5J-TzMDoYG7Zg`
			)
			.then(res => {
				expect(res.status).toBe(200);
			});
	});
});
