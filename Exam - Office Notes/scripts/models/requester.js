var app = app || {};

app.requester = (function() {
    function Requester(baseUrl) {
        this.baseUrl = baseUrl;
    }

    function makeRequest(method, headers, url, data) {
        var deffer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
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
    }

    function getHeaders() {
        var headers = {
            'X-Parse-Application-Id' : 'xxvdPmZ90UahMfCWwMZLWBMJJxLmsKsr2in0lQfj',
            'X-Parse-REST-API-Key' : 'Hm8rwT2My1rboCcMffkO7GlQa4iI5GfQYGMl3HOt',
            'Content-Type' : 'application/json'
        };

        if(sessionStorage['sessionToken']) {
            headers['X-Parse-Session-Token'] = sessionStorage['sessionToken'];
        }

        return headers;
    }

    Requester.prototype.get = function (serviceUrl) {
        var headers = getHeaders();
        var url = this.baseUrl + serviceUrl;

        return makeRequest('GET', headers, url);
    };

    Requester.prototype.post = function (serviceUrl, data) {
        var headers = getHeaders();
        var url = this.baseUrl + serviceUrl;

        return makeRequest('POST', headers, url, data);
    };

    Requester.prototype.put = function (serviceUrl, data) {
        var headers = getHeaders();
        var url = this.baseUrl + serviceUrl;

        return makeRequest('PUT', headers, url, data);
    };

    Requester.prototype.delete = function (serviceUrl) {
        var headers = getHeaders();
        var url = this.baseUrl + serviceUrl;

        return makeRequest('DELETE', headers, url);
    };

    return {
        load: function (baseUrl) {
            return new Requester(baseUrl);
        }
    }
}());
