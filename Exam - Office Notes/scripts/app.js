var app = app || {};

(function(){
    var baseUrl = 'https://api.parse.com/1/';
    var requester = app.requester.load(baseUrl);
    var model = app.model.load(requester);
    var controller = app.controller.load(model);

    app.router = Sammy(function(){

        var selector = '#container';

        this.get('#/' , function(){
            controller.loadGuestHome(selector);
        });

        this.get('#/login/' , function(){
            controller.loadLogin(selector);
        });

        this.get('#/register/' , function(){
            controller.loadRegister(selector);
        });

        this.get('#/userHome/' , function(){
            var user = {
                username: sessionStorage.username,
                fullname: sessionStorage.fullName
            };
            controller.loadUserHome(selector, user);
        });

        this.get('#/register/' , function(){
            controller.loadRegister(selector);
        });

        this.get('#/office/' , function(){
            controller.loadAllNotes(selector);
        });

        this.get('#/addNote/' , function(){
            controller.loadAddNote(selector);
        });

        this.get('#/myNotes/' , function(){
            controller.loadMyNotes(selector);
        });

        this.get('#/delete/' , function(){
            controller.loadDelete(selector);
        });

        this.get('#/edit/' , function(){
            controller.loadEdit(selector);
        });

    });

    app.router.run('#/')
}());