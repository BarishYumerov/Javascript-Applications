var app = app || {};

app.model = (function(){

    function Model(requester){
		this.userModel = new app.userModel.load(requester);
        this.noteModel = new app.noteModel.load(requester);
    }

    return{
        load : function(requester){
            return new Model(requester);
        }
    }
}());