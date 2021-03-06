import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/fr'
import './Meteo.css';

moment.locale('fr');

class Meteo extends Component {
  render() {
    return (
      <Card className='Meteo'>
        <Card.Content>
          <Image floated='right' size='tiny' src={this.props.icon} alt={this.props.phrase} />
          <Card.Header>{this.props.phrase}</Card.Header>
          <Card.Meta>{moment(this.props.date).format('dddd')}</Card.Meta>
          <Card.Description>
            {this.props.min}° | {this.props.max}°
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default Meteo;

moment()