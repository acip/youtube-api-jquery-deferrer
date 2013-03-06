var isVideoApiReady = $.Deferred( function (deferred) {
      //console.log('loading yt script and get api ready');

      var initVideosApi = $.Deferred( function (deferred) {

            $.when(
                    //wait for script to load
                    $.getScript( 'http:' + '//s.ytimg.com/yts/jsbin/www-widgetapi-vflXiNhG3.js'),
                    //wait for DOM to be ready
                    $.Deferred(
                        function( deferred ) {
                            $( deferred.resolve );
                        }
                    )
            ).done( function() {
                //dom and youtube api are ready
                //console.log('dom and youtube api are ready');
            	
                //set template for the future videos
                window.YT.embed_template = "\u003ciframe width=\"425\" height=\"344\" src=\"\" frameborder=\"0\" allowfullscreen\u003e\u003c\/iframe\u003e";

                window.videos = new playersList();

                deferred.resolve();

                return;

                function playersList() {
                    var players = {};

                    this.add = function(containerId, videoId, width, height) {
                        var options = {
                                  videoId: videoId
                        };

                        if (width != 'undefined') {
                            options.width = width;
                        }

                        if (height != 'undefined') {
                            options.height = height;
                        }

                        players[containerId] = new YT.Player(containerId, options);
                      };

                    this.stopAll = function() {
                            for (var i in players) {
                                players[i].stopVideo();
                            }
                    };
                }
            });
        });

      $.when(initVideosApi).done( function() {
          deferred.resolve();
      });
});


function addVideo(containerId, videoId, width, height) {
    var videoArguments = arguments;

    $.when(isVideoApiReady).done(function () {
         window.videos.add.apply(window.videos, videoArguments);
    });
}

function stopAllVideos() {
    $.when(isVideoApiReady).done(function () {
        videos.stopAll();
    });
}
