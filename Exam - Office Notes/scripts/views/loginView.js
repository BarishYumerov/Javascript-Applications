var app = app || {};

app.loginView = (function(){

    function renderLoginView(selector){

        $.get('templates/login.html', function(template){
            var output = Mustache.render(template);
            $('nav').remove();
            $(selector).empty();
            $(selector).append(output);
        })
    }

    return{
        render : function(selector){
            renderLoginView(selector);
        }
    }

}());