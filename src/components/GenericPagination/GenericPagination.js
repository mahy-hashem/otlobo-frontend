import React from "react";

import Pagination from "react-bootstrap/Pagination";

let items = [];
let active = 1;
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item
      key={number}
      active={number === active}
      href={`/restaurants/page?=${number}`}
    >
      {number}
    </Pagination.Item>
  );
}

class GenericPagination extends React.Component {
  render() {
    return (
      <div>
        <Pagination>{items}</Pagination>
      </div>
    );
  }
}

export default GenericPagination;
