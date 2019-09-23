import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import BookList from "./BookList";
// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class App extends Component {
  state = {
    authors: [],
    loading: true,
    books: []
  };

  fetchAllAuthors = async () => {
    const res = await instance.get("/api/authors/");
    return res.data;
  };
  fetchAllBooks = async () => {
    const res = await instance.get("/api/books/");
    return res.data;
  };
  async componentDidMount() {
    try {
      const authors = await this.fetchAllAuthors();
      const books = await this.fetchAllBooks();

      this.setState({
        authors: authors,
        loading: false,
        books: books
      });
    } catch (err) {
      console.error(err);
    }
  }

  getView = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route path="/authors/:authorID" component={AuthorDetail} />
          <Route
            path="/authors/"
            render={props => (
              <AuthorsList {...props} authors={this.state.authors} />
            )}
          />

          <Route
            exact
            path="/books/:color?"
            render={props => <BookList {...props} books={this.state.books} />}
          />
        </Switch>
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">{this.getView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
