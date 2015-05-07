var app = app || {};

app.noteModel = (function(){
    function Note(requester){
        this.requester = requester;
    }

    Note.prototype.getAllNotes = function(){
        return this.requester.get('classes/Note');
    };

    Note.prototype.addNote = function(data){
        return this.requester.post('classes/Note', data);
    };

    Note.prototype.deleteNote = function(id){
        return this.requester.delete('classes/Note/' + id);
    };

    Note.prototype.editNote = function(id, data){
        return this.requester.put('classes/Note/' + id, data)
    };

    Note.prototype.getTodaysNote = function(date){
        return this.requester.get('classes/Note?where={"deadline":"' + date + '"}')
    }

    return {
        load: function(requester){
            return new Note(requester);
        }
    }
}());