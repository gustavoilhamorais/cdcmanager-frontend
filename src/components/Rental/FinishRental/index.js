import React, { useEffect, useState } from 'react';
import api from '../../../api/conf';

export default function FinishRental(props) {
  const [id, setId] = useState(0);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    setId(props.id);
    setStatus(props.status);
  }, []);
  const handleClick = () => {
    status ? setStatus(false) : setStatus(true);
    api.put(`rentals/${id}`, { status: status })
    .then((res) => {
      console.log(res);
      props.callback()
    });
  }
  return (
    <button className="btn btn-success btn-sm ml-1"
      onClick={() => handleClick()}
      callback={() => props.callback()}
      ><i className="fas fa-check-circle" />
    </button>
  );
}