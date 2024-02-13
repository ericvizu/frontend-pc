import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tables, Buttons, Container } from '../../../styles/GlobalStyles';
import { loadEntity } from '../../functions';

export default function ViewMotherboard() {
  // Empty values so that loadMotherboards function has time to update "motherboard.stock.quantity"
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
    stock: '',
  });

  // Get ID from URL
  const { id } = useParams();

  // GET Motherboard from database and load the page
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
          <h1>
            {motherboard.brand} {motherboard.name} (id: {motherboard.id})
            (stock: {motherboard.stock.quantity})
          </h1>
        </div>
        <div className="col">
          <Link to="/motherboard">
            <Buttons.Cancel type="button">Return</Buttons.Cancel>
          </Link>
        </div>
      </div>
      <Tables.View>
        <tbody>
          <tr>
            <th>Brand:</th>
            <th>{motherboard.brand}</th>
          </tr>
          <tr>
            <th>Name:</th>
            <th>{motherboard.name}</th>
          </tr>
          <tr>
            <th>Socket:</th>
            <th>{motherboard.socket}</th>
          </tr>
          <tr>
            <th>RAM Gen:</th>
            <th>{motherboard.ramGen}</th>
          </tr>
          <tr>
            <th>RAM Slots:</th>
            <th>{motherboard.ramSlots}</th>
          </tr>
          <tr>
            <th>RAM Fequency:</th>
            <th>{motherboard.ramFreq} MHz</th>
          </tr>
          <tr>
            <th>Sata Slots:</th>
            <th>{motherboard.sataSlots}</th>
          </tr>
          <tr>
            <th>M.2 Gen4 Slots:</th>
            <th>{motherboard.m2Gen4Slots}</th>
          </tr>
          <tr>
            <th>M.2 Gen3 Slots:</th>
            <th>{motherboard.m2Gen3Slots}</th>
          </tr>
        </tbody>
      </Tables.View>
    </Container>
  );
}
