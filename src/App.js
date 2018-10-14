import React, { Component } from 'react';
import './App.css';
import { fetchMovies, fetchMovieDetails, fetchMovieReviews } from './rotten';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      movieClicked: false,
      movieName: '',
      movieImgUri: ''
    }
  }

  componentDidMount() {
    fetchMovies()
    .then(result => {
      this.setState({
        data: result,
      });
      console.log('this.state.data: ', this.state.data);
    });
  }

  handleMovieClick = id => {
    this.setState({
      movieClicked: true,
      movieName: this.state.data.filter(item => item.id === id)[0].title,
      movieImgUri: this.state.data.filter(item => item.id === id)[0].posters.primary,
      movieDesc: this.state.data.filter(item => item.id === id)[0].synopsis,
    });

  };

  handleBack = () => {
    this.setState({
      movieClicked: false,
    });
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
        <div className="List-wrap fade">
          {this.state.data.map((item) => <div>
            <button onClick={() => this.handleMovieClick(item.id)} className="Movie-item">{item.title}</button>
          </div>)}
        </div> :
        <div className={this.state.movieClicked && 'fade'}>
          <div className="Movie-img">
            <img src={this.state.movieImgUri} alt=""/>
          </div>
          <div className="Movie-info">
            <div className="Movie-name">{this.state.movieName}</div>
            <div className="Movie-desc">{this.state.movieDesc}</div>
          </div>
        </div> :
        <p>Sorry, no data</p>}
        <div>
          <p>{this.state.movieName}</p>
        </div>
      </div>
    );
  }
}

export default App;
