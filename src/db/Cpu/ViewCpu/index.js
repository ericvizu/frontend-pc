import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tables, Buttons, Container } from '../../../styles/GlobalStyles';
import { loadEntity } from '../../functions';

export default function ViewCpu() {
  // Empty values so that loadCpus function has time to update "cpu.stock.quantity"
  const [cpu, setCpus] = useState({
    brand: '',
    name: '',
    socket: '',
    ramGen: '',
    ramSlots: '',
    ramFreq: '',
    sataSlots: '',
    m2Gen4Slots: '',
    m2Gen3Slots: '',
    stock: '',
  });

  // Get ID from URL
  const { id } = useParams();

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
          <Link to="/cpu">
            <Buttons.Cancel type="button">Return</Buttons.Cancel>
          </Link>
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
            <th>RAM Gen:</th>
            <th>{cpu.ramGen}</th>
          </tr>
          <tr>
            <th>RAM Slots:</th>
            <th>{cpu.ramSlots}</th>
          </tr>
          <tr>
            <th>RAM Fequency:</th>
            <th>{cpu.ramFreq} MHz</th>
          </tr>
          <tr>
            <th>Sata Slots:</th>
            <th>{cpu.sataSlots}</th>
          </tr>
          <tr>
            <th>M.2 Gen4 Slots:</th>
            <th>{cpu.m2Gen4Slots}</th>
          </tr>
          <tr>
            <th>M.2 Gen3 Slots:</th>
            <th>{cpu.m2Gen3Slots}</th>
          </tr>
        </tbody>
      </Tables.View>
    </Container>
  );
}
