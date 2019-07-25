import React from "react";
import { Link, withRouter } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar">
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-beer"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          CDC <sup>®</sup>
        </div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Visão Geral</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Módulos</div>
      
      <li className="nav-item">
        <Link className="nav-link" to="/providers">
          <i className="fas fa-truck"></i>
          <span>Fornecedores</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/categories">
          <i className="fas fa-barcode"></i>
          <span>Categorias</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/customers">
          <i className="fas fa-address-card"></i>
          <span>Clientes</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/merchans">
          <i className="fas fa-box-open"></i>
          <span>Mercadorias</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Gerenciar</div>

      <li className="nav-item">
        <Link className="nav-link" to="/rentals">
          <i className="fas fa-clipboard-list"></i>
          <span>Ordens de Serviço</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/sales">
          <i className="fas fa-cash-register"></i>
          <span>Vendas</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};

export default withRouter(Sidebar);