const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }

    jwt.verify(token, 'supersecret123', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden access.' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticate;
