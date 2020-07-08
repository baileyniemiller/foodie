import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './Profile.css';

class SecretsPage extends Component {

  state = {
    favorites: [],
    wants: [],
    nogos: [],
  }

  // componentDidMount() {
  //   this.props.dispatch({type: 'FETCH_FAVORITES'});
  // }

  componentDidMount() {
    axios.get(`/favorites/${this.props.user.id}`).then((response) => {
      const responseData = response.data;
      console.log(responseData);
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

  render() {
    return (
      <div className="profileBody">
        <Nav />
        <h1 id="welcome">Hey, {this.props.user.username}!</h1>
        <ul>
          {this.state.favorites.map((place) => (
            <li>{place.name}</li>
          ))}
        </ul>
        <ul>
          {this.state.wants.map((place) => (
            <li>{place.name}</li>
          ))}
        </ul>
        <ul>
          {this.state.nogos.map((place) => (
            <li>{place.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secrets: state.secrets,
  user: state.user,
  favorite: state.favorite,
});

export default connect(mapStateToProps)(SecretsPage);
