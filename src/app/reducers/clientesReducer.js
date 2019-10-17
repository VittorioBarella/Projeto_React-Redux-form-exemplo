import {
	GET_CLIENTES,
	ADD_CLIENTE,
	UPDATE_CLIENTE,
	REMOVE_CLIENTE,
	SET_CLIENTE,
	SET_ORDENACAO,
	SET_PESQUISA
} from '../actions/types';

export default (state = { ordenacao: "a-z" }, action) => {
	switch(action.type){
		case GET_CLIENTES:
			return {
				...state,
				clientes: action.data
			};
		case ADD_CLIENTE:
			return {
				...state,
				clientes: state.clientes.concat([action.cliente])
			};
		case UPDATE_CLIENTE:
			return {
				...state,
				cliente: null,
				clientes: state.clientes.map((_cliente) => ( _cliente.id === action.cliente.id ) ? action.cliente : _cliente )
			};
		case REMOVE_CLIENTE:
			return {
				...state,
				clientes: state.clientes.filter((_cliente) => _cliente.id !== action.id )
			};
		case SET_CLIENTE:
			return {
				...state,
				cliente: action.cliente
			}
		case SET_ORDENACAO:
			return {
				...state,
				ordenacao: action.ordenacao
			}
		case SET_PESQUISA:
			return {
				...state,
				pesquisa: action.pesquisa
			}
		default:
			return state;
	}
}