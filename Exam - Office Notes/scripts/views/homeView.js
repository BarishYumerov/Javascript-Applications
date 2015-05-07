var app = app || {};

app.homeView = (function(){

    function renderHomeView(selector, user){

        $.get('templates/home.html', function(template){
            var output = Mustache.render(template, user);
            $(selector).empty();
            $(selector).append(output);
        })
    }

    return{
        render : function(selector, user){
            renderHomeView(selector, user);
        }
    }

}());