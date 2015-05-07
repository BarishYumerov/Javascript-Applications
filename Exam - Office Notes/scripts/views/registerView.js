var app = app || {};

app.registerView = (function(){

    function renderRegisterView(selector){

        $.get('templates/register.html', function(template){
            var output = Mustache.render(template);
            $('nav').remove();
            $(selector).empty();
            $(selector).append(output);
        })
    }

    return{
        render : function(selector){
            renderRegisterView(selector);
        }
    }

}());