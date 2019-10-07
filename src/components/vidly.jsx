import React, { Component } from "react";
import { getMovies } from "../service/fakeMovieService";
import Like from "./common/like";

class Vidly extends Component {
  state = {
    movies: getMovies()
  };

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

  render() {
    const { length: movieCount } = this.state.movies;
    if (movieCount === 0) {
      return <p>There are no movies</p>;
    }

    return (
      <React.Fragment>
        <p>There are {movieCount} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.btnClick(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Vidly;
