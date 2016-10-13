import axios from 'axios';

export default function Signup(data) {
	return (data) => axios.post('/signup', data)
	.then((response) => console.log(response))
	.catch((err) => console.log(err));
}