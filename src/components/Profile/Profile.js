import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import axios from "axios";
import "./Profile.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import swal from "sweetalert";

// Profile page contains -->
//  axios get requests for favorites, wants, and nogo lists
//  local state containing an array of restaurants for each list
//  display of the data in each list for the user
//  the delete handler and dispatches
class ProfilePage extends Component {
  // setting state for each "list" to be an empty array
  state = {
    favorites: [],
    wants: [],
    nogos: [],
    username: "",
    showInput: false,
  };

  // when the component mounts, the getLists function will run
  // which will send GET requests to grab all of the favorites, wants and nogos
  componentDidMount() {
    this.getLists();
  }

  getLists = () => {
    axios.get(`/favorites/${this.props.user.id}`).then((response) => {
      const responseData = response.data;
      this.setState({
        favorites: responseData, //new favorites array
      });
    });
    axios.get(`/wants/${this.props.user.id}`).then((response) => {
      const wantData = response.data;
      this.setState({
        wants: wantData, //new wants array
      });
    });
    axios.get(`/nogo/${this.props.user.id}`).then((response) => {
      const nogoData = response.data;
      this.setState({
        nogos: nogoData, //new nogos array
      });
    });
  };

  // on the click of the delete button, the delete function will run.
  // an alert will pop up for the user to confirm or cancel.
  // if they choose to cancel, nothing will happen!
  // if they choose to delete, then the dispatch will be sent
  // to the corresponding type, with a payload of
  // the place that was clicked.  Then getLists is ran again
  // to reload the updated list
  handleDeleteFav = (place) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you won't have this restaurant saved anymore.",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Restaurant deleted!", {
          icon: "success",
        });
        this.props.dispatch({ type: "DELETE_FAVORITE", payload: place });
        this.getLists();
      } else {
        swal("Your restaurant is saved!");
      }
    });
  };

  // dispatches to DELETE_WANT on confirmation
  handleDeleteWant = (place) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you won't have this restaurant saved anymore.",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Restaurant deleted!", {
          icon: "success",
        });
        this.props.dispatch({ type: "DELETE_WANT", payload: place });
        this.getLists();
      } else {
        swal("Your restaurant is saved!");
      }
    });
  };

  // dispatches on DELETE_NOGO on confirmation
  handleDeleteNogo = (place) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you won't have this restaurant saved anymore.",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Restaurant deleted!", {
          icon: "success",
        });
        this.props.dispatch({ type: "DELETE_NOGO", payload: place });
        this.getLists();
      } else {
        swal("Your restaurant is saved!");
      }
    });
  };

  // if a user chooses to edit their username, this function will run
  // an alert will pop up to have them confirm or cancel the change
  // if it's canceled, nothing happens and the input is set back to
  // an empty string.
  // if they choose to confirm, EDIT_USER will be dispatched and the
  // username will be updated in the database
  editUsername = () => {
    swal({
      title: "Are you sure?",
      text: "Once your username is changed, you'll need to log back in :)",
      icon: "warning",
      buttons: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        swal(
          `Username updated to ${this.state.username}! Please login again.`,
          { icon: "success" }
        );
        this.props.dispatch({
          type: "EDIT_USER",
          payload: {
            username: this.state.username,
            userId: this.props.user.id,
          },
        });
        this.setState({ showInput: false, username: "" });
      } else {
        swal(`Your username will continue to be ${this.props.user.username}!`);
        this.setState({ username: "" });
      }
    });
  };

  // in the render function, each list (from state) is mapped
  // through in order to display each item on the user's profile
  render() {
    return (
      <div className="profileBody">
        <Nav />
        <Container maxWidth="xl" className="profileContainer">
          <Grid
            container
            direction="row"
            justify="center"
            alginItems="center"
            spacing={1}
            style={{ minHeight: "20vh" }}
            className="mainGrid"
          >
            <Grid item className="welcomeSection">
              <h1 id="welcome">Hey, {this.props.user.username}!</h1>
              {/* Conditional rendering here: if showInput is true, then we will
              show the input and the update button!  If not, then we will
              show the Update Username button ONLY.  On click of the
              Update Username button will set showInput to true.
              If they choose to follow through with the update, then
              it will set showInput back to false. */}
              {this.state.showInput ? (
                <>
                  <input
                    type="text"
                    value={this.state.username}
                    placeholder="Update Username"
                    id="usernameInput"
                    onChange={(event) => {
                      this.setState({ username: event.target.value });
                    }}
                  />
                  <button
                    onClick={this.editUsername}
                    className="usernameButton"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      this.setState({ showInput: false, username: "" })
                    }
                    className="usernameCancelButton"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => this.setState({ showInput: true })}
                    className="usernameButton"
                  >
                    Update Username
                  </button>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={9} md={3} lg={3} xl={2} justify="center">
              <Paper className="profilePaper" elevation={3}>
                <h2 id="favTitle" className="columnTitle">
                  Favorites
                </h2>
                <ul>
                  {this.state.favorites.map((place) => (
                    <div key={place.list_id} className="rowDiv">
                      <li>{place.name}</li>
                      <li className="xIcon">
                        <HighlightOffIcon
                          className="favX"
                          fontSize="small"
                          onClick={() => {
                            this.handleDeleteFav(place);
                          }}
                        />
                      </li>
                    </div>
                  ))}
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9} md={3} lg={3} xl={2} justify="center">
              <Paper className="profilePaper" elevation={3}>
                <h2 id="wantTitle" className="columnTitle">
                  Want-To-Go's
                </h2>
                <ul>
                  {this.state.wants.map((place) => (
                    <div key={place.list_id} className="rowDiv">
                      <li>{place.name}</li>
                      <li className="xIcon">
                        <HighlightOffIcon
                          className="wantX"
                          fontSize="small"
                          onClick={() => {
                            this.handleDeleteWant(place);
                          }}
                        />
                      </li>
                    </div>
                  ))}
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9} md={3} lg={3} xl={2} justify="center">
              <Paper className="profilePaper" elevation={3}>
                <h2 id="noTitle" className="columnTitle">
                  No-Go's
                </h2>
                <ul>
                  {this.state.nogos.map((place) => (
                    <div key={place.list_id} className="rowDiv">
                      <li>{place.name}</li>
                      <li className="xIcon">
                        <HighlightOffIcon
                          className="noX"
                          fontSize="small"
                          onClick={() => {
                            this.handleDeleteNogo(place);
                          }}
                        />
                      </li>
                    </div>
                  ))}
                </ul>
              </Paper>
            </Grid>
          </Grid>
          {/* </container> */}
        </Container>
        <div id="yellowBlock"></div>
        <div id="lightBlueBlock"></div>
      </div>
    );
  }
}

// bringing in the user info to use as props
// to welcome the user by their username
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfilePage);
