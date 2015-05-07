var app = app || {};

app.guestHomeView = (function(){

    function renderGuestHomeView(selector){

        $.get('templates/welcome.html', function(template){
            var output = Mustache.render(template);
            $('nav').remove();
            $(selector).empty();
            $(selector).append(output);
        })
    }

    return{
        render : function(selector){
            renderGuestHomeView(selector);
        }
    }

}());