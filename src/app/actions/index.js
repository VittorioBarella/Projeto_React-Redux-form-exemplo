import {
	GET_CLIENTES,
	ADD_CLIENTE,
	UPDATE_CLIENTE,
	REMOVE_CLIENTE,
	SET_CLIENTE,
	SET_ORDENACAO,
	SET_PESQUISA
} from './types';

const getDate = () => new Date().getTime();

const generateId = () => Math.floor(Math.random() * 100000 + 100000);

const prepararCliente = (cliente) => {
	const id = generateId();
	const criadoEm = getDate();
	const atualizadoEm = getDate();
	return { ...cliente, id, criadoEm, atualizadoEm };
}

// LocalStorage

const _save = (field, value) => localStorage.setItem(field, JSON.stringify(value))
const _get = (field) => JSON.parse(localStorage.getItem(field))

const _getClientes = () => _get('@aplicacao:clientes') || []
const _addCliente = (cliente) => {
	const clientes = _getClientes()
	const data = clientes.concat([cliente])
	_save('@aplicacao:clientes', data);
	return cliente;
}
const _updateCliente = (id, cliente) => {
	const clientes = _getClientes()
	const data = clientes.map((_cliente) => _cliente.id === id ? { id, ...cliente, atualizadoEm: getDate() } : _cliente);
	_save('@aplicacao:clientes', data);
	return { id, ...cliente, atualizadoEm: getDate() };
}
const _removeCliente = (id) => {
	const clientes = _getClientes()
	const data = clientes.filter((_cliente) => _cliente.id !== id);
	_save('@aplicacao:clientes', data);
	return id;
}

// Final LocalStorage

export const getClientes = () => ({ type: GET_CLIENTES, data: _getClientes() });

export const addCliente = (cliente) => ({ type: ADD_CLIENTE, cliente: _addCliente(prepararCliente(cliente)) });

export const updateCliente = (id, cliente) => ({ type: UPDATE_CLIENTE, cliente: _updateCliente(id, cliente) });

export const removeCliente = (id) => ({ type: REMOVE_CLIENTE, id: _removeCliente(id) });

// ACTIONS DE APOIO

export const setClienteParaAlterar = (cliente) => ({ type: SET_CLIENTE, cliente })

export const setOrdenacao = (ev) => ({ type: SET_ORDENACAO, ordenacao: ev.target.value })

export const setPesquisa = (ev) => ({ type: SET_PESQUISA, pesquisa: ev.target.value })