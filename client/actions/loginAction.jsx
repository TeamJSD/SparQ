import axios from 'axios';

export default function login(data) {
	return (data) => axios.post('localhost:3000/login', data);
}