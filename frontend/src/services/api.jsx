// WP APIの取得
export const fetchAPI =  async () => {
	try {
		const apiUrl = process.env.REACT_APP_API_URL;
		const tokenEndpoint = `${apiUrl}/wp-json/jwt-auth/v1/token`;
		const user = process.env.REACT_APP_WP_USER_NAME;
		const password = process.env.REACT_APP_WP_PASSWORD;
		const wpEndpoint = `${apiUrl}/wp-json/wp/v2/pages`;

		// JWT Token
		const tokenResponse = await fetch(tokenEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: `${user}`,
				password: `${password}`
			})
		});

		if(!tokenResponse.ok) {
			throw new Error('Failed to fetch JWT token...');
		}

		const tokenData = await tokenResponse.json();
		const token = tokenData.token;

		// WP API
		const wpResponse = await fetch(wpEndpoint, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		if(!wpResponse.ok) {
			throw new Error('Failed to fetch WP API Data...');
		}

		const wpData = await wpResponse.json();
		return wpData;

	} catch(error) {
		return null;
	}
};
