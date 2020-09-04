import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const {
      data : {
        data : { movies },
      },
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading: false });
    // movies = api
    // setState( {movies : movies.data.data.movies });
    // ES6에서는 setState {movies} 박으면 객체의 키와 대입할 변수의 이름이 같다면 코드를 축약할 수 있어요
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state; // 인강들으면서 설명 듣기
    return (
    <section className="container">{isLoading ? (
      <div className="loader">
        <span className = "loader__text">'Loading...'</span>
      </div>
      ) : (
      <div className = "movies">
        {movies.map(movie => (
    <Movie
      key = {movie.id}
      id = {movie.id} 
      year = {movie.year}
      title = {movie.title} 
      summary = {movie.summary}
      poster = {movie.medium_cover_image}
      genres = {movie.genres}
    />
    ))}
    </div>
    )}
    </section>
    );
  }
}

export default Home;