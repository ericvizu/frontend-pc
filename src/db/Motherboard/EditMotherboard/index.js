import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Buttons, Edit } from '../../../styles/GlobalStyles';
import { loadEntity, updateEntity } from '../../functions';

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
    updateEntity('motherboard', id, motherboard);
    navigate('/motherboard');
  };

  // GET Motherboards and load the page
  useEffect(() => {
    const loadMotherboards = () => {
      loadEntity('motherboard', id).then((m) => setMotherboards(m));
    };
    loadMotherboards();
  }, [id]);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1> Change Motherboard </h1>
        </div>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <h3>
          Please change the Motherboard infos and press Submit, or press Cancel
          to go back.
        </h3>
        <h5>Name</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="brand">
              <Edit.Div>
                <Edit.Span>Brand</Edit.Span>
                <Edit.Input
                  type="text"
                  id="brand"
                  value={brand}
                  placeholder="Brand"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="name">
              <Edit.Div>
                <Edit.Span>Name</Edit.Span>
                <Edit.Input
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
        </Edit.Card>

        <h5>CPU</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="socket">
              <Edit.Div>
                <Edit.Span>Socket</Edit.Span>
                <Edit.Input
                  type="text"
                  id="socket"
                  value={socket}
                  placeholder="Socket"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
        </Edit.Card>

        <h5>RAM</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="ramGen">
              <Edit.Div>
                <Edit.Span>RAM Gen</Edit.Span>
                <Edit.Input
                  type="text"
                  id="ramGen"
                  value={ramGen}
                  placeholder="RAM Gen"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="ramSlots">
              <Edit.Div>
                <Edit.Span>RAM Slots</Edit.Span>
                <Edit.Input
                  type="number"
                  id="ramSlots"
                  value={ramSlots}
                  placeholder="RAM Slots"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="ramFreq">
              <Edit.Div>
                <Edit.Span>RAM Frequency (MHz)</Edit.Span>
                <Edit.Input
                  type="number"
                  id="ramFreq"
                  value={ramFreq}
                  placeholder="RAM Frequency"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
        </Edit.Card>

        <h5>SATA</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="sataSlots">
              <Edit.Div>
                <Edit.Span>SATA Slots</Edit.Span>
                <Edit.Input
                  type="number"
                  id="sataSlots"
                  value={sataSlots}
                  placeholder="SATA Slots"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
        </Edit.Card>

        <h5>M.2</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="m2Gen4Slots">
              <Edit.Div>
                <Edit.Span>M.2 Gen4 Slots</Edit.Span>
                <Edit.Input
                  type="number"
                  id="m2Gen4Slots"
                  value={m2Gen4Slots}
                  placeholder="M.2 Gen4 Slots"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="m2Gen3Slots">
              <Edit.Div>
                <Edit.Span>M.2 Gen3 Slots</Edit.Span>
                <Edit.Input
                  type="number"
                  id="m2Gen3Slots"
                  value={m2Gen3Slots}
                  placeholder="M.2 Gen3 Slots"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
        </Edit.Card>
        <div>
          <Buttons.Edit type="submit">Submit</Buttons.Edit>
          <Link to="/motherboard">
            <Buttons.Cancel type="button">Cancel</Buttons.Cancel>
          </Link>
        </div>
      </form>
    </Container>
  );
}
