const API_KEY = "d308530a1c88c4f3109f94c46709d291";


const requests = {
fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
fetchTVShows: `/tv/popular?api_key=${API_KEY}&language=en-US`,

};


export default requests;