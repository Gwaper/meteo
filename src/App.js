import React, { Component } from 'react';
import './App.css';

const APIKey = 'RoHmJrMrbbo7p1SvsLfA2reOGUOQfi5F';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      long: 0,
      data: undefined,
      meteo: undefined
    }
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({lat: parseFloat(pos.coords.latitude.toFixed(3)), long: parseFloat(pos.coords.longitude.toFixed(3))});
      fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${APIKey}&q=${this.state.lat}%2C%20${this.state.long}`)
      .then(res => res.json())
      .then(data => {
        this.setState({data: data});
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.data.Key}?apikey=${APIKey}&language=fr-FR&metric=true`)
        .then(res => res.json())
        .then(data => this.setState({meteo: data}))
      })
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.meteo ? this.state.meteo.DailyForecasts[0].Day.IconPhrase : ''}</h1>
      </div>
    );
  }
}

export default App;
