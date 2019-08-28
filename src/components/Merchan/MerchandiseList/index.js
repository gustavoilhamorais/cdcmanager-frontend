import React, { useState, useEffect } from "react";
import api from "../../../api/conf";

export default function MerchandiseList(props) {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState(0);
  const [merchandise, setMerchandise] = useState([]);
  const fetchMerchandise = () => {
    api.get('/merchandise').then(response => {
      const array = response.data.docs.map(item => item.status && item);
      setMerchandise(array);
    });
  }

  const calculate = async () => {
    try {
      let array = await value.split(',').map(function(product) {
        return merchandise.map(item => {
          if (item.category === product || Number(product) === Number(item.code)) {
            return item.sellValue;
          }
        })
      });

      return await array.forEach(element => {
        setTotal(Number(total) + Number(element));
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    return props.callback({total, value});
  }, [total, value]);

  useEffect(() => {
    fetchMerchandise();
  }, []);

  useEffect(() => {
    calculate();
  }, [value]);

  return (
    <>
      <label className="form-label font-weight-bold">Mercadorias</label>
      <div class="input-group col-md-8 mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fas fa-boxes" />
          </span>
        </div>
        <textarea
          className="form-control"
          type="text"
          name="merchan"
          placeholder="Informe as mercadorias da venda . . ."
          onChange={(e) => setValue(e.target.value)}
          total={total}
          value={value}
          callback={(total, value) => props.callback(total, value)}
        />
      </div>
    </>
  );
}
