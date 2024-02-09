const express = require("express");
const router = express.Router();

const UserRoles = require("../controllers/admin");

router.post('/register', UserRoles.adminRegistration)
router.post('/login', UserRoles.adminLogin)

module.exports = router;