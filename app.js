var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' + '<a class="js-result-name" href="" target="_blank"></a></h2>' +
    '<h2>' + '<a class="js-thumb" href="" target="_blank"></a></h2>' +
  '</div>'
);
function getDataFromApi(searchTerm, callback) {
  var query = {
    q: searchTerm + " in:name",
    per_page: 5,
    page: 1,
    key: 'AIzaSyAnX1fcvvyFZymT1-k66pzVrPzQmnUkDSA',
    part: 'snippet'
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").text(result.snippet.title).attr("href");
  return template;
}

function displayYouTubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
