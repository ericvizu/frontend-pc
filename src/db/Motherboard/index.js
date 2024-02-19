import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Container, Tables, Buttons } from '../../styles/GlobalStyles';
import { loadAll, deleteEntity, verifyDuplicate } from '../functions';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Motherboard() {
  const [motherboards, setMotherboards] = useState([]);
  const [selectBrandFilter, setSelectBrandFilter] = useState([motherboards]);
  const [selectNameFilter, setSelectNameFilter] = useState([motherboards]);
  const [selectSocketFilter, setSelectSocketFilter] = useState([motherboards]);
  const [selectRamGenFilter, setSelectRamGenFilter] = useState([motherboards]);
  const [selectRamSlotsFilter, setSelectRamSlotsFilter] = useState([
    motherboards,
  ]);

  const brandArray = [];
  const nameArray = [];
  const socketArray = [];
  const ramGenArray = [];
  const ramSlotsArray = [];

  motherboards.forEach((m) => {
    verifyDuplicate(brandArray, m.brand);
    verifyDuplicate(nameArray, m.name);
    verifyDuplicate(socketArray, m.socket);
    verifyDuplicate(ramGenArray, m.ramGen);
    verifyDuplicate(ramSlotsArray, m.ramSlots);
  });

  const resetAllFilters = () => {
    setSelectBrandFilter('');
    setSelectNameFilter('');
    setSelectSocketFilter('');
    setSelectRamGenFilter('');
    setSelectRamSlotsFilter('');
  };

  // GET Motherboard from database
  const loadMotherboards = () => {
    loadAll('motherboard').then(async (m) => {
      setMotherboards(m);
    });
  };

  // DELETE Motherboard from database and updates the page
  // Refactor if possible
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
    resetAllFilters();
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
              <Tables.SelectFilter
                aria-label="Brand"
                value={selectBrandFilter}
                onChange={(e) => setSelectBrandFilter(e.currentTarget.value)}
              >
                <option value=""> ------------ </option>
                {brandArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td>
              <Tables.SelectFilter
                aria-label="Name"
                value={selectNameFilter}
                onChange={(e) => setSelectNameFilter(e.currentTarget.value)}
              >
                <option value=""> ------------ </option>
                {nameArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td>
              <Tables.SelectFilter
                aria-label="Socket"
                value={selectSocketFilter}
                onChange={(e) => setSelectSocketFilter(e.currentTarget.value)}
              >
                <option value=""> ------------ </option>
                {socketArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td>
              <Tables.SelectFilter
                aria-label="RamGen"
                value={selectRamGenFilter}
                onChange={(e) => setSelectRamGenFilter(e.currentTarget.value)}
              >
                <option value=""> ------------ </option>
                {ramGenArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td>
              <Tables.SelectFilter
                aria-label="RamSlots"
                value={selectRamSlotsFilter}
                onChange={(e) => setSelectRamSlotsFilter(e.currentTarget.value)}
              >
                <option value=""> ------------ </option>
                {ramSlotsArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td />
            <td>
              <Buttons.ResetFilter
                onClick={() => {
                  document.getElementsByName('filterSelect').forEach((b) => {
                    // eslint-disable-next-line no-param-reassign
                    b.selectedIndex = 0;
                  });
                  resetAllFilters();
                }}
              >
                Reset Filters
              </Buttons.ResetFilter>
            </td>
            {/* eslint-enable jsx-a11y/control-has-associated-label */}
          </tr>
        </tbody>
        <tbody>
          {motherboards
            .filter(({ brand, name, socket, ramGen, ramSlots }) =>
              selectBrandFilter ||
              selectNameFilter ||
              selectSocketFilter ||
              selectRamGenFilter ||
              selectRamSlotsFilter
                ? selectBrandFilter === brand ||
                  selectNameFilter === name ||
                  selectSocketFilter === socket ||
                  selectRamGenFilter === ramGen ||
                  selectRamSlotsFilter === ramSlots
                : true
            )
            .map((motherboard, index) => (
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
