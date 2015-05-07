var app = app || {};

app.userModel = (function(){
    function User(requester){
        this.requester = requester;
    }

    User.prototype.register = function(data){
        return this.requester.post('users', data);
    };

    User.prototype.login = function(username, password){
          return this.requester.get('login?username=' + username + '&password=' + password);
    };

    User.prototype.logout = function(){
        return this.requester.post('logout');
    };

    User.prototype.getUser = function(id){
        return this.requester.get('users/' + id);
    };

    User.prototype.editUser = function(id, data){
        return this.requester.put('users/' + id, data)
    };

    return {
        load: function(requester){
            return new User(requester);
        }
    }
}());