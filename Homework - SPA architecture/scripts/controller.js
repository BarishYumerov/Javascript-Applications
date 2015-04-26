var app = app || {};

app.controller = (function(){

    function Controller(model, viewFactory){
        this.model = model;
        this.viewFactory = viewFactory;
    }

    Controller.prototype.loadAllBooks = function(selector){

        var _this = this;
        this.model.getAllBooks()
            .then(function(bookData){
                _this.viewFactory.generateBookTable(selector, bookData);
                _this.viewFactory.generateAddBookView(selector, _this);

            }, function(err){
                console.log(err.responseText);
            })
    };

    Controller.prototype.addBook = function(author, title, isbn){
        var _this = this;
        var book = {
            author : author,
            title : title,
            isbn : isbn
        };
        this.model.postBook(book)
            .then(function(){
                _this.viewFactory.renderBook(book, '#table');
            },
            function(err){console.log(err.responseText)})
    };

    return {
        load: function(model, viewFactory){
            return new Controller(model, viewFactory);
        }
    }

}());