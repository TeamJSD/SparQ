import axios from 'axios';

export default function login(data) {
	return (data) => axios.post('localhost:3000/signup', data)
	.then((response) => console.log(response))
	.catch((err) => console.log(err));
}