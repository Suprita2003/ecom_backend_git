const express = require("express");
const { createUser, getAllUsers, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.post("/createUsers", createUser);
router.get("/getallUsers", getAllUsers);
router.put("/updateUsers/:id",updateUser); 
router.delete("/deleteUsers/:id",deleteUser);

module.exports = router;
