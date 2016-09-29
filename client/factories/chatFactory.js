myApp.factory('chatFactory', function($http){

	var factory = {}
	var _avgRating;
	var _allConvos;
	var _allChats;


	// Gets _avgRating if exists; otherwise, calculates it
	factory.getAvgRating = function(customerid, callback) {
		if (!_avgRating) {
			factory.ComputeAvgRating(customerid, function(avgrating) {
				_avgRating = avgrating
				callback(_avgRating)
			})
		} else {
			callback(_avgRating)	
		}
	}

	factory.getAllChats = function(customerid, callback){
		$http.get('/chats/' + customerid).then(function(data){
			callback(data.data);
		});
	}

	factory.getAllConversations = function(customerid, callback){
		if (!_allConvos){
			$http.get('/conversations/' + customerid).then(function(data){
				_allConvos = data.data
				callback(_allConvos);
			});
		} else {
			callback(_allConvos)
		}
	}

	factory.ComputeAvgRating = function(customerid, callback) {
		factory.getAllConversations(customerid, function(convos) {
			var ratings = []
			var ratingSum = 0;
			for (var i=0; i<convos.length; i++) {
				if (convos[i].rating) {
					ratings.push(convos[i].rating)
					ratingSum += convos[i].rating
				}
			}
			callback(
				// round avgrating to nearest hundredth
				Number(Math.round(((ratingSum/ratings.length) +'e2'))+'e-2')
			)
		})
	}

	factory.addChat = function(chat){
		$http.post('/chats', info).then(function(data){
			if(data.error){
				console.log('there was a problem writing to the db');
			}
		})
	}

	return factory;
})