import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import axios from "axios";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import NotInterestedRoundedIcon from "@material-ui/icons/NotInterestedRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

class UserPage extends Component {
  
  state = {
    searchText: "",
    restaurant: [],
  };

  handlePlaces = () => {
    axios.get(`/restaurants/${this.state.searchText}`).then((response) => {
      const responseData = response.data;
      console.log(responseData.results);
      this.setState({
        searchText: "",
        restaurant: responseData.results,
      });
    });
  };

  render() {
    return (
      <div>
        <div>
          <LogOutButton className="log-in" />
        </div>
        <div className="app">
          <header className="appHeader">
            <input
              type="text"
              value={this.state.searchText}
              placeholder="Search"
              onChange={(event) => {
                this.setState({ searchText: event.target.value });
              }}
            />
            <button onClick={this.handlePlaces}>GO</button>
          </header>
          <h1 className="appTitle">Search Results</h1>
          <br />
          {this.state.restaurant.map((place) => (
            <div>
              <h1>{place.name}</h1>
              <h2>{place.formatted_address}</h2>
              <h3>Rating: {place.rating}</h3>
              <FavoriteRoundedIcon color="secondary" onClick={() => {this.props.dispatch({ type: "ADD_FAVORITE", payload: place })}}/> 
              <StarRoundedIcon className="star" onClick={() => {this.props.dispatch({ type: "ADD_WANT", payload: place })}}/> 
              <NotInterestedRoundedIcon color="error" onClick={() => {this.props.dispatch({ type: "ADD_NOGO", payload: place })}}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserPage);