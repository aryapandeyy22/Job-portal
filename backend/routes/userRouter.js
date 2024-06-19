const express = require('express')
const userController = require('../controllers/usercontroller');
const isAuthorized = require('../middleware/auth');

const router = express.Router();

router.post('/register',userController.register);
router.post('/login', userController.login);

router.get('/alluser' ,isAuthorized,userController.getUser);
router.get('/logout', isAuthorized, userController.logout);

module.exports = router;