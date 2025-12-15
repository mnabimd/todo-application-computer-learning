// Protect routes
export function auth(req, res, next) {
   const header = req.headers.authorization;
   if (!header) return res.sendStatus(401);

   const token = header.split(' ')[1];

   try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
   } catch {
      res.sendStatus(403);
   }
}

// Role based access
export function requireAdmin(req, res, next) {
   if (req.user.role !== 'admin') return res.sendStatus(403);
   next();
}
