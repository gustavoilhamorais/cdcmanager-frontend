import React from 'react';

const Dashboard = React.lazy(() => import('./Pages/Dashboard'));
const Sales = React.lazy(() => import('./Pages/Sales'));
const NewSale = React.lazy(() => import('./Pages/NewSale'));
const Products = React.lazy(() => import('./Pages/Products'));
const NewProduct = React.lazy(() => import('./Pages/NewProduct'));
const BuisinessProposals = React.lazy(() => import('./Pages/BuisinessProposals'));
const SaleOrders = React.lazy(() => import('./Pages/SaleOrders'));
const NewSaleOrder = React.lazy(() => import('./Pages/NewSaleOrder'));
const ShoppingRequests = React.lazy(() => import('./Pages/ShoppingRequests'));
const NewShoppingRequest = React.lazy(() => import('./Pages/NewShoppingRequest'));
const Shopping = React.lazy(() => import('./Pages/Shopping'));
const NewShopping = React.lazy(() => import('./Pages/NewShopping'));
const Salesman = React.lazy(() => import('./Pages/Salesman'));
const NewSalesman = React.lazy(() => import('./Pages/NewSalesman'));
const Customers = React.lazy(() => import('./Pages/Customers'));
const NewCustomer = React.lazy(() => import('./Pages/NewCustomer'));
const Providers = React.lazy(() => import('./Pages/Providers'));
const NewProvider = React.lazy(() => import('./Pages/NewProvider'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/vendas', name: 'Vendas', component: Sales },
  { path: '/nova-venda', name: 'Nova Venda', component: NewSale },
  { path: '/produtos', name: 'Produtos', component: Products },
  { path: '/novo-produto', name: 'Novo Produto', component: NewProduct },
  { path: '/propostas-comerciais', name: 'Propostas Comerciais', component: BuisinessProposals },
  { path: '/pedidos-de-venda', name: 'Pedidos de Venda', component: SaleOrders },
  { path: '/novo-pedido-de-venda', name: 'Novo Pedido de Venda', component: NewSaleOrder },
  { path: '/compras', name: 'Compras', component: Shopping },
  { path: '/pedidos-de-compra', name: 'Pedidos de Compra', component: ShoppingRequests },
  { path: '/novo-pedido-de-compra', name: 'Novo Pedido de Compra', component: NewShoppingRequest },
  { path: '/nova-compra', name: 'Nova Compra', component: NewShopping },
  { path: '/vendedores', name: 'Vendedores', component: Salesman },
  { path: '/novo-vendedor', name: 'Novo Vendedor', component: NewSalesman },
  { path: '/clientes', name: 'Clientes', component: Customers },
  { path: '/novo-cliente', name: 'Novo Cliente', component: NewCustomer },
  { path: '/fornecedores', name: 'Fornecedores', component: Providers },
  { path: '/novo-fornecedor', name: 'Novo Fornecedor', component: NewProvider },
];

export default routes;
