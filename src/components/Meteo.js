import React, { Component } from 'react';

class Meteo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className='card m-3' style={{ width: '18rem', padding:'30px 30px 0px 30px' }}>
          <img className='iconWeather' src={this.props.icon} alt={this.props.phrase} />
          <div className='card-body'>
            <h5 className='card-title'>{this.props.phrase}</h5>
            <p><strong>{this.props.max} °C</strong> / {this.props.min} °C</p>
            <p className='card-text'>Vent: {this.props.windSpeed} km/h direction {this.props.windDirection}</p>
          </div>
        </div>
    )
  }
}

export default Meteo