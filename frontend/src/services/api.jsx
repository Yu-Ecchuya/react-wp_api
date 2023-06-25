const apiUrl = process.env.REACT_APP_API_URL;
const user = process.env.REACT_APP_WP_USER_NAME;
const password = process.env.REACT_APP_WP_PASSWORD;

// WP APIの取得
export const fetchAPI =  async () => {
	try {
		const tokenEndpoint = `${apiUrl}/wp-json/jwt-auth/v1/token`;
		const wpEndpoint = `${apiUrl}/wp-json/wp/v2/pages`;
		const editPageEndpoint = `${wpEndpoint}?status=private`;

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

		// EditPage Contents
		const editPageResponse = await fetch(editPageEndpoint, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		if(!wpResponse.ok) {
			throw new Error('Failed to fetch WP API Data...');
		} else if(!editPageResponse.ok) {
			throw new Error('Failed to fetch Edit Page Data...');
		}

		const publicPage = await wpResponse.json();
		const privatePage = await editPageResponse.json();

		// SNS Information
		const instagramInfo = [];
		privatePage.map((index) => {
			const acf = index['acf'];

			// Instagram
			if(acf['instagram_isPublish']) {
				delete acf['instagram_isPublish'];
				const objLength = Object.keys(acf).length;
				for (let i = 0; i < objLength; i++) {
					const instagramId = acf[`instagram_id--${i + 1}`];
					// 値が空のものは除外
					if(instagramId) {
						instagramInfo.push(instagramId);
					}
				}
			}
		});

		const data = {
			pages: publicPage,
			snsData: instagramInfo
		};

		return data;

	} catch(error) {
		return null;
	}
};
