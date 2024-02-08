import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Buttons, Form } from '../../../styles/GlobalStyles';

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
      <h1> Change Motherboard </h1>

      <Form onSubmit={(e) => onSubmit(e)}>
        <h3>
          Please change the Motherboard infos and press Submit, or press Cancel
          to go back.
        </h3>
        <div>
          <label htmlFor="Brand" className="form-label">
            <div className="input-group">
              <span className="input-group-text">Brand</span>
              <input
                id="Brand"
                className="form-control"
                type="text"
                placeholder="Brand"
                name="brand"
                value={brand}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="Name" className="form-label">
            <div className="input-group">
              <span className="input-group-text">Name</span>
              <input
                id="Name"
                className="form-control"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="Socket" className="form-label">
            Socket
            <input
              id="Socket"
              className="form-control"
              type="text"
              placeholder="Socket"
              name="socket"
              value={socket}
              onChange={(e) => onInputChange(e)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="RamGen" className="form-label">
            Socket
            <input
              id="RamGen"
              className="form-control"
              type="text"
              placeholder="RAM Gen"
              name="ramGen"
              value={ramGen}
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
      </Form>
    </Container>
  );
}
