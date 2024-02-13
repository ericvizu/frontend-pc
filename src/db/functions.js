import axios from 'axios';

// GET All Entity from database
export const loadAll = async (category) => {
  const result = await axios.get(`http://localhost:8080/${category}`);
  return result.data;
};

// GET Entity from database
export const loadEntity = async (category, id) => {
  const result = await axios.get(`http://localhost:8080/${category}/${id}`);
  return result.data;
};

// DELETE Entity from database and updates the page
export const deleteEntity = async (category, id) => {
  await axios.delete(`http://localhost:8080/${category}/${id}`);
};

// PUT Entity
export const updateEntity = async (category, id, entity) => {
  await axios.put(`http://localhost:8080/${category}/${id}`, entity);
};
