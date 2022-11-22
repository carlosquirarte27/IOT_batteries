const router = require('express').Router();
const batteryController = require('./batteries.controller');

/**
 * @swagger
 *   /api/Circuits:
 *     get:
 *       tags:
 *       - Circuits
 *       description: Get all Circuits
 *       responses:
 *         200:
 *           description: Array with a list of channels
 */

router.get('/Batteries',batteryController.getAll);
 /**
  * @swagger
  *   /api/Circuits/{id}:
  *     get:
  *       tags:
  *       - Circuits
  *       description: Get one channel by ID
  *       parameters:
  *         - in: path
  *           name: id
  *           required: true
  *           description: Circuit's unique ID
  *       responses:
  *         200:
  *           description: An object with a single message's data
  */
router.get('/batteries/:id',batteryController.update);
  /**
  * @swagger
  *   /api/Circuits/:
  *     post:
  *       tags:
  *       - Circuits
  *       description: Create a Circuit
  *       parameters:
  *         - in: body
  *           name: name
  *           required: true
  *           description: Name of the circuit
  *         - in: body
  *           name: address
  *           required: true
  *           description: The real address of the circuit
  *         - in: body
  *           name: phone
  *           required: true
  *           description: a phone number to contact with the circuit managers
  *         - in: body
  *           name: distance
  *           required: true
  *           description: The circuit distance, measured in kilometers
  *       responses:
  *         200:
  *           description: An object with a single message's data
  */
router.get('/Battery/:id',batteryController.getOne);
router.post('/Batteries',batteryController.create);
router.delete('/Batteries/:id',batteryController.delete);
router.put('/Batteries',batteryController.update);
module.exports = router;