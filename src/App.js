import React, { Component } from 'react';
import Meteo from './components/Meteo'
import APIKey from './API.js';
import { Header, Icon, Card } from 'semantic-ui-react';
import './App.css';

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
      <div className='App'>
        <Header as='h2' className='title'>
          <Icon name='adjust' />
          <Header.Content>
            {this.state.meteos ? this.state.data.EnglishName : ''}
            <Header.Subheader>{this.state.meteos ? this.state.data.Country.EnglishName : ''}</Header.Subheader>
          </Header.Content>
        </Header>
        <Card.Group className='cards'>
          {this.state.meteos ? this.state.meteos.DailyForecasts.map((meteo, index) => {
            return <Meteo
              key={index}
              phrase={meteo.Day.IconPhrase}
              date={meteo.Date}
              min={Math.round(meteo.Temperature.Minimum.Value)}
              max={Math.round(meteo.Temperature.Maximum.Value)}
              icon={`https://vortex.accuweather.com/adc2010/images/slate/icons/${meteo.Day.Icon}.svg`}
            />
          }) : ''}
        </Card.Group>
      </div>
    );
  }
}

export default App;

