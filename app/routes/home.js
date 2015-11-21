exports.home = function(req, res) {
  res.setHeader('Content-Type', 'text/html')
  res.send('Welcome to the template project')
}
