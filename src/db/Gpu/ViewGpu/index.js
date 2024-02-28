import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tables, Buttons, Container } from '../../../styles/GlobalStyles';
import { loadEntity } from '../../functions';

export default function ViewRam() {
  // Empty values so that loadRams function has time to update "ram.stock.quantity"
  const [ram, setRams] = useState({
    brand: '',
    name: '',
    gen: '',
    size: '',
    freq: '',
    latency: '',
    stock: '',
  });

  // Get ID from URL
  const { id } = useParams();

  // GET Ram from database and load the page
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
          <h1>
            {ram.brand} {ram.name} (id: {ram.id}) (stock: {ram.stock.quantity})
          </h1>
        </div>
        <div className="col">
          <Link to="/ram">
            <Buttons.Cancel type="button">Return</Buttons.Cancel>
          </Link>
        </div>
      </div>
      <Tables.View>
        <tbody>
          <tr>
            <th>Brand:</th>
            <th>{ram.brand}</th>
          </tr>
          <tr>
            <th>Name:</th>
            <th>{ram.name}</th>
          </tr>
          <tr>
            <th>Generation:</th>
            <th>{ram.gen}</th>
          </tr>
          <tr>
            <th>Size:</th>
            <th>{ram.size} gb</th>
          </tr>
          <tr>
            <th>Frequency:</th>
            <th>{ram.freq} MHz</th>
          </tr>
          <tr>
            <th>Latency:</th>
            <th>{ram.latency}</th>
          </tr>
        </tbody>
      </Tables.View>
    </Container>
  );
}
