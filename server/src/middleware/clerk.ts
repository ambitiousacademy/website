// middleware/checkAdmin.js
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const requireAdmin = ClerkExpressWithAuth({
  onError: (err, req, res, next) => {
    console.error('Clerk auth error:', err);
    res.status(401).json({ message: 'Unauthorized' });
  },
});

const checkAdmin = (req, res, next) => {
  const user = req.auth?.sessionClaims;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const isAdmin = user.publicMetadata?.role === 'admin' || user.roles?.includes('admin');
  if (!isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
};

module.exports = {
  requireAdmin,
  checkAdmin,
};
