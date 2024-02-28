import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Container, Tables, Buttons, Search } from '../../styles/GlobalStyles';
import { loadAll, deleteEntity, verifyDuplicate } from '../functions';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Gpu() {
  const [gpus, setGpus] = useState([]);

  // For filtering
  const [selectBrandFilter, setSelectBrandFilter] = useState();
  const [selectNameFilter, setSelectNameFilter] = useState();
  const [selectVramSizeFilter, setSelectSizeFilter] = useState();
  const [searchText, setSearchText] = useState('');

  const brandArray = [];
  const nameArray = [];
  const vramSizeArray = [];

  gpus.forEach((m) => {
    verifyDuplicate(brandArray, m.brand);
    verifyDuplicate(nameArray, m.name);
    verifyDuplicate(vramSizeArray, m.vramSize);
  });

  // Resets all fields to empty strings
  const resetAllFilters = () => {
    setSelectBrandFilter('');
    setSelectNameFilter('');
    setSelectSizeFilter('');
    setSearchText('');
  };

  // GET Gpu from database
  const loadGpus = () => {
    loadAll('gpu').then(async (m) => {
      setGpus(m);
    });
  };

  // DELETE Gpu from database and updates the page
  // Refactor if possible
  const deleteGpu = (id) => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure about this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteEntity('gpu', id).then(loadGpus),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  // Load the page
  useEffect(() => {
    loadGpus();
    resetAllFilters();
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1>GPU</h1>
        </div>
        <div className="col-md-auto">
          <Buttons.Reload
            type="button"
            onClick={() => {
              loadGpus();
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
                aria-label="Size"
                value={selectVramSizeFilter}
                onChange={(e) => setSelectSizeFilter(e.currentTarget.value)}
              >
                <option value=""> ------------ </option>
                {vramSizeArray.map((e) => (
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
          {gpus
            .filter(
              ({ brand, name, vramSize }) =>
                (!selectBrandFilter || selectBrandFilter === brand) &&
                (!selectNameFilter || selectNameFilter === name) &&
                (!selectVramSizeFilter || selectVramSizeFilter === vramSize) &&
                (!searchText ||
                  name?.toLowerCase().includes(searchText.toLowerCase()))
            )
            .map((gpu, index) => (
              <tr key={gpu.id}>
                <th scope="row">{index + 1}</th>
                <td>{gpu.brand}</td>
                <td>{gpu.name}</td>
                <td>{gpu.vramSize}</td>
                <td>{gpu.stock.quantity}</td>
                <td>
                  <Link to={`/gpu/view/${gpu.id}`}>
                    <Buttons.View type="button">View</Buttons.View>
                  </Link>
                  <Link to={`/gpu/edit/${gpu.id}`}>
                    <Buttons.Edit type="button">Edit</Buttons.Edit>
                  </Link>
                  <Buttons.Delete
                    type="button"
                    onClick={() => {
                      deleteGpu(gpu.id);
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
