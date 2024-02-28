import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tables, Buttons, Container } from '../../../styles/GlobalStyles';
import { loadEntity } from '../../functions';

export default function ViewGpu() {
  // Empty values so that loadGpus function has time to update "gpu.stock.quantity"
  const [gpu, setGpus] = useState({
    brand: '',
    name: '',
    baseClock: '',
    boostClock: '',
    vramSize: '',
    vramGen: '',
    tdp: '',
    stock: '',
  });

  // Get ID from URL
  const { id } = useParams();

  // Hook for navigation
  const navigate = useNavigate();

  // GET Gpu from database and load the page
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
          <h1>
            {gpu.brand} {gpu.name} (id: {gpu.id}) (stock: {gpu.stock.quantity})
          </h1>
        </div>
        <div className="col">
          <Buttons.Cancel type="button" onClick={() => navigate(-1)}>
            Return
          </Buttons.Cancel>
        </div>
      </div>
      <Tables.View>
        <tbody>
          <tr>
            <th>Brand:</th>
            <th>{gpu.brand}</th>
          </tr>
          <tr>
            <th>Name:</th>
            <th>{gpu.name}</th>
          </tr>
          <tr>
            <th>Base Clock:</th>
            <th>{gpu.baseClock} MHz</th>
          </tr>
          <tr>
            <th>Boost Clock:</th>
            <th>{gpu.boostClock} MHz</th>
          </tr>
          <tr>
            <th>VRAM Size:</th>
            <th>{gpu.vramSize} gb</th>
          </tr>
          <tr>
            <th>VRAM Generation:</th>
            <th>{gpu.vramGen}</th>
          </tr>
          <tr>
            <th>TDP:</th>
            <th>{gpu.tdp} W</th>
          </tr>
        </tbody>
      </Tables.View>
    </Container>
  );
}
