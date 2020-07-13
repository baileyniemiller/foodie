import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import axios from "axios";
import NotInterestedRoundedIcon from "@material-ui/icons/NotInterestedRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import HomeNav from '../HomeNav/HomeNav';
import './PlacesSearch.css';

// Places search page contains --> 
//  search input for the user
//  on click of the GO button, an axios GET request is sent
//  to grab the results based on the user input
//  local state is used for user search text and an array
//  of the incoming request of restaurants
//  results are displayed on this page.
//  user has ability to add restaurants to their lists
class UserPage extends Component {
  
  // setting local state to hold user input text
  // restaurant array of results
  state = {
    searchText: "",
    restaurant: [],
  };

  // on the click of the GO button, this function will run and grab the results
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

  // in the render function, there is the search input,
  // the GO button, and a map of the restaurant array
  // to display the results
  render() {
    return (
      <div className="homeBody">
        <HomeNav />
        <div>
          {/* <LogOutButton className="log-in" /> */}
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
          <h2 className="appTitle">Search Results</h2>
          <br />
          {this.state.restaurant.map((place) => (
            <div>
              <h1 id="placeName">{place.name}</h1>
              <h2 id="placeAddress">{place.formatted_address}</h2>
              <h3 id="placeRating">Rating: {place.rating}</h3>
              <FavoriteRoundedIcon color="secondary" onClick={() => {this.props.dispatch({ type: "ADD_FAVORITE", payload: place })}}/> 
              <StarRoundedIcon className="star" color="primary" onClick={() => {this.props.dispatch({ type: "ADD_WANT", payload: place })}}/> 
              <NotInterestedRoundedIcon color="error" onClick={() => {this.props.dispatch({ type: "ADD_NOGO", payload: place })}}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// bringing in the user info to use as props
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserPage);