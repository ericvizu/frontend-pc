import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Buttons, Edit } from '../../../styles/GlobalStyles';
import { loadEntity, updateEntity } from '../../functions';

export default function EditRam() {
  const navigate = useNavigate();

  // Get ID from URL
  const { id } = useParams();

  // Empty values to be updated after GET
  const [ram, setRams] = useState({
    brand: '',
    name: '',
    gen: '',
    size: '',
    freq: '',
    latency: '',
  });

  const { brand, name, gen, size, freq, latency } = ram;

  // Changes value from where is being written
  const onInputChange = (e) => {
    setRams({ ...ram, [e.target.name]: e.target.value });
  };

  // PUT Ram with new values where the old one was
  const onSubmit = async (e) => {
    e.preventDefault();
    updateEntity('ram', id, ram);
    navigate('/ram');
  };

  // GET Rams and load the page
  useEffect(() => {
    const loadRams = () => {
      loadEntity('ram', id).then((m) => setRams(m));
    };
    loadRams();
  }, [id]);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1> Change Ram </h1>
        </div>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <h3>
          Please change the Ram infos and press Submit, or press Cancel to go
          back.
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

        <h5>Specifications</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="gen">
              <Edit.Div>
                <Edit.Span>Generation</Edit.Span>
                <Edit.Input
                  type="text"
                  id="gen"
                  value={gen}
                  placeholder="Generation"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="size">
              <Edit.Div>
                <Edit.Span>Size (gb)</Edit.Span>
                <Edit.Input
                  type="text"
                  id="size"
                  value={size}
                  placeholder="Size"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="freq">
              <Edit.Div>
                <Edit.Span>Frequency (MHz)</Edit.Span>
                <Edit.Input
                  type="text"
                  id="freq"
                  value={freq}
                  placeholder="Frequency"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="latency">
              <Edit.Div>
                <Edit.Span>Latency</Edit.Span>
                <Edit.Input
                  type="text"
                  id="latency"
                  value={latency}
                  placeholder="Frequency"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
        </Edit.Card>
        <div>
          <Buttons.Edit type="submit">Submit</Buttons.Edit>
          <Buttons.Cancel type="button" onClick={() => navigate(-1)}>
            Cancel
          </Buttons.Cancel>
        </div>
      </form>
    </Container>
  );
}
