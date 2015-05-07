var app = app || {};

app.addUlView = (function(){

    function renderUlView(selector){

        $.get('templates/renderUl.html', function(template){
            var output = Mustache.render(template);
            $(selector).empty();
            $(selector).append(output);
        })
    }

    return{
        render : function(selector){
            renderUlView(selector);
        }
    }

}());