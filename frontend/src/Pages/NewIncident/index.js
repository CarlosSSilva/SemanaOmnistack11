import React, {useState} from 'react';
import{Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoimg from '../../assets/logo.svg';

export default function NewIncident(){
    const [tittle, setTittle] = useState('');
    const [description, setDescription] =useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongID = localStorage.getItem('ongID');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            tittle,
            description,
            value,
        }
        try {
          await api.post('incidents', data, {
              headers: {
                  Authorization: ongID,
              }
          })

          history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoimg} alt="Be The Hero" />

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Preencha corretamente todos os campos para poder encontrar o seu HERÓI</p>
                
                    <Link className="back-link" to="/profile">
                     <FiArrowLeft size={16} color="#E02041" />
                     Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Titulo do caso"
                       value={tittle}
                       onChange={e => setTittle(e.target.value)}
                        />
                    <textarea placeholder="Descrição"
                       value={description}
                       onChange={e => setDescription(e.target.value)}
                        />
                    <input placeholder="Valor em Reais"
                       value={value}
                       onChange={e => setValue(e.target.value)}
                        />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}