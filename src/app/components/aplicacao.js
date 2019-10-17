import React from 'react';

import Listagem from './clientes/listagem';

class Aplicacao extends React.Component {
	render(){
		return (
			<div className="Aplicacao">
				<Listagem />
			</div>
		)
	}
}

export default Aplicacao;