var app = app || {};

app.allNotesView = (function(){

    function renderAllNotesView(selector, data){

        $.get('templates/officeNoteTemplate.html', function(template){
            var output = Mustache.render(template, data);
            $(selector).append(output);
        })
    }

    return{
        render : function(selector, data){
            renderAllNotesView(selector, data);
        }
    }

}());