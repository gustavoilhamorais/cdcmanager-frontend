import React from "react";
import { Button, Row } from "reactstrap";
import Swal from "sweetalert2";
import { BootstrapTable } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import api from "../../../services/api";
import { ShoppingContext } from "../../../containers/Data/shoppingsContainer";
import { SalesContext } from "../../../containers/Data/salesContainer";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0,
      pages: 0,
      total: 0,
      limit: 0,
      selectedRows: [],
      rowsIndexes: [],
      url: this.props.url,
      editedField: "",
      editedId: "",
      edition: "",
      keyBoardNav: false,
      hideSelectColumn: true
    };
    this.options = {
      // printToolBar: false,
      onDeleteRow: () => this.forceUpdate(),
      // insertText: 'Novo',
      // saveText: 'Salvar',
      // closeText: 'Cancelar',
      deleteBtn: this.deleteBtn,
      pageStartIndex: this.state.page,
      paginationSize: this.state.pages,
      sizePerPage: this.state.limit,
      sizePerPageList: [{ text: "35", value: 35 }, { text: "50", value: 50 }],
      sort: true,
      noDataText: "Não há dados a serem exibidos.",
      onAddRow: this.onAddRow,
      onPageChange: this.onPageChange,
      onSizePerPageList: this.onSizePerPageL
    };
    // this.onAddRow = this.onAddRow.bind(this);
    this.keyBoardNav = this.keyBoardNav.bind(this);
    this.hideSelectColumn = this.hideSelectColumn.bind(this);
    this.delete = this.delete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.beforeSaveCell = this.beforeSaveCell.bind(this);
    this.afterSaveCell = this.afterSaveCell.bind(this);
    this.reloadCallback = this.reloadCallback.bind(this);
  }

  onPageChange(prop) {
    console.log(prop);
  }

  onSizePerPageList(prop) {
    console.log(prop);
  }

  // onAddRow(row) {
  //   api.post(this.props.url, row).then(response => {
  //     Swal.fire({
  //       html: `<p>${response.data.message}</p>`,
  //       type: response.data.status,
  //       showCloseButton: true
  //     });
  //   }).catch(error => {
  //     Swal.fire({
  //       html: `<p>${error.message}</p>`,
  //       type: 'error',
  //       showCloseButton: true
  //     });
  //   });
  // }

  handleRowSelect(row, isSelected, event, rowIndex) {
    try {
      if (isSelected) {
        this.setState({
          selectedRows: [row._id],
          rowsIndexes: [rowIndex]
        })
      } else {
        this.setState({
          selectedRows: [],
          rowsIndexes: []
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleSelectAll(isSelected, rows) {
    try {
      Swal.fire({
        title: 'Atenção!',
        html: '<p>Selecione apenas um item por vez.</p>',
        type: 'info',
        showCloseButton: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteBtn = () => (
    <Button color="danger" onClick={() => this.delete()}>
      <i className="fa fa-times" />
    </Button>
  );

  delete() {
    if (this.state.selectedRows.length > 0) {
      Swal.fire({
        html: "<p>Tem certeza que deseja deletar o(s) item(s) selecionado?</p>",
        type: "question",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, apagar!"
      }).then(response => {
        if (response.value) {
          return api
            .delete(`${this.props.url}/${this.state.selectedRows[0]}`)
            .then(response => {
              this.props.reload();
              Swal.fire({
                html: `<p>${response.data.message}</p>`,
                type: response.data.status,
                showCloseButton: true
              });
            })
            .catch(error => console.log(error));
        }
      });
    } else {
      Swal.fire({
        html: "<p>Você precisa selecionar ao menos um item para excluir.</p>",
        type: "warning",
        showCloseButton: true
      });
    }
  }

  async beforeSaveCell(row, cellName, cellValue) {
    console.log(row);
    this.setState({
      editedField: cellName,
      editedId: row._id,
      edition: cellValue
    });
  }

  async afterSaveCell(row, cellName, cellValue) {
    setTimeout(() => {
      api.put(`${this.props.url}/${this.state.editedId}`, {
        [this.state.editedField]: this.state.edition
      });
    }, 0.1);
  }

  keyBoardNav() {
    this.state.keyBoardNav
      ? this.setState({ keyBoardNav: false })
      : this.setState({ keyBoardNav: true });
  }

  hideSelectColumn() {
    if (this.state.hideSelectColumn) {
      this.setState({
        hideSelectColumn: false
      });
      return true;
    } else {
      this.setState({
        hideSelectColumn: true
      });
      return false;
    }
  }

  reloadCallback = () => {
    this.props.reload(true);
  }

  render() {
    const selectRow = {
      mode: "radio",
      selected: [...this.state.rowsIndexes],
      onSelect: this.handleRowSelect,
      onSelectAll: this.handleSelectAll,
      clickToSelectAndEditCell: true,
      hideSelectColumn: this.state.hideSelectColumn ? true : false
    };
    const cellEdit = {
      mode: "dbclick",
      beforeSaveCell: this.beforeSaveCell,
      afterSaveCell: this.afterSaveCell
    };
    const pageName = window.location.href.slice(23, -1);
    return (
      <div className="animated">
        <Row>
          <Button
            className="mb-3 ml-3"
            size="sm"
            color={!this.state.keyBoardNav ? "secondary" : "primary"}
            onClick={this.keyBoardNav}
          >
            <i className="fas fa-keyboard" />
          </Button>
          <Button
            className="mb-3 ml-1"
            size="sm"
            color={!this.state.hideSelectColumn ? "primary" : "secondary"}
            onClick={this.hideSelectColumn}
          >
            <i className="fas fa-check-square" />
          </Button>
          {this.props.convertRequestIntoShopping ? (
            <ShoppingContext.Consumer>
              {provider => (
                <Button
                  onClick={() =>
                    provider.convertRequestIntoShopping(this.state.selectedRows)
                  }
                  className="mb-3 ml-1"
                  color="danger"
                  size="sm"
                >
                  <i className="fas fa-money" />
                </Button>
              )}
            </ShoppingContext.Consumer>
          ) : (
            <></>
          )}
          {this.props.convertShoppingIntoRequest ? (
            <ShoppingContext.Consumer>
              {provider => (
                <Button
                  onClick={() =>
                    provider.convertShoppingIntoRequest(this.state.selectedRows)
                  }
                  className="mb-3 ml-1"
                  color="warning"
                  size="sm"
                >
                  <i className="fas fa-money" />
                </Button>
              )}
            </ShoppingContext.Consumer>
          ) : (
            <></>
          )}
          {this.props.convertSaleOrderIntoSale ? (
            <SalesContext.Consumer>
              {provider => (
                <Button
                  onClick={() =>
                    provider.convertSaleOrderIntoSale(this.state.selectedRows)
                  }
                  className="mb-3 ml-1"
                  color="success"
                  size="sm"
                >
                  <i className="fas fa-money" />
                </Button>
              )}
            </SalesContext.Consumer>
          ) : (
            <></>
          )}
          {this.props.convertSaleIntoSaleOrder ? (
            <SalesContext.Consumer>
              {provider => (
                <Button
                  onClick={() =>
                    provider.convertSaleIntoSaleOrder(this.state.selectedRows)
                  }
                  className="mb-3 ml-1"
                  color="danger"
                  size="sm"
                >
                  <i className="fas fa-money" />
                </Button>
              )}
            </SalesContext.Consumer>
          ) : (
            <></>
          )}
        </Row>
        <BootstrapTable
          // insertRow
          search
          searchPlaceholder="Buscar..."
          multiColumnSearch
          keyBoardNav={this.state.keyBoardNav ? true : false}
          scrollTop={"Bottom"}
          options={this.options}
          data={this.props.data}
          cellEdit={cellEdit}
          selectRow={selectRow}
          deleteRow
          hover
          striped
          exportCSV
          csvFileName={`cdcmanager${pageName}`}
          reload={() => this.props.reload()}
        >
          {this.props.children}
        </BootstrapTable>
      </div>
    );
  }
}
