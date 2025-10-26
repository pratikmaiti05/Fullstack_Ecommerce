async function isAdmin(req, res, next) {
  if (req.user && req.user.role=== 'admin') {
    next();
  } else {
    return res.status(403).json({
      message: "You are not authorized to access this resource"
    });
  }
}
module.exports =  isAdmin ;