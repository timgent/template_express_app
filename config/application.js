var env            = process.env.NODE_ENV || 'development'
  , packageJson    = require('../package.json')
  , path           = require('path')
  , express        = require('express')
  , bodyParser     = require('body-parser')
  , methodOverride = require('method-override')
  , cookieSession  = require('cookie-session')
  , cookieParser   = require('cookie-parser')

console.log('Loading App in ' + env + ' node.')

global.App = {
  app: express()
, port: process.env.PORT || '3000'
, version: packageJson.version 
, root: path.join(__dirname, '..')
, appPath: function(path) {
    return this.root + '/' + path
  }
, require: function(path) {
    return require(this.appPath(path))
  }
, env: env
, start: function() {
    if (!this.started) {
      this.started = true
      this.app.listen(this.port)
      console.log('Running App Version ' + App.version + ' on port ' + App.port + ' in ' + App.env + ' node')
    }
  }
, route: function(path) {
    return this.require('app/routes/' + path)
  }
}

// Middleware
App.app.use(bodyParser.urlencoded({extended: true}))
App.app.use(bodyParser.json())
App.app.use(methodOverride())
App.app.use(cookieParser())
App.app.use(cookieSession({secret: 'not really all that much of a secret', key: 'express_session'}))
App.app.use(express.static(App.appPath('public')))
App.require('config/routes')(App.app)
