import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Container, Tables, Buttons, Search } from '../../styles/GlobalStyles';
import { loadAll, deleteEntity, verifyDuplicate } from '../functions';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Cpu() {
  const [cpus, setCpus] = useState([]);

  // For filtering
  const [selectBrandFilter, setSelectBrandFilter] = useState();
  const [selectNameFilter, setSelectNameFilter] = useState();
  const [selectGenFilter, setSelectGenFilter] = useState();
  const [selectSizeFilter, setSelectSizeFilter] = useState();
  const [searchText, setSearchText] = useState('');

  const brandArray = [];
  const nameArray = [];
  const genArray = [];
  const sizeArray = [];

  cpus.forEach((m) => {
    verifyDuplicate(brandArray, m.brand);
    verifyDuplicate(nameArray, m.name);
    verifyDuplicate(genArray, m.socket);
    verifyDuplicate(sizeArray, m.ramGen);
  });

  // Resets all fields to empty strings
  const resetAllFilters = () => {
    setSelectBrandFilter('');
    setSelectNameFilter('');
    setSelectGenFilter('');
    setSelectSizeFilter('');
    setSearchText('');
  };

  // GET Cpu from database
  const loadCpus = () => {
    loadAll('cpu').then(async (m) => {
      setCpus(m);
    });
  };

  // DELETE Cpu from database and updates the page
  // Refactor if possible
  const deleteCpu = (id) => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure about this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteEntity('cpu', id).then(loadCpus),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  // Load the page
  useEffect(() => {
    loadCpus();
    resetAllFilters();
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1>CPU</h1>
        </div>
        <div className="col-md-auto">
          <Buttons.Reload
            type="button"
            onClick={() => {
              loadCpus();
            }}
          >
            Reload
          </Buttons.Reload>
        </div>
        <Search.Div className="col">
          <Search.Span>Search name</Search.Span>
          <Search.Input
            type="text"
            id="searchText"
            value={searchText}
            placeholder="Name"
            onChange={({ target }) => setSearchText(target.value)}
          />
        </Search.Div>
      </div>
      <Tables.Inventory>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand</th>
            <th scope="col">Name</th>
            <th scope="col">Gen</th>
            <th scope="col">Size</th>
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
                aria-label="Gen"
                value={selectGenFilter}
                onChange={(e) => setSelectGenFilter(e.currentTarget.value)}
              >
                <option value=""> ------------ </option>
                {genArray.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Tables.SelectFilter>
            </td>
            <td>
              <Tables.SelectFilter
                aria-label="Size"
                value={selectSizeFilter}
                onChange={(e) => setSelectSizeFilter(e.currentTarget.value)}
              >
                <option value=""> ------------ </option>
                {sizeArray.map((e) => (
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
          {cpus
            .filter(
              ({ brand, name, socket, ramGen, ramSlots }) =>
                (!selectBrandFilter || selectBrandFilter === brand) &&
                (!selectNameFilter || selectNameFilter === name) &&
                (!selectGenFilter || selectGenFilter === socket) &&
                (!selectSizeFilter || selectSizeFilter === ramGen) &&
                (!searchText ||
                  name?.toLowerCase().includes(searchText.toLowerCase()))
            )
            .filter(({ name }) =>
              name?.toLowerCase().includes(searchText?.toLowerCase())
            )
            .map((cpu, index) => (
              <tr key={cpu.id}>
                <th scope="row">{index + 1}</th>
                <td>{cpu.brand}</td>
                <td>{cpu.name}</td>
                <td>{cpu.gen}</td>
                <td>{cpu.size}</td>
                <td>{cpu.stock.quantity}</td>
                <td>
                  <Link to={`/cpu/view/${cpu.id}`}>
                    <Buttons.View type="button">View</Buttons.View>
                  </Link>
                  <Link to={`/cpu/edit/${cpu.id}`}>
                    <Buttons.Edit type="button">Edit</Buttons.Edit>
                  </Link>
                  <Buttons.Delete
                    type="button"
                    onClick={() => {
                      deleteCpu(cpu.id);
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
