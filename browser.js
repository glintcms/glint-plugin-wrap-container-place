/**
 * Module dependencies.
 */
var debug = require('debug')('glint-plugin-wrap-container-place');

/**
 *  Wrap and Container _place Plugin
 *
 * adds `_place` field to the content on the server, and sets place() accordingly in the browser.
 * this plugin can be useful, if you set the place dynamically on the server e.g. depending on the request.
 * the main purpose may be to render the site on the server, when requested by a bot, search engine, crawler or the like.
 *
 */
module.exports = function (o) {
  o = o || {};
  o.place = '_place';

  plugin.api = 'wrap-container-plugin';
  function plugin(collection) {

    collection.on('pre-load', function () {
      collection.once('load', function (key, value) {
        var content = collection.content;
        if (!content || !collection.place) return;
        var contentPlace = content[o.place];
        if (contentPlace !== collection.place()) collection.place(contentPlace);
      });
    });

  }

  return plugin;

};
