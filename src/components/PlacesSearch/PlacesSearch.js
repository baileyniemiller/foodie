import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import axios from "axios";

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

// const UserPage = (props) => (

// <div>
//   <h1 id="welcome">
//     Hey, { props.user.username }!
//   </h1>
//   {/* <p>Your username is: {props.user.username}</p> */}
//   <LogOutButton className="log-in" />
// </div>
// );

// // Instead of taking everything from state, we just want the user info.
// const mapStateToProps = state => ({
//   user: state.user,
// });

// // this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(UserPage);
