$(document).ready(function() {

//Initialize soundcloud api
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
      console.log(songs.length);
        if (songs.length === 0 ) {
          $('#artistResults').append('<div class="alert alert-danger noArtist" role="alert">No artist found for that name, please try again.</div>');
          //return name;
        }
        var random = Math.floor((Math.random() * songs.length) + 1);
          var track_url = songs[random].permalink_url;
          SC.oEmbed(track_url, { auto_play: true }).then(function(song) {
            document.getElementById('player').innerHTML= song.html;
            //return name;
          }).
            then(function() {
              player(songs, nextSong, prevSong, randomCache);

                //nextSong(name, songs, prevSong);

                //prevSong(nextSong, songs, randomCache);

            });
        $('#artistResults').append(songs[random].title);
    });
};


//function to get previous song
function prevSong(songs, randomCache) {
  console.log(songs);
  //console.log(randomCache);


    /*
    lastSongIndex = songsArray.pop();
    var track_url = songs[random].permalink_url;
    SC.oEmbed(track_url, { auto_play: true }).then(function(song) {
    document.getElementById('player').innerHTML= song.html;
    })
    */


};

function createRandomArray(randomCache, random){

  //check to see if random is
  randomCache.push(random);

  return randomCache;
};

//function to find another random song
function nextSong(songs, prevSong) {

//Set a click event to happen on next icon
//  $("#next").click(function() {
  if ($("artistName").val('') === true){ alert('search for an artist first to use this'); return;}
  //find another random song
  var random = Math.floor((Math.random() * songs.length) + 1);
  var track_url = songs[random].permalink_url;
    SC.oEmbed(track_url, { auto_play: true }).then(function(song) {
    document.getElementById('player').innerHTML= song.html;
    })
    //append new track title
    $("#artistResults").html('');
    $('#artistResults').append(songs[random].title);


    var times = createRandomArray(randomCache, random);
    var clicked = 0;
    console.log(times);
    $("#prev").click(function() {
      clicked++;
     prevSong(times);
    });
    //function prevSong(songs, times);
    //prevSong(songs, times);

    //return times();
  //});
};


function player(songs, nextSong, prevSongs, arr) {
  $("#next").click(function() {

    nextSong(songs, function(times) {
      console.log('callbacked');
      console.log(times);
      lastSongIndex = times[times.length - 2];   //[times.length - 1];
      console.log(lastSongIndex);
      var track_url = songs[lastSongIndex].permalink_url;
      SC.oEmbed(track_url, { auto_play: true }).then(function(song) {
      document.getElementById('player').innerHTML= song.html;
      })
    });


    //console.log(randomSet);
  });
};

//Get an artist's tracks using oEmbed
function getTracks () {
  //var artistName = $("#artistName").val()

//Jquery way
/*
var url = 'https://api.soundcloud.com/tracks?q=jahosh&client_id=4eacd88faf146f5c09eb7bf3254cbb67';
$.getJSON(url, function(tracks) {
  console.log(tracks);
})
*/
}

//clear input after submit
function clearInputs() {
  $("#artistName").val('');
  $("#artistResults").html('');
}

/*
//if user clicks on a possible match, change artist
function changeArtist() {
  $("#userLink").click(function() {
    var txt = $("#artistResults li").text();
    console.log(txt);
  });
}

changeArtist();

*/
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
  //clearInputs();
});
});
