import api from '../api/conf';
import { SwalFire } from './swalFire';

export const getRequest = async (url, message) => {
  try {
    const res = await api.get(url);

    if(res.status === 200) {
      if(message) {
        SwalFire(message, 'success');
        return ({status:200, data:res.data});
      
      } else {
        return ({status:200, data:res.data});
      }
      
    } else {
      SwalFire(res.status, 'warning');
      return 400;
    };

  } catch(error) {
    SwalFire(error, 'error');
    return 400;
  };
};

export const postRequest = async (url, data, message) => {
  try {
    const res = await api.post(url, data);
    console.log(res)
    if(res.status === 200) {
      if(message) {
        SwalFire(message, 'success');
        return ({status: 200, data: res.data});
      };
    } else if(res.status === 204)  {
      SwalFire('Sem conteúdo.', 'warning');
      return ({status: 200, data: res.data});
      
    } else if(res.status === 226) {
      SwalFire("Já cadastrado(a)!", 'warning');
      return 226;

    } else {
      SwalFire("Por favor, revise todos os campos.", 'warning');
      return 400;
    };

  } catch(error) {
    SwalFire(error, 'error');
    return 400;
  };
};

export const putRequest = async (url, data, message) => {
  try {
    const res = await api.put(url, data);

    if(res.status === 200) {
      if(message) {
        SwalFire(message, 'success');
        return 200;
      };
    } else if(res.status === 204)  {
      SwalFire('Sem conteúdo.', 'warning');
      return 204;

    } else {
      SwalFire("Por favor, revise todos os campos.", 'warning');
      return 400;
    };

  } catch(error) {
    SwalFire(error, 'error');
    return 400;
  };
};