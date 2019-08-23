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

export const postRequest = (url, data) => {
  return api.post(url, data).then(response => {
    SwalFire(response.data.message, response.data.status);
    if (response.data.status === 'success') return true;
    else return false;
  }).catch(error => {
    SwalFire(error, 'error')
    return false;
  });
}

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