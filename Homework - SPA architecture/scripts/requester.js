var app = app || {};

app.requester = (function(){

    function Requester(){

    }

    Requester.prototype.request = function(method, url, data){

        var deffer = Q.defer();

        $.ajax({
            method: method,
            headers: {
                'X-Parse-Application-Id': 'GfYiY854xyggHiwHi2jKLyleI611tUWmBLolNBhT',
                'X-Parse-REST-API-Key': 'pApjnJJCoat3RvH05V5dljFbCpYn0U5FufF0pgUJ'
            },
            url: url,
            data: JSON.stringify(data),
            success: function (data) {
                deffer.resolve(data);
            },
            error: function (error) {
                deffer.reject(error);
            }
        });

        return deffer.promise;
    };

    return{
        load: function(){
            return new Requester();
        }
    }
}());