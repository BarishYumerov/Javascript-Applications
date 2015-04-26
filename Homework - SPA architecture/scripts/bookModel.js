var app = app || {};

app.bookModel = (function(){

    function Book(url, requester){
        this.url = url;
        this.requester = requester;
    }

    Book.prototype.getAllBooks = function(){
        return this.requester.request("GET", this.url, null);
    };

    Book.prototype.postBook = function(data){
        return this.requester.request("POST", this.url, data);
    };

    return {
        load: function(baseUrl, requester){
            return new Book(baseUrl, requester)
        }
    }

}());