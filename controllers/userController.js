const User = require("../models/userModel");

// Create user
const createUser = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
        });
        const result = await user.save();
        res.send("User created successfully");
        console.log("User created successfully");
    } catch (error) {
        res.status(400).send("Error creating user");
        console.log("Error creating user", error);
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        console.log("Users retrieved successfully");
    } catch (error) {
        res.status(500).send("Error retrieving users");
        console.log("Error retrieving users", error);
    }
};


//Update  users
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.mobile = req.body.mobile;
        user.password = req.body.password;

        await user.save();
        res.send("User updated successfully");
        console.log("User updated successfully");
    } catch (error) {
        res.status(400).send("Error updating user");
        console.log("Error updating user", error);
    }
};

//Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send("User not found");
        }
        
        res.status(200).send("User deleted successfully");
        console.log("User deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting user");
        console.log("Error deleting user", error);
    }
};


module.exports = { createUser, getAllUsers, updateUser, deleteUser };
