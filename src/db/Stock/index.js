import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Tables, Buttons } from '../../styles/GlobalStyles';

export default function Stock() {
  const [stocks, setStocks] = useState([]);

  const loadStocks = async () => {
    const result = await axios.get('http://localhost:8080/stock');
    setStocks(result.data);
  };

  useEffect(() => {
    loadStocks();
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1>Stock</h1>
        </div>
        <div className="col">
          <Buttons.Reload type="button" onClick={loadStocks}>
            Reload
          </Buttons.Reload>
        </div>
      </div>
      <Tables.Inventory>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={stock.id}>
              <th scope="row">{index + 1}</th>
              <td>{stock.name}</td>
              <td className="uppercase">{stock.category}</td>
              <td>{stock.quantity}</td>
              <td>
                <Link to={`/stock/edit/${stock.id}`}>
                  <Buttons.Edit type="button">Edit</Buttons.Edit>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Tables.Inventory>
    </Container>
  );
}
