import React, { Component } from "react";
import BookRow from "./BookRow";

import BookTable from "./BookTable";

import SearchBar from "./SearchBar";

class BookList extends Component {
  state = {
    filteredBooks: this.props.books
  };

  bookRows = () => {
    const color = this.props.match.params.color;
    let list = this.state.filteredBooks;
    if (color) {
      list = list.filter(book => {
        return book.color === color;
      });
    }
    list = list.map(book => <BookRow key={book.id} book={book} />);

    return list;
  };
  filterBooks = query => {
    query = query.toLowerCase();
    let filteredBooks = this.props.books.filter(book =>
      `${book.title}`.toLowerCase().includes(query)
    );
    this.setState({ filteredBooks: filteredBooks });
  };
  render() {
    return (
      <div>
        <h3>Books</h3>
        <SearchBar onChange={this.filterBooks} />
        <BookTable books={this.state.filteredBooks} bookRow={this.bookRows} />
      </div>
    );
  }
}

export default BookList;
