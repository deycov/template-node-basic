const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
	res.json('Aplicacion corriendo con éxito, para ir a los productos coloque "products" como endpoint y "users" para los usuarios');
})

module.exports = router