var app = app || {};

app.viewFactory = (function(){

    function ViewFactory(model){
        this.model = model;
    }

    ViewFactory.prototype.generateBookTable = function(selector, data){
        $.get('templates/table.html', function(template){
            var output = Mustache.render(template, data);
            $(selector).html(output);
        })
    };

    ViewFactory.prototype.generateAddBookView = function(selector, controller){
        var _this = this;
        $.get('templates/form.html', function(template){
            var output = Mustache.render(template);
            $(selector).append(output);
        })
            .then(function(){
                $('#add').click(function(){
                    var author = $('#author').val();
                    var title = $('#title').val();
                    var isbn = $('#isbn').val();
                    controller.addBook(author, title, isbn);
                })
            })
    };

    ViewFactory.prototype.renderBook = function(book, selector) {
        $.get('/templates/addStudent.html', function(template){
            var output = Mustache.render(template);
            $(selector).append(output);
        })
            .then(function(){
                $('#author').val('');
                $('#title').val('');
                $('#isbn').val('');
            },function(err){ console.log(err.responseText)});
    };


    return{
        load: function(model){
            return new ViewFactory(model);
        }
    }
}());