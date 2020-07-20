import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import HomeNav from "../HomeNav/HomeNav";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Alert from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./PlacesSearch.css";

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
    setOpen: false,
  };

  // on the click of the GO button, this function will run and grab the results
  // based on the user's search text
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

  // when the success message is shown after a user adds a place
  // to their lists, this function is ran to set the state of 
  // setOpen back to false so the message doesn't display anymore
  handleClose = () => {
    this.setState({
      setOpen: false,
    });
  };

  // in the render function, there is -->
  // text telling the user how to start
  // the search input,
  // the GO button, and a map of the restaurant array
  // to display the results
  render() {
    return (
      <div className="homeBody">
        <HomeNav />
        <Container maxWidth="lg" className="placesSearchContainer">
          <Grid container direction="row">
            <Grid item xs={12} sm={6} md={6}>
              <div className="instructionsDiv">
                <h1 id="instructionsh1">
                  Start by searching "restaurants" or "Chinese food"
                </h1>
                <h2 id="instructionsh2">Save them to your lists!</h2>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className="searchPaper" elevation={3}>
                <div className="searchDiv">
                  <header className="appHeader">
                    <label for="searchInput" id="searchLabel">
                      Search for places here:
                    </label>
                    <br></br>
                    <input
                      type="text"
                      value={this.state.searchText}
                      placeholder="Search"
                      id="searchInput"
                      onChange={(event) => {
                        this.setState({ searchText: event.target.value });
                      }}
                    />
                    <button onClick={this.handlePlaces} id="goButton">
                      GO
                    </button>
                  </header>
                  <br />
                  {this.state.setOpen ? (
                    <>
                      <Snackbar
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        open={this.state.setOpen}
                        autoHideDuration={2000}
                        onClose={this.handleClose}
                      >
                        <Alert severity="success" onClose={this.handleClose}>
                          Place added!
                        </Alert>
                      </Snackbar>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.restaurant.map((place) => (
                    <div id="resultDiv">
                      <h1 id="placeName">{place.name}</h1>
                      <h2 id="placeAddress">{place.formatted_address}</h2>
                      <h3 id="placeRating">Rating: {place.rating}</h3>
                      <div id="iconDiv">
                        <Tooltip title="Add to Favorites">
                          <FavoriteRoundedIcon
                            id="favIcon"
                            style={{ fill: "#E23D3D" }}
                            onClick={() => {
                              this.setState({ setOpen: true });
                              this.props.dispatch({
                                type: "ADD_FAVORITE",
                                payload: place,
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Add to Want-to-Go">
                          <StarRoundedIcon
                            id="starIcon"
                            style={{ fill: "#ffe669" }}
                            onClick={() => {
                              this.props.dispatch({
                                type: "ADD_WANT",
                                payload: place,
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Add to No-Go">
                          <ThumbDownAltIcon
                            id="sadIcon"
                            style={{ fill: "#1E8CB5" }}
                            onClick={() => {
                              this.props.dispatch({
                                type: "ADD_NOGO",
                                payload: place,
                              });
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

// bringing in the user info to use as props
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserPage);
