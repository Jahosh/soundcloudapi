var SoundCloudAudio = require('soundcloud-audio');
/**
* GET /
* Contact page.
*/
exports.index = function(req, res) {
  res.render('contact', {
    title: 'test'
  });
};
