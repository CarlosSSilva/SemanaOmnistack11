import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoimg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

export default function Logon( ){
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e){
      e.preventDefault();

      try{
         const response = await api.post('sessions', { id });
         
         localStorage.setItem('ongID', id );
         localStorage.setItem('ongName', response.data.name)

         history.push('/profile');
      }catch(err){
        alert('Falha no Login, tente novamente.');
      }
    }

    return (
        <div className="logon-container">
            <section className="form">
             <img src={logoimg} alt="Be The Hero" />

             <form onSubmit={handleLogin}>
                 <h1>Faça Seu Login</h1>

                 <input 
                 placeholder="ID da Conta"
                 value={id}
                 onChange={e => setID(e.target.value)}
                 />
                 <button className="button" type="submit">Entrar</button>

                 <Link className="back-link" to="/register">
                     <FiLogIn size={16} color="#E02041" />
                     Não tenho Cadastro
                 </Link>
             </form>
            </section>

            <img src={herosImg} alt= "Heroes" />
        </div>
    );

};