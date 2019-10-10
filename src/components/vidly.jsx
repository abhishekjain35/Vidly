import React, { Component } from "react";
import { getMovies } from "../service/fakeMovieService";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable"
import { paginate } from "../utils/paginate";
import NavList from "./common/ListGroup";
import { getGenres } from "../service/fakeGenreService";

class Vidly extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: []
  };

  componentDidMount() {
    const genres = [{ _id:'',name: "All Genre" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const ind = movies.indexOf(movie);
    movies[ind] = { ...movie };
    movies[ind].liked = !movies[ind].liked;
    this.setState({ movies });
  };

  btnClick = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre , currentPage: 1 });
  };

  render() {
    const { length: movieCount } = this.state.movies;
    const {
      currentPage,
      pageSize,
      selectedGenre,
      movies: allMovies
    } = this.state;
    if (movieCount === 0) {
      return <p>There are no movies</p>;
    }

    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3 m-2">
          <NavList
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>There are {filtered.length} movies in the database</p>
          <MoviesTable movies={movies} onLike={this.handleLike} onDelete={this.btnClick} />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Vidly;
