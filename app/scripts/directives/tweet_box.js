angular.module('kanjouMapApp')
    .directive('tweetBox', function(){
	return {
	    scope: true,
	    templateUrl: "/views/partials/tweet-box.html",
	    controller: function($scope, colors){
		$scope.currentTweets = [];
		$scope.tweets = {};
		function blankTweets(){
		    $scope.tweets = {};
		    _.each(colors.colorKeys, function(emotion){
			$scope.tweets[emotion] = [];
		    });		    
		}
		blankTweets();
		
		$scope.organizeTweets = function(){
		    console.debug("organizing");
		    _.each($scope.data, function(item){
			var strongest = colors.getStrongest(item.kanjoData);
			var key = colors.getEmotionName(strongest, item.kanjoData[strongest]);
			$scope.tweets[key].push({_id: item._id,
						 name: item.name, 
						 text: item.text, 
						 profile_pic: item.profile_pic,
						 value: Math.abs(item.kanjoData[strongest])});			
		    });
		    _.each(colors.colorKeys, function(emotion){
			$scope.tweets[emotion] = _.sortBy($scope.tweets[emotion], 
							  function(tweet){
							      return tweet._id;
							  });			
		    });
		    $scope.$broadcast("tweetChange");
		}
		$scope.$on("dataBlank", blankTweets);
		$scope.$on("dataRefreshed", $scope.organizeTweets);
		$scope.$watch("currentEmotion", function(newEmotion){
		    $scope.currentTweets = $scope.tweets[newEmotion];
		});
		$scope.$on("tweetChange", function(){
		    $scope.currentTweets = $scope.tweets[$scope.currentEmotion];
		});
		$scope.currentTweets = $scope.tweets[$scope.currentEmotion];
		if($scope.started){
		    $scope.organizeTweets();
		}
	    }
	};
    });
