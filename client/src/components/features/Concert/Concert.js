import React from 'react';
import { Row, Col } from 'reactstrap';
import io from 'socket.io-client';

import './Concert.scss';

class Concert extends React.Component {
  componentDidMount() {
    const { loadSeatsData } = this.props;
    this.socket = io.connect(process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8000', {
      transports: ['websocket'],
    });
    this.socket.on('seatsUpdated', (seats) => loadSeatsData(seats));
  };

  handleSeats = () => {
    const { seatsCount, seats } = this.props;
    if (seats.length !== 0) return 50-seats.length;
    else if (!seatsCount) return '50'
    else return 50-seatsCount;
  };

  render() {
    const { performer, price, day } = this.props;
    const { handleSeats } = this;

    return (
      <article className="concert">
      <Row noGutters>
        <Col xs="6">
          <div className="concert__image-container">
            <img className="concert__image-container__img" src={performer.image} alt={performer}/>
          </div>
        </Col>
        <Col xs="6">
          <div className="concert__info">
            <img className="concert__info__back" src={performer.image} alt={performer}/>
            <h2 className="concert__info__performer">{ performer.name }</h2>
            <h3 className="concert__info__genre">{ performer.genre }</h3>
            <p className="concert__info__tickets">Only {handleSeats()} tickets left!</p>
            <p className="concert__info__day-n-price">Day: {day}, Price: { price }$</p>
          </div>
        </Col>
      </Row>
    </article>
    )
  }
}

export default Concert;