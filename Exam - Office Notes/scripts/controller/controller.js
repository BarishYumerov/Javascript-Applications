var app = app || {};

app.controller = (function(){

    function Controller(model){
        this.model = model;
    }

    Controller.prototype.loadGuestHome = function(selector){
        app.guestHomeView.render(selector);
    };

    Controller.prototype.loadLogin = function(selector){
        app.loginView.render(selector);
        this.attachEventListeners(selector);
    };

    Controller.prototype.loadRegister = function(selector){
        app.registerView.render(selector);
        this.attachEventListeners(selector);
    };

    Controller.prototype.loadUserHome = function(selector, user){
            app.menuView.render(selector);
            app.homeView.render(selector, user);
            this.attachEventListeners(selector);
    };

    Controller.prototype.loadAllNotes = function(selector){ //късно видях че трябва да се зареждат днешните аз зареждам всичките :/
        var _this = this;
        $(selector).empty();
        app.addUlView.render(selector);
        this.model.noteModel.getAllNotes()
            .then(function(data){
                data.results.forEach(function(note){
                        var authorId = note.user.objectId;
                        _this.model.userModel.getUser(authorId)
                            .then(function(user){
                                var noteInfo = {
                                    title: note.title,
                                    author: user.fullName,
                                    text: note.text,
                                    deadLine: note.deadLine
                                };
                                app.allNotesView.render(".listItems", noteInfo);
                            }, function(err){console.log(err.responseText)})

                });

            },
        function(err){console.log(err); $.notify("Could not load notes", "error");})
        app.menuView.render(selector);
        this.attachEventListeners(selector);
    };

    Controller.prototype.loadAddNote = function(selector){
        app.addNoteView.render(selector);
        app.menuView.render(selector);
        this.attachEventListeners(selector);
    };

    Controller.prototype.loadMyNotes = function(selector){
        var _this = this;
        $(selector).empty();
        app.addUlView.render(selector);
        this.model.noteModel.getAllNotes()
            .then(function(data){
                data.results.forEach(function(note){
                    if(note.user.objectId == sessionStorage.userId){
                        var info = {
                            text : note.text,
                            title: note.title,
                            deadLine: note.deadLine,
                            author: sessionStorage.fullName,
                            id : note.objectId
                        };
                        app.myNotesView.render('.listItems', info);
                    }
                });
            }, function(err){console.log(err.responseText);  $.notify("Could not load notes", "error"); })
        app.menuView.render(selector);
        this.attachEventListeners(selector);
    };

    Controller.prototype.loadDelete = function(selector){
        app.menuView.render(selector);
        this.attachEventListeners(selector);
    };

    Controller.prototype.loadEdit = function(selector){
        app.menuView.render(selector);
        this.attachEventListeners(selector);
    };



    Controller.prototype.attachEventListeners = function(selector){
        $(selector).unbind();
        this.attachLogoutEventHandler(selector);
        this.registerEventHandler(selector);
        this.attachLoginEventHandler(selector);
        this.attachAddNoteEventListener(selector);
        this.attachDeleteNoteEventListener(selector);
        this.attachDeleteButtonEventListener(selector);
        this.attachEditNoteEventListener(selector);
        this.attachEditButtonEventListener(selector);
    };


    Controller.prototype.registerEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#registerButton', function(){

            var userData = {
                username: $('#username').val(),
                password: $('#password').val(),
                fullName: $('#fullName').val()
            };
            _this.model.userModel.register(userData)
                .then(function(data){
                    $.notify("Registration successfull", "success");
                    _this.loadLogin(selector);
                }, function(err){
                    $.notify("Registration error", "error");
                    console.log(err.responseText);
                })
        });
    };

    Controller.prototype.attachLoginEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#loginButton', function(){
            var username = $('#username').val();
            var password = $('#password').val();
            _this.model.userModel.login(username, password)
                .then(
                function(data){
                    $.notify("Successfully logged in", "success");
                    sessionStorage.sessionToken = data.sessionToken;
                    sessionStorage.userId = data.objectId;
                    sessionStorage.username = data.username;
                    sessionStorage.fullName = data.fullName;
                    var user = {
                        username: sessionStorage.username,
                        fullName: sessionStorage.fullName
                    };
                    _this.loadUserHome(selector, user);
                },
                function(err){
                    console.log(err.responseText);
                    $.notify("Invalid login", "error");
                    app.router.setLocation('#/login/')
                }
            )
        })
    };

    Controller.prototype.attachLogoutEventHandler = function(selector){
        var _this = this;
        $('#wrapper').unbind();
        $('#wrapper').on('click', '#logout', function(){
            _this.model.userModel.logout()
                .then(function(data){
                    console.log(data);
                    sessionStorage.clear();
                    $.notify("Successfully logged out", "success");
                },
                function(err){console.log(err.responseText)})
        });
    };

    Controller.prototype.attachAddNoteEventListener = function(selector){
        var _this = this;
        $(selector).on('click', '#addNoteButton', function(){
            var title = $('#title').val();
            var text = $('#text').val();
            var deadLine = $('#deadline').val();
            var userId = sessionStorage.userId;
            var acl = {};
            acl[userId] = {"read":true, "write":true};
            acl["*"] = {"read":true};
            console.log(acl);
            var data = {
                title: title,
                text: text,
                deadLine: deadLine,
                user : {"__type":"Pointer","className":"_User","objectId": userId},

                ACL: acl

            };
            _this.model.noteModel.addNote(data)
                .then(function(data){
                    $.notify("Successfully added note", "success");
                    console.log(data);
                    app.router.setLocation('#/myNotes/');
                }, function(err){console.log(err.responseText); $.notify("Could not add note", "error"); })

        })
    };

    Controller.prototype.attachDeleteNoteEventListener = function(selector){
        $(selector).on('click', '.delete', function(ev){
            sessionStorage.deleteNoteId = ev.target.parentNode.getAttribute("data-id");
            var title = ev.target.parentNode.children[0].children[0].innerHTML;
            var text = ev.target.parentNode.children[0].children[1].innerHTML;
            var deadLine = ev.target.parentNode.children[0].children[3].innerHTML;
            var deleteInfo = {
                title: title,
                text: text,
                deadLine: deadLine
            };
            app.deleteNoteView.render(selector,deleteInfo);
            app.router.setLocation('#/delete/');
        })
    };

    Controller.prototype.attachDeleteButtonEventListener = function(selector){
        var _this = this;
        $(selector).on('click', '#deleteNoteButton', function(){
            _this.model.noteModel.deleteNote(sessionStorage.deleteNoteId).
                then(function(data){
                    console.log(data);
                    $.notify("Note deleted successfully", "success");
                    _this.loadMyNotes(selector);
                }, function(err){console.log(err.responseText); $.notify("Note have not been deleted", "error");})
        })
    };

    Controller.prototype.attachEditNoteEventListener = function(selector){
        $(selector).on('click', '.edit', function(ev){
            sessionStorage.editNoteId = ev.target.parentNode.getAttribute("data-id");
            console.log(sessionStorage.editNoteId);
            var title = ev.target.parentNode.children[0].children[0].innerHTML;
            var text = ev.target.parentNode.children[0].children[1].innerHTML;
            var deadLine = ev.target.parentNode.children[0].children[3].innerHTML;
            var deleteInfo = {
                title: title,
                text: text,
                deadLine: deadLine
            };
            app.router.setLocation('#/edit/');
            app.editNoteView.render(selector,deleteInfo);
        })
    };

    Controller.prototype.attachEditButtonEventListener = function(selector){
        var _this = this;
        $(selector).on('click', '#editNoteButton', function(){
            var data = {
                title : $('#title').val(),
                text: $('#text').val(),
                deadLine: $('#deadline').val()
            };
            _this.model.noteModel.editNote(sessionStorage.editNoteId, data).
                then(function(data){
                    console.log(data);
                    $.notify("Note edited successfully", "success");
                    _this.loadMyNotes(selector);
                }, function(err){console.log(err.responseText); $.notify("Note have not been edited", "error");})
        })
    };


    return {
        load: function(model){
            return new Controller(model);
        }
    }
}());