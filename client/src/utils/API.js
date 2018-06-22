import axios from 'axios';
require('dotenv').config();

export default {
  // gets articles from nytimes
  scrapeArticles: function(searchParams) {
    const { searchTerm, startYear, endYear } = searchParams;

    // builds the query string
    const fields = '&fl=headline,web_url,pub_date,snippet';

    // checks which values were submitted by the user to make the search
    const query =
      startYear && endYear
        ? `${searchTerm}&begin_date=${startYear}0101&end_date=${endYear}0101${fields}`
        : startYear && !endYear
          ? `${searchTerm}&begin_date=${startYear}0101${fields}`
          : !startYear && endYear
            ? `${searchTerm}&end_date=${endYear}0101${fields}`
            : searchTerm + fields;

    // performs the search
    return axios.get(
      'https://api.nytimes.com/svc/search/v2/articlesearch.json' +
        '?api-key=692c0ac9c60c42d3b04ebfdd8cf069ad&q=' +
        query
    );
  },

  // Gets all saved articles
  getSavedArticles: function() {
    return axios.get('/api/articles/');
  },

  // Saves an article
  saveArticle: function(article) {
    return axios.post('/api/articles', article);
  },

  // Deletes an article
  nukeArticle: function(id) {
    return axios.delete('/api/articles/' + id);
  }
};
