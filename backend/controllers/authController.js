import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({
            message: 'Signup successful'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Signup failed'
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }

        res.json({
            message: 'Login successful'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Login failed'
        });
    }
};