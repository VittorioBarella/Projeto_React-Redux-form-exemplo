import React from 'react';

import Ordenacao from './ordenacao';
import Pesquisa from './pesquisa';
import Formulario from '../formulario';
import ListaClientes from './lista';

const Opcoes = () => (
	<div className="Opcoes flex horizontal">
		<div>
			<Pesquisa />
		</div>
		<div>
			<Ordenacao />
		</div>
	</div>
)

export default class Listagem extends React.Component {
	render(){
		return (
			<div className="Listagem">
				<div className="Header">
					<h2>Lista de Clientes</h2>
				</div>
				<hr />
				<Formulario />
				<br />
				<Opcoes />
				<br />
				<hr />
				<ListaClientes />
			</div>
		)
	}
}