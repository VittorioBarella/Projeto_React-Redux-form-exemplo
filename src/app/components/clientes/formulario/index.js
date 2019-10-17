import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

const Input = (props) => (
	<div className="Input">
		{ props.label &&<label>{props.label}</label> }
		<input 
			value={props.value}
			onChange={props.onChange}
			placeholder={props.placeholder}
			type={props.type || "text"} />
		{ props.erro && <small>{props.erro}</small> }
	</div>
)

const DEFAULT_STATE = {
		form: {
			nome: "",
			email: "",
			telefone: "",
			cpf: ""
		},
		erros: {},
		mostrarForm: false
	};

class Formulario extends React.Component {

	state = DEFAULT_STATE

	componentWillUpdate(nextProps){
		if( !this.props.cliente && nextProps.cliente ){
			this.setState({
				form: nextProps.cliente,
				erros: {},
				mostrarForm: true
			})
		}
		if( this.props.cliente && !nextProps.cliente ){
			this.setState(DEFAULT_STATE)
		}
	}

	mostrarForm = () => {
		this.setState({ mostrarForm: !this.state.mostrarForm })
	}

	validar = () => {
		const { form } = this.state;
		const erros = {};
		[ "nome", "telefone","cpf","email" ].forEach((item) => {
			if(!form[item]) erros[item] = "Digite o "+item;
		})
		this.setState({ erros })
		return Object.keys(erros).length === 0;
	}

	onChange = (field, ev) => {
		const { form } = this.state;
		form[field] = ev.target.value;
		this.setState({ form }, () => {
			this.validar();
		})
	}

	handleSubmit = () => {
		if( !this.validar() ) return null;
		const { form } = this.state;
		const { cliente } = this.props;

		if( cliente ) this.props.updateCliente(cliente.id, form)
		else this.props.addCliente(form);
	
		this.setState(DEFAULT_STATE)
	}

	renderFormulario(){
		const { form, erros } = this.state
		return (
			<div className="Formulario">
				<div>
					<Input
						value={form.nome}
						onChange={(ev) => this.onChange('nome',ev)}
						label={"Nome"} erro={erros.nome} />
					<Input
						value={form.telefone}
						onChange={(ev) => this.onChange('telefone',ev)}
						label={"Telefone"} erro={erros.telefone} />
					<Input
						value={form.cpf}
						onChange={(ev) => this.onChange('cpf',ev)}
						label={"CPF"} erro={erros.cpf} />
					<Input
						value={form.email}
						onChange={(ev) => this.onChange('email',ev)}
						label={"Email"}
						type={"email"} erro={erros.email} />
					<div>
						<button onClick={this.handleSubmit} className="botao botao-verde">
							Salvar
						</button>
						<button onClick={this.mostrarForm} className="botao botao-branco">
							Cancelar
						</button>
					</div>
				</div>
			</div>
		)
	}

	renderBotao(){
		return (
			<div className="Formulario">
				<button onClick={this.mostrarForm} className="botao botao-azul">
					+ ADICIONAR CLIENTE
				</button>
			</div>
		)
	}

	render(){
		return this.state.mostrarForm ? this.renderFormulario() : this.renderBotao();
	}
}

const mapStateToProps = state => ({
	cliente: state.clientes.cliente
})

export default connect(mapStateToProps, actions)(Formulario);