import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Buttons } from '../../../styles/GlobalStyles';

export default function EditMotherboard() {
  const navigate = useNavigate();

  // Get ID from URL
  const { id } = useParams();

  // Empty values to be updated after get
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

  // Changes value from where is being written
  const onInputChange = (e) => {
    setMotherboards({ ...motherboard, [e.target.name]: e.target.value });
  };

  // PUT Motherboard with new values where the old one was
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/motherboard/${id}`, motherboard);
    navigate('/motherboard');
  };

  // GET Motherboards and load the page
  useEffect(() => {
    const loadMotherboards = async () => {
      const result = await axios.get(`http://localhost:8080/motherboard/${id}`);
      setMotherboards(result.data);
    };
    loadMotherboards();
  }, [id]);

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
        <Link to="/motherboard">
          <Buttons.Cancel type="button">Cancel</Buttons.Cancel>
        </Link>
      </form>
    </Container>
  );
}
