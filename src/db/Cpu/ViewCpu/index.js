import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tables, Buttons, Container } from '../../../styles/GlobalStyles';
import { loadEntity } from '../../functions';

export default function ViewCpu() {
  // Empty values so that loadCpus function has time to update "cpu.stock.quantity"
  const [cpu, setCpus] = useState({
    brand: '',
    name: '',
    socket: '',
    cores: '',
    threads: '',
    tdp: '',
    stock: '',
  });

  // Get ID from URL
  const { id } = useParams();

  // Hook for navigation
  const navigate = useNavigate();

  // GET Cpu from database and load the page
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
          <h1>
            {cpu.brand} {cpu.name} (id: {cpu.id}) (stock: {cpu.stock.quantity})
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
            <th>{cpu.brand}</th>
          </tr>
          <tr>
            <th>Name:</th>
            <th>{cpu.name}</th>
          </tr>
          <tr>
            <th>Socket:</th>
            <th>{cpu.socket}</th>
          </tr>
          <tr>
            <th>Cores:</th>
            <th>{cpu.cores}</th>
          </tr>
          <tr>
            <th>Threads:</th>
            <th>{cpu.threads}</th>
          </tr>
          <tr>
            <th>TDP:</th>
            <th>{cpu.tdp} W</th>
          </tr>
        </tbody>
      </Tables.View>
    </Container>
  );
}
