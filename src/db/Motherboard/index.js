import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Tables, Buttons } from '../../styles/GlobalStyles';

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
      <h1>
        Motherboard
        <Buttons.Reload type="button" onClick={loadMotherboards}>
          Reload
        </Buttons.Reload>
      </h1>
      <Tables.Inventory className="">
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
                <Link to={`/viewmotherboard/${motherboard.id}`}>
                  <Buttons.View type="button">View</Buttons.View>
                </Link>
                <Link to={`/editmotherboard/${motherboard.id}`}>
                  <Buttons.Edit type="button">Edit</Buttons.Edit>
                </Link>
                <Buttons.Delete
                  type="button"
                  onClick={() => deleteMotherboard(motherboard.id)}
                >
                  Delete
                </Buttons.Delete>
              </td>
            </tr>
          ))}
        </tbody>
      </Tables.Inventory>
    </Container>
  );
}
