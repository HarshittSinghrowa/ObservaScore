const request = require('supertest');
const app = require('../../src/main/backend/server');

describe('ObservaScore API Tests', () => {

  describe('GET /', () => {
    it('should return API info', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain('ObservaScore');
      expect(res.body.author).toBe('Harshitt Singhrowa');
      expect(res.body.regNo).toBe('23FE10CSE00838');
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body).toHaveProperty('uptime');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /api/score/calculate', () => {
    const validPayload = {
      projectName: 'test-service',
      environment: 'development',
      pillars: [
        {
          name: 'Logging',
          weight: 25,
          criteria: [
            { label: 'Structured JSON logging', points: 20, value: true },
            { label: 'Log levels configured', points: 15, value: false },
          ]
        }
      ]
    };

    it('should validate missing project name', async () => {
      const res = await request(app)
        .post('/api/score/calculate')
        .send({ ...validPayload, projectName: '' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should validate missing pillars', async () => {
      const res = await request(app)
        .post('/api/score/calculate')
        .send({ projectName: 'test', pillars: [] });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/history', () => {
    it('should return paginated history', async () => {
      const res = await request(app).get('/api/history');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
    });

    it('should support environment filter', async () => {
      const res = await request(app).get('/api/history?environment=production');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/score/:id', () => {
    it('should return 404 for invalid ID', async () => {
      const res = await request(app).get('/api/score/000000000000000000000000');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/nonexistent');
      expect(res.statusCode).toBe(404);
    });
  });
});
