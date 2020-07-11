import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './Profile.css';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

class SecretsPage extends Component {

  state = {
    favorites: [],
    wants: [],
    nogos: [],
  }

  // componentDidMount() {
  //   this.props.dispatch({ type: 'FETCH_FAVORITES' });
  //   this.props.dispatch({ type: "FETCH_WANT" });
  //   this.props.dispatch({ type: "FETCH_NOGOS" });
  // }

  componentDidMount() {
    axios.get(`/favorites/${this.props.user.id}`).then((response) => {
      const responseData = response.data;
      this.setState({
        favorites: responseData,
      });
    });
    axios.get(`/wants/${this.props.user.id}`).then((response) => {
      const wantData = response.data;
      this.setState({
        wants: wantData,
      });
    });
    axios.get(`/nogo/${this.props.user.id}`).then((response) => {
      const nogoData = response.data;
      this.setState({
        nogos: nogoData,
      });
    });
  };

  handleDelete = (place) => {
    this.props.dispatch({ type: "DELETE_FAVORITE", payload: place });
    // window.location.reload(false);
  }

  render() {
    return (
      <div className="profileBody">
        <Nav />
        <h1 id="welcome">Hey, {this.props.user.username}!</h1>
        <ul>
          {this.state.favorites.map((place) => (
            <div>
              <li>{place.name}</li>
              <HighlightOffIcon onClick={() => {this.handleDelete(place)}}/>
            </div>
          ))}
        </ul>
        <ul>
          {this.state.wants.map((place) => (
            <div>
              <li>{place.name}</li>
              <HighlightOffIcon onClick={() => {this.props.dispatch({ type: "DELETE_WANT", payload: place })}}/>
            </div>
          ))}
        </ul>
        <ul>
          {this.state.nogos.map((place) => (
            <div>
              <li>{place.name}</li>
              <HighlightOffIcon onClick={() => {this.props.dispatch({ type: "DELETE_NOGO", payload: place })}}/>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  favorites: state.favorites,
  nogo: state.nogo,
  want: state.want,
});

export default connect(mapStateToProps)(SecretsPage);
