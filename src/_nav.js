export default {
  items: [
    {
      name: "Visão Geral",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      divider: true,
      class: "m-2"
    },
    {
      title: true,
      name: "Vendas & Estoque"
    },
    {
      name: "Vendas",
      icon: "fas fa-cash-register",
      children: [
        {
          name: "Vendas",
          url: "/vendas",
          icon: "fas fa-money-bill-wave"
        },
        // {
        //   name: "Propostas Comerciais",
        //   url: "/propostas-comerciais",
        //   icon: "fas fa-file"
        // },
        {
          name: "Pedidos de Venda",
          url: "/pedidos-de-venda",
          icon: "fas fa-file-alt"
        }
      ]
    },
    {
      name: "Estoque",
      icon: "fas fa-boxes",
      children: [
        {
          name: "Pedidos de Compra",
          url: "/pedidos-de-compra",
          icon: "fas fa-file-alt"
        },
        {
          name: "Compras",
          url: "/compras",
          icon: "fas fa-shopping-cart"
        },
        {
          name: "Produtos",
          url: "/produtos",
          icon: "fas fa-box-open"
        }
      ]
    },
    {
      divider: true,
      class: "m-2"
    },
    {
      title: true,
      name: "Colaboradores"
    },
    {
      name: "Vendedores",
      url: "/vendedores",
      icon: "fas fa-users"
    },
    {
      divider: true,
      class: "m-2"
    },
    {
      title: true,
      name: "Cliente"
    },
    {
      name: "Ver Clientes",
      url: "/clientes",
      icon: "fas fa-user"
    },
    {
      name: "Novo Cliente",
      url: "/novo-cliente",
      icon: "fas fa-plus"
    },
    {
      divider: true,
      class: "m-2"
    },
    {
      title: true,
      name: "Fornecedores"
    },
    {
      name: "Ver Fornecedores",
      url: "/fornecedores",
      icon: "fas fa-truck"
    },
    {
      name: "Novo Fornecedor",
      url: "/novo-fornecedor",
      icon: "fas fa-plus"
    },
    // {
    //   divider: true,
    //   class: "m-2"
    // },
    // {
    //   title: true,
    //   name: "Financeiro"
    // },
    // {
    //   name: "Extrato",
    //   url: "/money",
    //   icon: "fas fa-file-invoice"
    // },
    // {
    //   name: "Contas",
    //   icon: "fas fa-file-invoice-dollar",
    //   children: [
    //     {
    //       name: "A pagar",
    //       url: '/apagar',
    //       icon: "fas fa-hand-holding-usd"
    //     },
    //     {
    //       name: "A Receber",
    //       url: '/apagar',
    //       icon: "fas fa-search-dollar"
    //     }
    //   ]
    // },
    // {
    //   divider: true,
    //   class: "m-2"
    // },
    // {
    //   title: true,
    //   name: "Relatórios"
    // },
    // {
    //   name: "Fluxo de Caixa",
    //   icon: "icon-ban",
    //   children: [
    //     {
    //       name: "Diário",
    //       url: "/ban",
    //       icon: "icon-ban",
    //       attributes: { disabled: true }
    //     },
    //     {
    //       name: "Mensal",
    //       url: "/ban",
    //       icon: "icon-ban",
    //       attributes: { disabled: true }
    //     }
    //   ]
    // },
    // {
    //   name: "Demonstrativo",
    //   url: "/dashboard",
    //   icon: "icon-ban",
    //   attributes: { disabled: true }
    // },
    // {
    //   name: "Posição de Contas",
    //   url: "/dashboard",
    //   icon: "icon-ban",
    //   attributes: { disabled: true }
    // },
    // {
    //   name: "Visão Geral de Pagamentos",
    //   url: "/visao-geral-de-pagamentos",
    //   icon: "icon-ban",
    //   attributes: { disabled: true }
    // },
    // {
    //   name: "Análise de Recebimentos",
    //   url: "/analise-de-recebimentos",
    //   icon: "icon-ban",
    //   attributes: { disabled: true }
    // }
  ]
};
