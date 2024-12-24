

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access forbidden' });
    }
    next();
};


module.exports = authorizeAdmin;