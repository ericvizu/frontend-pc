import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Buttons, Form } from '../../../styles/GlobalStyles';

export default function EditMotherboard() {
  const navigate = useNavigate();

  // Get ID from URL
  const { id } = useParams();

  // Empty values to be updated after GET
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
        <h5>Name</h5>
        <div className="card card-body">
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
        </div>

        <h5>CPU</h5>
        <div className="card card-body">
          <div>
            <label htmlFor="Socket" className="form-label">
              <div className="input-group">
                <span className="input-group-text">Socket</span>
                <input
                  id="Socket"
                  className="form-control"
                  type="text"
                  placeholder="Socket"
                  name="socket"
                  value={socket}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </label>
          </div>
        </div>

        <h5>RAM</h5>
        <div className="card card-body">
          <div>
            <label htmlFor="RamGen" className="form-label">
              <div className="input-group">
                <span className="input-group-text">RAM Gen</span>
                <input
                  id="RamGen"
                  className="form-control"
                  type="text"
                  placeholder="RAM Gen"
                  name="ramGen"
                  value={ramGen}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="RamSlots" className="form-label">
              <div className="input-group">
                <span className="input-group-text">RAM Slots</span>
                <input
                  id="RamSlots"
                  className="form-control"
                  type="text"
                  placeholder="RAM Slots"
                  name="ramSlots"
                  value={ramSlots}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="RamFreq" className="form-label">
              <div className="input-group">
                <span className="input-group-text">RAM Frequency</span>
                <input
                  id="RamFreq"
                  className="form-control"
                  type="text"
                  placeholder="RAM Frequency"
                  name="ramFreq"
                  value={ramFreq}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </label>
          </div>
        </div>

        <h5>SATA</h5>
        <div className="card card-body">
          <div>
            <label htmlFor="SataSlots" className="form-label">
              <div className="input-group">
                <span className="input-group-text">SATA Slots</span>
                <input
                  id="SataSlots"
                  className="form-control"
                  type="text"
                  placeholder="SATA Slots"
                  name="sataSlots"
                  value={sataSlots}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </label>
          </div>
        </div>

        <h5>M.2</h5>
        <div className="card card-body">
          <div>
            <label htmlFor="M2Gen4Slots" className="form-label">
              <div className="input-group">
                <span className="input-group-text">M.2 Gen4 Slots</span>
                <input
                  id="M2Gen4Slots"
                  className="form-control"
                  type="text"
                  placeholder="M.2 Gen4 Slots"
                  name="m2Gen4Slots"
                  value={m2Gen4Slots}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="M2Gen3Slots" className="form-label">
              <div className="input-group">
                <span className="input-group-text">M.2 Gen3 Slots</span>
                <input
                  id="M2Gen3Slots"
                  className="form-control"
                  type="text"
                  placeholder="M.2 Gen3 Slots"
                  name="m2Gen3Slots"
                  value={m2Gen3Slots}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </label>
          </div>
        </div>
        <div>
          <Buttons.Edit type="submit">Submit</Buttons.Edit>
          <Link to="/motherboard">
            <Buttons.Cancel type="button">Cancel</Buttons.Cancel>
          </Link>
        </div>
      </Form>
    </Container>
  );
}
