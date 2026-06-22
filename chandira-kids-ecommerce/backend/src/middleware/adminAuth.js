import { protect, authorize } from './auth.js';

const adminAuth = (req, res, next) => {
  protect(req, res, (err) => {
    if (err) return next(err);
    authorize('admin')(req, res, next);
  });
};

export default adminAuth;
