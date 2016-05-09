$(document).ready(function() {

//init sc api
SC.initialize({
  client_id: '4eacd88faf146f5c09eb7bf3254cbb67'
});

//Fetch latest from user:jahosh as default
var track_url = 'https://soundcloud.com/jahosh';
SC.oEmbed(track_url, { auto_play: false }).then(function(song) {
  document.getElementById('player').innerHTML = song.html;
});


var randomCache = [];
//Search SC for artist by permalink returns a promise
function findSongs() {
  var name = $("#artistName").val();
  SC.get('/tracks', {
    q: name, limit: 50, offset: 0
  }).
    then(function(songs) {
      checkSongsLength(songs);
      return songs;
    }).
      then(function(songs) {
        var random = Math.floor((Math.random() * songs.length) + 1);
        var track_url = songs[random].permalink_url;
        SC.oEmbed(track_url, { auto_play: true }).then(function(song) {
          document.getElementById('player').innerHTML= song.html;
            return songs;
        }).
          catch(function(error) {
            console.log(error);
            alert('Error: ' + error.message);
          });
        return songs;
    }).
      then(function(songs) {
        player(songs, nextSong, randomCache);
        return songs;
    }).
      catch(function(error) {
        alert(error.message);
        console.log(error);
      });
  };

function checkSongsLength (songs) {
    if (songs.length === 0 ) {
      $('#artistResults').append('<div class="alert alert-danger noArtist" role="alert">No artist found for that name, please try again.</div>');
      return;
    }
    //return songs;
};

  function createRandomArray(randomCache, random){
    //check to see if random is
    randomCache.push(random);
    return randomCache;
  };

  //function to find another random song
  function nextSong(songs, prevSong) {

    if ($("artistName").val('') === true){
      alert('search for an artist first to use this');
      return;
    };
    var random = Math.floor((Math.random() * songs.length) + 1);
    var track_url = songs[random].permalink_url;
      SC.oEmbed(track_url, { auto_play: true }).then(function(song) {
      document.getElementById('player').innerHTML= song.html;
      return songs;
      }).
        then(function(songs) {
          return songs
      }).
        catch(function(error) {
          console.log(error);
          if (error.status === 403 ) {
            $('#artistResults').append('<div class="alert alert-danger noArtist" role="alert">Private song, please try again.</div>');
          }
        });

    //append new track title
    $("#artistResults").html('');
    $('#artistResults').append(songs[random].title);

    var times = createRandomArray(randomCache, random);
    var clicked = 0;

    $("#prev").click(function() {
      clicked++;
     prevSong(songs, times);
    });
  };

  function player(songs, nextSong, arr) {
    $("#next").click(function() {
      nextSong(songs, function(songs, times) {
        console.log('callbacked');
        console.log(times);
        lastSongIndex = times[times.length - 2];
        console.log(lastSongIndex);
        var track_url = songs[lastSongIndex].permalink_url;
        SC.oEmbed(track_url, { auto_play: true }).then(function(song) {
          document.getElementById('player').innerHTML = song.html;
          $("#artistResults").html('');
          $('#artistResults').append(songs[lastSongIndex].title);
        })
      });
    });
  };

  //clear input after submit
  function clearInputs() {
    $("#artistName").val('');
    $("#artistResults").html('');
  };

  $("#artistName").keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      //clear previous errors if any
      $("#artistResults").html('').removeClass('alert alert-danger');
      if ($("#artistName").val() === '') {
        $("#artistResults").text('please enter an artist name').addClass('alert alert-danger');
        return;
      }
    findSongs();
    }
  });

  //click event handler
  $("#searchButton").click(function(e) {
    e.preventDefault();
    //clear previous errors if any
    $("#artistResults").html('').removeClass('alert alert-danger');
    if ($("#artistName").val() === '') {
      $("#artistResults").text('please enter an artist name').addClass('alert alert-danger');
      return;
    }
    findSongs();
  });
});
