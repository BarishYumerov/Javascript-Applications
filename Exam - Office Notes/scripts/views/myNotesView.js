var app = app || {};

app.myNotesView = (function(){

    function renderMyNotesView(selector, data){

        $.get('templates/myNoteTemplate.html', function(template){
            var output = Mustache.render(template, data);
            $(selector).append(output);
        })
    }

    return{
        render : function(selector, data){
            renderMyNotesView(selector, data);
        }
    }

}());