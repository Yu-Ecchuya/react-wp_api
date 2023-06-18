export const fetchAPI = () => {
	const apiUrl = process.env.REACT_APP_API_URL;
	const endpoint = `${apiUrl}/wp-json/wp/v2/pages`;
	const promise = fetch(endpoint);

	return promise.then(res => res.json())
	.then(data => {
		return data;
	}).catch(error => {
		console.log(error);
		return null;
	})
};
