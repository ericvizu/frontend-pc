import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from '../../styles/GlobalStyles';

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
      <title>
        Stock
        <button type="button" onClick={loadStocks} className="btn btn-danger">
          Recarregar
        </button>
      </title>
      <Table className="">
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
            <tr>
              {/* eslint-disable-next-line react/no-array-index-key */}
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{stock.name}</td>
              <td>{stock.category}</td>
              <td>{stock.quantity}</td>
              <td>
                <Link to={`/editstock/${stock.id}`}>
                  <button type="button" className="editButton">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
