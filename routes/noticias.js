const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Noticias publicas')
})

module.exports = router