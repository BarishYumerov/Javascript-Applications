var app = app || {};

(function(){

    var requester = app.requester.load();
    var bookModel = app.bookModel.load('https://api.parse.com/1/classes/Book', requester);
    var viewFactory = app.viewFactory.load(bookModel);
    var controller = app.controller.load(bookModel, viewFactory);

    app.router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/allBooks', function () {
            controller.loadAllBooks(selector);
        });
    });

    app.router.run('#/allBooks');


}());