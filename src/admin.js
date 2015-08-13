(function(angular){
  'use strict';
  /**
   * CmsAdmin class
   * @name CmsAdmin
   * @description
   *
   *
   */
  function CmsAdmin (serverUrl) {
    this.serverUrl = serverUrl;
  }

  /**
   * @ngdoc module
   * @name cmsAdmin
   */
  var cmsAdminModule = angular.module('cmsAdmin', []);

  /**
   * @ngdoc provider
   * @name cmsAdminProvider
   * @description
   *
   *
   */
  cmsAdminModule.provider('cmsAdmin',[function() {
    var serverUrl = null;
    this.serverUrl = function(url) {
      serverUrl = url;
    };
    this.$get = [function CmsFactory() {
      return new CmsAdmin(serverUrl);
    }];
  }]);

  /**
   * @ngdoc run
   * @name cmsAdmin
   * @description
   *
   *
   */
  // cmsAdminModule.run(['cmsAdminService', '$log', function (cmsAdminService, $log) {
    // cmsAdmin.init().then(function(content){
      // $log.debug("CMS Admin Init", content);
    // });
  // }]);

  /**
   * @ngdoc service
   * @name cmsAdmin.cmsAdmin
   * @description
   *
   *
   */
  cmsAdminModule.service('$cmsAdmin', ['cmsAdmin', '$q', '$http', function (cmsAdmin, $q, $http){

    var _self = function(requestObject) {
        return updateModel({
          auth: requestObject.auth,
          action: requestObject.action,
          path: requestObject.path,
          params: requestObject.params
        });
    };

    function updateModel(requestObject){
      var deferred = $q.defer();
      $http.post('/admin', requestObject).
        then(function(response) {
          // var status = response.status;
          // var data = response.data;
          deferred.resolve(response.data);
        }, function(response) {
          // var data = response.data || "Request failed";
          // var status = response.status;
          deferred.reject(response.status);
      });
      return deferred.promise;
    }

    return _self;
  }]);

})(window.angular);
