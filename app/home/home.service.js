angular.module('sample.home')
    .factory('HomeService', ['$resource', function ($resource) {
        var HomeServiceResource = $resource('/', {}, {
            getUsers: {method: 'GET', url: HOST + '/get_users'},
            setUser: {method: 'POST', url: HOST + '/set_user/:id'}
        });

        function HomeService() {}

        HomeService.prototype.getUsers = function (query, cb) {
            return HomeServiceResource.getUsers(query, function (res) {
                return cb(res.error, res.data);
            });
        };

        HomeService.prototype.setUser = function (query, cb) {
            return HomeServiceResource.setUser({id: query._id}, {user: query}, function (res) {
                return cb(res.error, res.data);
            });
        };

        return new HomeService();
}]);
