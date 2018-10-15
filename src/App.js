import React, { Component } from 'react';
import './App.css';
import { fetchMovies, fetchMovieDetails, fetchMovieReviews } from './rotten';
class App extends Component {
  defaultState = {
    movieClicked: false,
    movieName: '',
    movieImgUri: '',
    movieDesc: '',
    movieDetail: null,
    ratingTomato: null,
    ratingAudience: null
  };
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetchMovies()
    .then(result => {
      this.setState({
        data: result,
      });
    });
  }
  handleMovieClick = id => {
    fetchMovieDetails(id)
    .then(result => {
      this.setState({
        movieDetail: result,
        ratingTomato: result.ratings.critics_score,
        ratingAudience: result.ratings.audience_score,
      });
      console.log(result);
    });
    this.setState({
      movieClicked: true,
      movieName: this.state.data.filter(item => item.id === id)[0].title,
      movieImgUri: this.state.data.filter(item => item.id === id)[0].posters.primary,
      movieDesc: this.state.data.filter(item => item.id === id)[0].synopsis.replace(/<\/?[^>]+(>|$)/g, ""),
    });
  };
  handleBack = () => {
    this.setState(this.defaultState);
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.movieClicked ? <button onClick={this.handleBack} className="Back-btn">back</button> : null}
          <p>
              {this.state.movieName ? this.state.movieName : 'Top Movies'}
          </p>
        </header>
        {this.state.data.length ? !this.state.movieClicked ?
        <div className="List-wrap">
          {this.state.data.map((item) => <div>
            <button onClick={() => this.handleMovieClick(item.id)} className="Movie-item">{item.title}</button>
          </div>)}
        </div> :
        <div className="Movie-detail">
          <div className="Movie-img">
            <img src={this.state.movieImgUri} alt=""/>
          </div>
          <div className="Movie-info">
            <div className="Movie-name">{this.state.movieName}</div>
            <div className="Movie-rating">
              <div className="Rating">{this.state.ratingTomato}</div>
              <div className="Rating">{this.state.ratingAudience}</div>
            </div>
            <div className="Movie-desc">{this.state.movieDesc}</div>
          </div>
        </div> :
        <p>THIS IS LOADING</p>}
        <div>
          <p>{this.state.movieName}</p>
        </div>
      </div>
    );
  }
}
export default App;
