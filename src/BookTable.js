import React from "react";
import BookRow from "./BookRow";

function BookTable(props) {
  const bookRows = props.books.map(book => (
    <BookRow key={book.id} book={book} />
  ));
  return (
    <table className="mt-3 table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Authors</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>{props.bookRow ? props.bookRow() : bookRows}</tbody>
    </table>
  );
}

export default BookTable;
