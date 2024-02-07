import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tables, Buttons, Container } from '../../../styles/GlobalStyles';

export default function ViewMotherboard() {
  const [motherboard, setMotherboards] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const loadMotherboards = async () => {
      const result = await axios.get(`http://localhost:8080/motherboard/${id}`);
      setMotherboards(result.data);
    };
    loadMotherboards();
  }, [id]);

  return (
    <Container>
      <h1>
        {motherboard.brand} {motherboard.name} (id: {motherboard.id}) (stock:{' '}
        {motherboard.stock.quantity})
        <Link to="/motherboard">
          <Buttons.Cancel type="button">Return</Buttons.Cancel>
        </Link>
      </h1>
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
