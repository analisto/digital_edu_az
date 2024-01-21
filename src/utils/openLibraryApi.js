// src/utils/openLibraryApi.js

const fetch = require('node-fetch'); 

const OpenLibraryApi = {
  getBookCoverUrl: (identifier, size = 'M') => {
    // Available sizes: S, M, L
    const baseUrl = 'https://covers.openlibrary.org/b';
    const url = `${baseUrl}/isbn/${identifier}-${size}.jpg`;

    return url;
  },

  getAuthorPhotoUrl: (olid, size = 'S') => {
    // Available sizes: S, M, L
    const baseUrl = 'https://covers.openlibrary.org/a';
    const url = `${baseUrl}/olid/${olid}-${size}.jpg`;

    return url;
  },

  // Additional methods for the Open Library API can be added here
};

module.exports = OpenLibraryApi;
