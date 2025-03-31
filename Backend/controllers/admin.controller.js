const adminModel = require('../models/admin.model');
const adminService = require('../services/admin.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerAdmin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const isAdminAlready = await adminModel.findOne({ email });

        if (isAdminAlready) {
            return res.status(400).json({ message: 'Admin already exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await adminService.createAdmin({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token = admin.generateAuthToken();

        res.status(201).json({ token, admin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports.loginAdmin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email }).select('+password');

        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token);

        res.status(200).json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports.getAdminProfile = async (req, res, next) => {
    res.status(200).json(req.admin);
}

module.exports.logoutAdmin = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });
}