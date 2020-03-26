import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.svg';

export default () => {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  if (!ongId) return history.push('/');

  useEffect(() => {
    api
      .get('profile', { headers: { Authorization: ongId } })
      .then(response => {
        setIncidents(response.data);
      })
      .catch(() => alert('Erro ao carregar a página.'));
  }, [ongId]);

  const handleDeleteIncident = id =>
    api
      .delete(`incidents/${id}`, { headers: { Authorization: ongId } })
      .then(() => setIncidents(incidents.filter(incident => incident.id !== id)))
      .catch(() => alert('Erro ao deletar caso, tente novamente.'));

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(({ id, title, description, value }) => (
          <li key={id}>
            <strong>CASO: </strong>
            <p>{title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}</p>
            <button type="button" onClick={() => handleDeleteIncident(id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
