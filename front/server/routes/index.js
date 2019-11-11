const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({data:'this is index.'}));
router.get('/:id', (req, res) => res.json({data: req.params.id}))

module.exports = router