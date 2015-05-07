var app = app || {};

app.menuView = (function(){

    function renderMenuView(selector){

        $.get('templates/menu.html', function(template){
            var output = Mustache.render(template);
            $('nav').remove();
            $('#wrapper').prepend(output);
        })
    }

    return{
        render : function(selector){
            renderMenuView(selector);
        }
    }

}());