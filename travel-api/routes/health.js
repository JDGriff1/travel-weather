/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Endpoints related to the health of the Travel API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HealthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: OK
 *         message:
 *           type: string
 *           example: Travel API is running
 *         timestamp:
 *           type: string
 *           format: date-time
 *         uptime:
 *           type: number
 *           example: 12345.678
 *         environment:
 *           type: string
 *           example: development
 *     DetailedHealthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: OK
 *         message:
 *           type: string
 *           example: Travel API detailed health check
 *         timestamp:
 *           type: string
 *           format: date-time
 *         uptime:
 *           type: number
 *           example: 12345.678
 *         memory:
 *           type: object
 *           properties:
 *             rss:
 *               type: number
 *               example: 12345678
 *             heapTotal:
 *               type: number
 *               example: 12345678
 *             heapUsed:
 *               type: number
 *               example: 12345678
 *             external:
 *               type: number
 *               example: 12345678
 *         version:
 *           type: string
 *           example: v16.13.0
 *         platform:
 *           type: string
 *           example: linux
 */

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check endpoint
 *     description: Returns the health status of the Travel API.
 *     responses:
 *       200:
 *         description: API is running successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Travel API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * @swagger
 * /health/detailed:
 *   get:
 *     tags:
 *       - Health
 *     summary: Detailed health check endpoint
 *     description: Returns detailed health status of the Travel API, including memory usage and platform information.
 *     responses:
 *       200:
 *         description: Detailed API health status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetailedHealthResponse'
 */
router.get('/detailed', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Travel API detailed health check',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
    platform: process.platform
  });
});

module.exports = router;
