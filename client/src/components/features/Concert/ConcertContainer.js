import { connect } from 'react-redux';
import { getSeats, loadSeats } from '../../../redux/seatsRedux';
import Concert from './Concert';

const mapStateToProps = state => ({
  seats: getSeats(state)
});

const mapDispatchToProps = dispatch => ({
  loadSeatsData: (seats) => dispatch(loadSeats(seats))
});

export default connect(mapStateToProps, mapDispatchToProps)(Concert);