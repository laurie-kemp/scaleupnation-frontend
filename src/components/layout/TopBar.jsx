import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import { userId } from "../../jwt";
import { connect } from "react-redux";
import "../../App.css";

const TopBar = props => {
  const { location, history } = props;

  return (
    <AppBar className="AppBar" position="fixed" style={{ zIndex: 10 }}>
      <Toolbar>
        <Typography
          variant="title"
          color="inherit"
          style={{ flex: 1 }}
          onClick={() => history.push("/homepage")}
        >
          <img src="scaleupnation-logo.png" alt="" className="logo" />
        </Typography>

        {location.pathname === "/homepage" && (
          <Button onClick={() => history.push("/logout")}>Log out</Button>
        )}

        {location.pathname === "/list" && (
          <Button onClick={() => history.push("/logout")}>Log out</Button>
        )}

        {location.pathname === "/reports" && (
          <Button onClick={() => history.push("/logout")}>Log out</Button>
        )}

        {location.pathname === "/top" && (
          <Button onClick={() => history.push("/logout")}>Log out</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)]
});

export default withRouter(connect(mapStateToProps)(TopBar));
