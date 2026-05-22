import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'



// controller for get user
export const getUser = async (req, res) => {
    try {

        // console.log(req.headers.authorization)
        const users = await User.find().select("-password")

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "User Not Found" })
        }

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}


// controller for get user by id
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id

        const users = await User.findById(id).select("-password")

        if (!users) {
            return res.status(404).json({ message: "User Not Found" })
        }

        return res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}


// controller for update user
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id

        // if password is updating → hash it
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }

        const users = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        ).select("-password")

        if (!users) {
            return res.status(404).json({ message: "User Not Found" })
        }

        return res.status(200).json({ message: "User updated.", data: users })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}


// controller for update Role 

export const updateRole = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: user.role === "admin" ? "user" : "admin" },
            { new: true }
        );

        res.status(200).json({ message: "Role updated", role: updatedUser.role });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// controller for delete user
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId

        const users = await User.findByIdAndDelete(userId)

        if (!users) {
            return res.status(404).json({ message: "User Not Found" })
        }

        return res.status(200).json({ message: "User deleted." })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}