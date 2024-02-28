import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Buttons, Edit } from '../../../styles/GlobalStyles';
import { loadEntity, updateEntity } from '../../functions';

export default function EditCpu() {
  const navigate = useNavigate();

  // Get ID from URL
  const { id } = useParams();

  // Empty values to be updated after GET
  const [cpu, setCpus] = useState({
    brand: '',
    name: '',
    socket: '',
    cores: '',
    threads: '',
    tdp: '',
    stock: '',
  });

  const { brand, name, socket, cores, threads, tdp } = cpu;

  // Changes value from where is being written
  const onInputChange = (e) => {
    setCpus({ ...cpu, [e.target.name]: e.target.value });
  };

  // PUT Cpu with new values where the old one was
  const onSubmit = async (e) => {
    e.preventDefault();
    updateEntity('cpu', id, cpu);
    navigate('/cpu');
  };

  // GET Cpus and load the page
  useEffect(() => {
    const loadCpus = () => {
      loadEntity('cpu', id).then((m) => setCpus(m));
    };
    loadCpus();
  }, [id]);

  return (
    <Container>
      <div className="row">
        <div className="col-md-auto">
          <h1> Change CPU </h1>
        </div>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <h3>
          Please change the CPU infos and press Submit, or press Cancel to go
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

        <h5>Socket</h5>
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

        <h5>Core</h5>
        <Edit.Card>
          <div>
            <Edit.Label htmlFor="cores">
              <Edit.Div>
                <Edit.Span>CPU Cores</Edit.Span>
                <Edit.Input
                  type="number"
                  id="cores"
                  value={cores}
                  placeholder="CPU Cores"
                  onChange={(e) => onInputChange(e)}
                />
              </Edit.Div>
            </Edit.Label>
          </div>
          <div>
            <Edit.Label htmlFor="threads">
              <Edit.Div>
                <Edit.Span>CPU Threads</Edit.Span>
                <Edit.Input
                  type="number"
                  id="threads"
                  value={threads}
                  placeholder="CPU Threads"
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
