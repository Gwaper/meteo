import React, { Component } from 'react';

class Meteo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='meteoDisplay'>
        <h3>{this.props.phrase}</h3>
        <img src={this.props.icon} width='100'/>
        <p><strong>{this.props.max} °C</strong> / {this.props.min} °C</p>
        <hr />
      </div>
    )
  }
}

export default Meteo