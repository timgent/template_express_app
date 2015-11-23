module.exports = function(app) {
    var homeController = App.route('home')
    app.get("/",    homeController.home)
}
