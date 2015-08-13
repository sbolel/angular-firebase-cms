(function(angular, Firebase){
    'use strict';
  /**
   * CmsClient class
   * @name CmsClient
   * @description
   *
   *
   */
  function CmsClient (url) {
    this.firebaseUrl = url;
  }

  /**
   * @ngdoc module
   * @name $cms.client
   */
  var cmsClientModule = angular.module('cmsClient', []);

  /**
   * @ngdoc provider
   * @name cmsClientProvider
   * @description
   *
   *
   */
  cmsClientModule.provider('cmsClient',[function() {
    var firebaseUrl = null;
    this.setContentUrl = function(url) {
      firebaseUrl = url;
    };
    this.$get = [function CmsClientFactory() {
      return new CmsClient(firebaseUrl);
    }];
  }]);

  /**
   * @ngdoc run
   * @name cmsClient
   * @description
   *
   *
   */
  cmsClientModule.run(['$cmsClient', '$log', function ($cmsClient, $log) {
    $cmsClient.init().then(function(content){
      $log.debug('CMS Content:', content);
    });
  }]);

  /**
   * @ngdoc service
   * @name cmsClient.cmsClient
   * @description
   *
   *
   */
  cmsClientModule.service('$cmsClient', ['cmsClient', '$q', function (cmsClient, $q){
    var _firebaseRef,
        _contentPromise = $q.defer(),
        _contentData = _contentPromise.promise,
        _config = {
          autoDisconnect: true,
          bindContent: false
        },
        _self = {
          init: function(){
            return initalize();
          },
          getContent: function(){
            return _contentData;
          },
          setContent: function(contentObject){
            _contentPromise.resolve(contentObject);
            return _contentData;
          },
          autoDisconnect: function(boolean){
            _config.autoDisconnect = boolean;
          }
        };

    // start cmsClient
    function initalize() {
      var deferred = $q.defer();
      assertConnection();
      downloadContent(_firebaseRef).then(function(snapshot){
        assertAutoDisconnect();
        _self.setContent(snapshot.val()).then(function(){
          deferred.resolve(_contentData);
        });
      }).catch(function(error){
        assertAutoDisconnect();
        deferred.reject(error);
      });
      return deferred.promise;
    }

    // download CMS data from firebaseRef
    function downloadContent(appRef){
      var deferred = $q.defer();
      appRef.once('value', function(dataSnapshot) {
        if(dataSnapshot.exists()){
          _self.setContent(dataSnapshot.val());
          deferred.resolve(dataSnapshot);
        } else {
          deferred.reject('malformed data');
        }
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function assertConnection(){
      if (!_firebaseRef) {
        _firebaseRef = new Firebase(cmsClient.firebaseUrl);
      }
      Firebase.goOnline();
    }

    function assertAutoDisconnect(){
      if(_config.autoDisconnect === true){
        Firebase.goOffline();
        _firebaseRef = null;
        Firebase.goOnline();
      }
    }

    return _self;
  }]);

})(window.angular, window.Firebase);