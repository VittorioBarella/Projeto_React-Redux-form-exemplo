import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Ordenacao extends React.Component {

	render(){
		const { ordenacao: valor } = this.props
		return (
			<div className="Ordenacao">
				<label>Ordenar por </label>
				<select
					value={valor || "a-z"}
					onChange={this.props.setOrdenacao} >
					<option value="a-z">Alfabética de A-Z</option>
					<option value="z-a">Alfabética de Z-A</option>
					<option value="criacao">Data de criação</option>
				</select>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	ordenacao: state.clientes.ordenacao
})

export default connect(mapStateToProps, actions)(Ordenacao);