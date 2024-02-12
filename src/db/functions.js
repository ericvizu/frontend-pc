import axios from 'axios';

// GET Entity from database
export const loadEntity = async (category) => {
  const result = await axios.get(`http://localhost:8080/${category}`);
  return result.data;
};

// DELETE Entity from database and updates the page
export const deleteEntity = async (category, id) => {
  await axios.delete(`http://localhost:8080/${category}/${id}`);
};
