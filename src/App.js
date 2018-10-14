import React, { Component } from 'react';
import './App.css';
import { fetchMovies, fetchMovieDetails, fetchMovieReviews } from './rotten';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Top Movies
          </p>
        </header>
        {this.state.data.length ?
        <div className="List-wrap">
          {this.state.data.map((item) => <div>
            <a href="#" key={item.id} className="Movie-item">{item.title}</a>
          </div>)}
        </div> : <p>Sorry, no data</p>}
      </div>
    );
  }
}

export default App;
