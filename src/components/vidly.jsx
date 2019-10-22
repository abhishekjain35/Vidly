import React, { Component } from "react";
import { getMovies } from "../service/fakeMovieService";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import NavList from "./common/ListGroup";
import { getGenres } from "../service/fakeGenreService";
import _ from "loadsh";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Vidly extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genre" }, ...getGenres()];

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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      searchQuery,
      movies: allMovies,
      sortColumn
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: movieCount } = this.state.movies;
    const { currentPage, pageSize, sortColumn, searchQuery } = this.state;
    if (movieCount === 0) {
      return <p>There are no movies</p>;
    }
    const { totalCount, data: movies } = this.getPagedData();
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
          <Link
            to="/movies/new"
            className="btn btn-primary m-2"
            style={{ textDecoration: "none", color: "white" }}
          >
            Add Movie
          </Link>
          <p>There are {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.btnClick}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
