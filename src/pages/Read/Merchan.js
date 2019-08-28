import React from "react";

// Components //
import Logout from "../../components/Logout/Main";
import Merchandise from "../../components/Merchan/Read";

// App //
function ListMerchan() {
  return (
    <div className="listMerchan">
      <div class="container-fluid">
        <Merchandise />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default ListMerchan;
