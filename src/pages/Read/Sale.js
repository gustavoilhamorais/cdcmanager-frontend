import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import Sale from "../../Components/Sale/Read";

// App //
function ListSale() {
  return (
    <div className="listSale">
      <div class="container-fluid">
        <Sale />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default ListSale;
