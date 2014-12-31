'use strict';

app.factory('Profile', function ($window, FIREBASE_URL, $firebase, Post, $q) {
  var ref = new $window.Firebase(FIREBASE_URL);

  var profile = {
    get: function (userid){
      return $firebase(ref.child('profile').child(userid)).$asObject();
    },
    getPosts: function (userid) {
      var defer = $q.defer();

      $firebase(ref.child('user_posts').child(userid)).$asArray().$loaded().then(function (data) {
        var posts = {};

        for(var i = 0; i < data.length; i++){
          var value = data[i].$value;
          posts[value] = Post.get(value);
        }
        defer.resolve(posts);
      });

      return defer.promise;
    }
  };

  return profile;
});
