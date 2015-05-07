var app = app || {};

app.addNoteView = (function(){

    function renderAddNoteView(selector){

        $.get('templates/addNote.html', function(template){
            var output = Mustache.render(template);
            $(selector).empty();
            $(selector).append(output);
        })
    }

    return{
        render : function(selector){
            renderAddNoteView(selector);
        }
    }

}());