import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
});

export const fetchData = async ( url , options = {}) => {
	try {
		const response = await axiosInstance(url, options);
		return response.data;
	} catch (error) {
		console.error('Ошибка:', error);
		throw new Error('Не удалось получить данные');
	}
};