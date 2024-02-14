import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Tables, Buttons } from '../../styles/GlobalStyles';
import { loadAll, deleteEntity } from '../functions';

export default function Motherboard() {
  const [motherboards, setMotherboards] = useState([]);

  const brandArray = [];
  const nameArray = [];

  motherboards.forEach((m) => {
    if (brandArray.includes(m.brand) === false) brandArray.push(m.brand);
    if (nameArray.includes(m.name) === false) nameArray.push(m.name);
  });

  // GET Motherboard from database
  const loadMotherboards = () => {
    loadAll('motherboard').then(async (m) => {
      setMotherboards(m);
    });
  };

  // DELETE Motherboard from database and updates the page
  const deleteMotherboard = (id) => {
    deleteEntity('motherboard', id).then(loadMotherboards);
  };

  // Load the page
  useEffect(() => {
    loadMotherboards();
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1>Motherboard</h1>
        </div>
        <div className="col">
          <Buttons.Reload type="button" onClick={loadMotherboards}>
            Reload
          </Buttons.Reload>
        </div>
      </div>
      <Tables.Inventory className="">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand</th>
            <th scope="col">Name</th>
            <th scope="col">Socket</th>
            <th scope="col">RAM</th>
            <th scope="col">RAM Slots</th>
            <th scope="col">Stock</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* eslint-disable jsx-a11y/control-has-associated-label */}
            <td />
            <td>
              <select className="form-select form-select-sm" aria-label="Brand">
                <option selected> ------------ </option>
                {brandArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select className="form-select form-select-sm" aria-label="Name">
                <option selected> ------------ </option>
                {nameArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </select>
            </td>
            <td>Filter</td>
            <td>Filter</td>
            <td>Filter</td>
            <td>No Filter</td>
            <td>ResetFilterButton</td>
            {/* eslint-enable jsx-a11y/control-has-associated-label */}
          </tr>
        </tbody>
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
              <td>{motherboard.stock.quantity}</td>
              <td>
                <Link to={`/motherboard/view/${motherboard.id}`}>
                  <Buttons.View type="button">View</Buttons.View>
                </Link>
                <Link to={`/motherboard/edit/${motherboard.id}`}>
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
