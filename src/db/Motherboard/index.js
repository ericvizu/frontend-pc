import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Container, Tables, Buttons } from '../../styles/GlobalStyles';
import { loadAll, deleteEntity } from '../functions';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Motherboard() {
  const [motherboards, setMotherboards] = useState([]);

  // REFACTOR \/
  const brandArray = [];
  const nameArray = [];
  const socketArray = [];
  const ramGenArray = [];
  const ramSlotsArray = [];

  motherboards.forEach((m) => {
    if (brandArray.includes(m.brand) === false) brandArray.push(m.brand);
    if (nameArray.includes(m.name) === false) nameArray.push(m.name);
    if (socketArray.includes(m.socket) === false) socketArray.push(m.socket);
    if (ramGenArray.includes(m.ramGen) === false) ramGenArray.push(m.ramGen);
    if (ramSlotsArray.includes(m.ramSlots) === false)
      ramSlotsArray.push(m.ramSlots);
  });
  // REFACTOR /\

  // GET Motherboard from database
  const loadMotherboards = () => {
    loadAll('motherboard').then(async (m) => {
      setMotherboards(m);
    });
  };

  // DELETE Motherboard from database and updates the page
  const deleteMotherboard = (id) => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure about this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteEntity('motherboard', id).then(loadMotherboards),
        },
        {
          label: 'No',
        },
      ],
    });
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
      <Tables.Inventory>
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
              <Tables.SelectFilter aria-label="Brand">
                <option> ------------ </option>
                {brandArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td>
              <Tables.SelectFilter aria-label="Name">
                <option> ------------ </option>
                {nameArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td>
              <Tables.SelectFilter aria-label="Name">
                <option> ------------ </option>
                {socketArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td>
              <Tables.SelectFilter aria-label="Name">
                <option> ------------ </option>
                {ramGenArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td>
              <Tables.SelectFilter aria-label="Name">
                <option> ------------ </option>
                {ramSlotsArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td />
            <td>ResetFilterButton</td>
            {/* eslint-enable jsx-a11y/control-has-associated-label */}
          </tr>
        </tbody>
        <tbody>
          {motherboards.map((motherboard, index) => (
            <tr key={motherboard.id}>
              <th scope="row">{index + 1}</th>
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
                  onClick={() => {
                    deleteMotherboard(motherboard.id);
                  }}
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
