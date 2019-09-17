import React from 'react';
import { Button, Input, Label, Container } from 'reactstrap';
import api from '../../../services/api';
import Swal from 'sweetalert2';

function newSale() {
  const form = () => {
    return Swal.fire({
      html:`
      <Container>
        <Label>Venda</Label><br />
        <Input id="sale" type="text" placeholder="identificação da venda"/>
        <Label>Nota</Label><br />
        <Input id="note" type="text" placeholder="NF-"/>
        <Label>Cliente</Label><br />
        <Input id="customer" type="text" placeholder="Cliente"/>
        <Label>Custo</Label><br />
        <Input id="coast" type="number" placeholder="Custo da venda"/>
        <Label>Valor</Label><br />
        <Input id="value" type="number" placeholder="Valor da venda"/>
      <Container>
      `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          "sale": document.getElementById('sale').value,
          "note": document.getElementById('note').value,
          "customerName": document.getElementById('customer').value,
          "coast": document.getElementById('coast').value,
          "value": document.getElementById('value').value
        }
      }
    }).then(response => {
      const data = { ...response.value };
      api.post('/sales', data);
    })
  }
  return (
    <Button
      style={{color: 'white'}}
      size="sm"
      onClick={() => form()}
      ><i className="fas fa-plus-circle mr-1" />Nova Venda
    </Button>
  );
};

export default newSale;