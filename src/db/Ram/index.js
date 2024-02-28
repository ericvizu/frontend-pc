import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Container, Tables, Buttons, Search } from '../../styles/GlobalStyles';
import { loadAll, deleteEntity, verifyDuplicate } from '../functions';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Ram() {
  const [rams, setRams] = useState([]);

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

  rams.forEach((m) => {
    verifyDuplicate(brandArray, m.brand);
    verifyDuplicate(nameArray, m.name);
    verifyDuplicate(genArray, m.gen);
    verifyDuplicate(sizeArray, m.size);
  });

  // Resets all fields to empty strings
  const resetAllFilters = () => {
    setSelectBrandFilter('');
    setSelectNameFilter('');
    setSelectGenFilter('');
    setSelectSizeFilter('');
    setSearchText('');
  };

  // GET Ram from database
  const loadRams = () => {
    loadAll('ram').then(async (m) => {
      setRams(m);
    });
  };

  // DELETE Ram from database and updates the page
  // Refactor if possible
  const deleteRam = (id) => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure about this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteEntity('ram', id).then(loadRams),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  // Load the page
  useEffect(() => {
    loadRams();
    resetAllFilters();
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1>RAM</h1>
        </div>
        <div className="col-md-auto">
          <Buttons.Reload
            type="button"
            onClick={() => {
              loadRams();
            }}
          >
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
              <Search.Div className="col">
                <Search.Input
                  type="text"
                  id="searchText"
                  value={searchText}
                  placeholder="Name"
                  onChange={({ target }) => setSearchText(target.value)}
                />
              </Search.Div>
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
          {rams
            .filter(
              ({ brand, name, gen, size }) =>
                (!selectBrandFilter || selectBrandFilter === brand) &&
                (!selectNameFilter || selectNameFilter === name) &&
                (!selectGenFilter || selectGenFilter === gen) &&
                (!selectSizeFilter || selectSizeFilter.includes(size)) &&
                (!searchText ||
                  name?.toLowerCase().includes(searchText.toLowerCase()))
            )
            .map((ram, index) => (
              <tr key={ram.id}>
                <th scope="row">{index + 1}</th>
                <td>{ram.brand}</td>
                <td>{ram.name}</td>
                <td>{ram.gen}</td>
                <td>{ram.size}</td>
                <td>{ram.stock.quantity}</td>
                <td>
                  <Link to={`/ram/view/${ram.id}`}>
                    <Buttons.View type="button">View</Buttons.View>
                  </Link>
                  <Link to={`/ram/edit/${ram.id}`}>
                    <Buttons.Edit type="button">Edit</Buttons.Edit>
                  </Link>
                  <Buttons.Delete
                    type="button"
                    onClick={() => {
                      deleteRam(ram.id);
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
