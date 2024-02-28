const express = require('express');
const userRoutes = require('./userRoutes');
const accountRouter = require('./account');
const router = express.Router();

// router.route('/user').get(function(req, res, next){
//     res.send('Hello User');
// });
router.use('/user',userRoutes)
router.use('/account',accountRouter)

module.exports = router;
