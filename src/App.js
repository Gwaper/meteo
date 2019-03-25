import React, { Component } from 'react';
import Meteo from './components/Meteo'
import './App.css';

const APIKey = 'RoHmJrMrbbo7p1SvsLfA2reOGUOQfi5F';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      long: 0,
      data: undefined,
      meteos: undefined
    }
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({ lat: parseFloat(pos.coords.latitude.toFixed(3)), long: parseFloat(pos.coords.longitude.toFixed(3)) });
      fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${APIKey}&q=${this.state.lat}%2C%20${this.state.long}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ data: data });
          fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.data.Key}?apikey=${APIKey}&language=fr-FR&metric=true&details=true`)
            .then(res => res.json())
            .then(data => this.setState({ meteos: data }))
        })
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className='my-3 display-2 city'>{this.state.data ? this.state.data.ParentCity.EnglishName : ''}</h1>
        <div className='container'>
          <div className='row justify-content-center'>
            {this.state.meteos ? this.state.meteos.DailyForecasts.map(meteo => {
              return <Meteo
                phrase={meteo.Day.IconPhrase}
                min={meteo.Temperature.Minimum.Value}
                max={meteo.Temperature.Maximum.Value}
                icon={`https://vortex.accuweather.com/adc2010/images/slate/icons/${meteo.Day.Icon}.svg`}
                windDirection={meteo.Day.Wind.Direction.English}
                windSpeed={meteo.Day.Wind.Speed.Value}
              />
            }) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
