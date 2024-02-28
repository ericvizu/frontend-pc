import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Buttons, Edit } from '../../../styles/GlobalStyles';
import { loadEntity, updateEntity } from '../../functions';

export default function EditGpu() {
  const navigate = useNavigate();

  // Get ID from URL
  const { id } = useParams();

  // Empty values to be updated after GET
  const [gpu, setGpus] = useState({
    brand: '',
    name: '',
    baseClock: '',
    boostClock: '',
    vramSize: '',
    vramGen: '',
    tdp: '',
  });

  const { brand, name, baseClock, boostClock, vramSize, vramGen, tdp } = gpu;

  // Changes value from where is being written
  const onInputChange = (e) => {
    setGpus({ ...gpu, [e.target.name]: e.target.value });
  };

  // PUT Gpu with new values where the old one was
  const onSubmit = async (e) => {
    e.preventDefault();
    updateEntity('gpu', id, gpu);
    navigate('/gpu');
  };

  // GET Gpus and load the page
  useEffect(() => {
    const loadGpus = () => {
      loadEntity('gpu', id).then((m) => setGpus(m));
    };
    loadGpus();
  }, [id]);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1> Change GPU </h1>
        </div>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <h3>
          Please change the Gpu infos and press Submit, or press Cancel to go
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

        <h5>Clock</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="baseClock">
              <Edit.Div>
                <Edit.Span>Base Clock (MHz)</Edit.Span>
                <Edit.Input
                  type="number"
                  id="baseClock"
                  value={baseClock}
                  placeholder="Base Clock"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="boostClock">
              <Edit.Div>
                <Edit.Span>Boost Clock (MHz)</Edit.Span>
                <Edit.Input
                  type="number"
                  id="boostClock"
                  value={boostClock}
                  placeholder="Boost Clock"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
        </Edit.Card>

        <h5>VRAM</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="vramSize">
              <Edit.Div>
                <Edit.Span>VRAM Size (gb)</Edit.Span>
                <Edit.Input
                  type="number"
                  id="vramSize"
                  value={vramSize}
                  placeholder="VRAM Size"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="vramGen">
              <Edit.Div>
                <Edit.Span>VRAM Generation</Edit.Span>
                <Edit.Input
                  type="text"
                  id="vramGen"
                  value={vramGen}
                  placeholder="VRAM Generation"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
        </Edit.Card>

        <h5>Energy</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="tdp">
              <Edit.Div>
                <Edit.Span>TDP (W)</Edit.Span>
                <Edit.Input
                  type="number"
                  id="tdp"
                  value={tdp}
                  placeholder="TDP"
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
