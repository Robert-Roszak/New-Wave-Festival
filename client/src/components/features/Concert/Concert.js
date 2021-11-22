import React from 'react';
import { Row, Col } from 'reactstrap';

import './Concert.scss';

const handleSeats = (seats) => {
  if (!seats) return '50'
  else return 50-seats;
};

const Concert = ({ performer, price, day, seatsCount }) => (
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
          <p className="concert__info__tickets">Only {handleSeats(seatsCount)} tickets left!</p>
          <p className="concert__info__day-n-price">Day: {day}, Price: { price }$</p>
        </div>
      </Col>
    </Row>
  </article>
);

export default Concert;