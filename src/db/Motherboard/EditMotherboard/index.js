import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../../styles/GlobalStyles';

export default function EditMotherboard() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [motherboard, setMotherboards] = useState({
    brand: '',
    name: '',
    socket: '',
    ramGen: '',
    ramSlots: '',
    ramFreq: '',
    sataSlots: '',
    m2Gen4Slots: '',
    m2Gen3Slots: '',
  });

  const {
    brand,
    name,
    socket,
    ramGen,
    ramSlots,
    ramFreq,
    sataSlots,
    m2Gen4Slots,
    m2Gen3Slots,
  } = motherboard;

  const onInputChange = (e) => {
    setMotherboards({ ...motherboard, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/motherboard/${id}`, motherboard);
    navigate('/motherboard');
  };

  const loadMotherboards = async () => {
    const result = await axios.get(`http://localhost:8080/motherboard/${id}`);
    setMotherboards(result.data);
  };

  useEffect(() => {
    loadMotherboards();
  }, []);

  return (
    <Container>
      <h1> Edit Motherboard </h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="Brand">
            Brand
            <input
              type="text"
              placeholder="Brand"
              name="brand"
              value={brand}
              onChange={(e) => onInputChange(e)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="Name">
            Name
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="Socket" className="form-label">
            Socket
            <input
              className="form-label"
              type="text"
              placeholder="Socket"
              name="socket"
              value={socket}
              onChange={(e) => onInputChange(e)}
            />
          </label>
        </div>
        <button type="submit" className="editButton">
          Submit
        </button>
        <button type="submit" className="deleteButton">
          Cancel
        </button>
      </form>
    </Container>
  );
}
