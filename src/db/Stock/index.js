import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Tables, Buttons, Search } from '../../styles/GlobalStyles';
import { verifyDuplicate } from '../functions';

export default function Stock() {
  const [stocks, setStocks] = useState([]);
  const [selectNameFilter, setSelectNameFilter] = useState();
  const [selectCategoryFilter, setSelectCategoryFilter] = useState();
  const [searchText, setSearchText] = useState('');

  const nameArray = [];
  const categoryArray = [];

  stocks.forEach((s) => {
    verifyDuplicate(nameArray, s.name);
    verifyDuplicate(categoryArray, s.category);
  });

  // Resets all fields to empty strings
  const resetAllFilters = () => {
    setSelectNameFilter('');
    setSelectCategoryFilter('');
    setSearchText('');
  };

  const loadStocks = async () => {
    const result = await axios.get('http://localhost:8080/stock');
    setStocks(result.data);
  };

  useEffect(() => {
    loadStocks();
    resetAllFilters();
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1>Stock</h1>
        </div>
        <div className="col-md-auto">
          <Buttons.Reload type="button" onClick={loadStocks}>
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
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* eslint-disable jsx-a11y/control-has-associated-label */}
            <td />
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
                aria-label="Category"
                value={selectCategoryFilter}
                onChange={(e) => setSelectCategoryFilter(e.currentTarget.value)}
              >
                <option value=""> ------------ </option>
                {categoryArray.map((e) => (
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
          {stocks
            .filter(
              ({ name, category }) =>
                (!selectNameFilter || selectNameFilter === name) &&
                (!selectCategoryFilter || selectCategoryFilter === category) &&
                (!searchText ||
                  name?.toLowerCase().includes(searchText.toLowerCase()))
            )
            .map((stock, index) => (
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
