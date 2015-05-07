var app = app || {};

app.deleteNoteView = (function(){

    function renderDeleteNoteView(selector, data){

        $.get('templates/deleteNote.html', function(template){
            var output = Mustache.render(template, data);
            $(selector).empty();
            $(selector).append(output);
        })
    }

    return{
        render : function(selector, data){
            renderDeleteNoteView(selector, data);
        }
    }

}());