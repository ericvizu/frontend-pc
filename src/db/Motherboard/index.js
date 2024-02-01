import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Title } from './styled';
import { Container, Table } from '../../styles/GlobalStyles';

export default function Motherboard() {
  const [motherboards, setMotherboards] = useState([]);

  const loadMotherboards = async () => {
    const result = await axios.get('http://localhost:8080/motherboard');
    setMotherboards(result.data);
  };

  const deleteMotherboard = async (id) => {
    await axios.delete(`http://localhost:8080/motherboard/${id}`);
    loadMotherboards();
  };

  useEffect(() => {
    loadMotherboards();
  }, []);

  return (
    <Container>
      <Title>
        Motherboard
        <button type="button" onClick={loadMotherboards}>
          Recarregar
        </button>
      </Title>
      <Table className="">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand</th>
            <th scope="col">Name</th>
            <th scope="col">Socket</th>
            <th scope="col">RAM</th>
            <th scope="col">RAM Slots</th>
            <th scope="col">RAM Frequency</th>
            <th scope="col">SATA Slots</th>
            <th scope="col">M.2 Gen4 Slots</th>
            <th scope="col">M.2 Gen3 Slots</th>
            <th scope="col">Stock</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {motherboards.map((motherboard, index) => (
            <tr>
              {/* eslint-disable-next-line react/no-array-index-key */}
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{motherboard.brand}</td>
              <td>{motherboard.name}</td>
              <td>{motherboard.socket}</td>
              <td>{motherboard.ramGen}</td>
              <td>{motherboard.ramSlots}</td>
              <td>{motherboard.ramFreq}</td>
              <td>{motherboard.sataSlots}</td>
              <td>{motherboard.m2Gen4Slots}</td>
              <td>{motherboard.m2Gen3Slots}</td>
              <td>{motherboard.stock.quantity}</td>
              <td>
                <Link to={`/editmotherboard/${motherboard.id}`}>
                  <button type="button" className="editButton">
                    Edit
                  </button>
                </Link>
                <button
                  type="button"
                  className="deleteButton"
                  onClick={() => deleteMotherboard(motherboard.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
