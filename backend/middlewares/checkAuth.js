var isLoggedIn = true;
function checkAuth(req, res, next) {
   if (isLoggedIn === true) {
      // user is logged in
      // continue
      next();
   } else {
      throw new Error('Please log in');
   }
}

module.exports = checkAuth;
