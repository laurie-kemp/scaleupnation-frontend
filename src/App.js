import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import List from "./components/List";
import FileSelector from "./components/FileSelector";
import Reports from "./components/reports/Reportspage";
import TopBar from "./components/layout/TopBar";
import Homepage from "./components/homepage/homepage.js";
import LogoutPage from "./components/logout/LogoutPage";
import TopCompanies from "./components/topcompanies/TopCompanies";



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <nav>
            <TopBar />
          </nav>

          <main style={{ marginTop: 75 }}>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/homepage" component={Homepage} />
            <Route exact path="/list" component={List} />
            <Route exact path="/reports" component={Reports} />
            <Route exact path="/top" component={TopCompanies} />
            <Route exact path="/fileselector" component={FileSelector} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </main>

        </div>
      </Router>
    );
  }
}

export default App;
