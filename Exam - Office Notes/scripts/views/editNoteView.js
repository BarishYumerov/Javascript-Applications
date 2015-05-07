var app = app || {};

app.editNoteView = (function(){

    function renderEditNoteView(selector, data){

        $.get('templates/editNote.html', function(template){
            var output = Mustache.render(template, data);
            $(selector).empty();
            $(selector).append(output);
        })
    }

    return{
        render : function(selector, data){
            renderEditNoteView(selector, data);
        }
    }

}());