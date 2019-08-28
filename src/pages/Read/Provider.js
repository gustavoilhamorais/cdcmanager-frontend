import React from "react";

// Components //
import Logout from "../../components/Logout/Main";
import Provider from "../../components/Providr/Read";

// App //
function ListProvider() {
  return (
    <div className="listProvider">
      <div class="container-fluid">
        <Provider />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default ListProvider;