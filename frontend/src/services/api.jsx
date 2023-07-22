const apiUrl = process.env.REACT_APP_API_URL;
const user = process.env.REACT_APP_WP_USER_NAME;
const password = process.env.REACT_APP_WP_PASSWORD;

/**
 * SNS情報の取得
 * 1. WP APIの取得（非公開ページ）
 * 2. Instagram APIの取得
 */
export const snsAPI =  async () => {
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

		const privatePage = await editPageResponse.json();

		// SNS Information
		const snsUserInfo = [];
		privatePage.map((index) => {
			const acf = index['acf'];

			// Instagram Datas
			if(acf['instagram_isPublish']) {
				delete acf['instagram_isPublish'];
				const objLength = Object.keys(acf).length;
				for (let i = 0; i < objLength; i++) {
					const instagramId = acf[`instagram_id--${i + 1}`];
					const instagramToken = acf[`instagram_access_token--${i + 1}`];

					// ID&TOKENに値がある場合のみ取得
					if(instagramId && instagramToken) {
						const instagram_id = `instagram_id--${i + 1}`;
						const instagram_access_token = `instagram_access_token--${i + 1}`;

						snsUserInfo.push(
							{
								[`${instagram_id}`]: instagramId,
								[`${instagram_access_token}`]: instagramToken,
							}
						);
					}
				}
			}
		});

		const instagramDataPromises = snsUserInfo.map(index => {
			const keyName = Object.keys(index);
			const instagramID = index[ keyName[0] ];
			const instagramTOKEN = index[ keyName[1] ];
			const url = `https://graph.facebook.com/v17.0/${instagramID}?access_token=${instagramTOKEN}&fields=name,media{caption,like_count,media_url,permalink,timestamp,username}`;

			return fetch(url)
			.then(response => response.json())
			.then(json => json.media.data)
			.catch(error => console.error(error));
		});

		const instagramData = await Promise.all(instagramDataPromises)
			.then(result => {
				return result[0];
			}).catch(error => {
				console.error(error);
				throw error;
			});

		return instagramData;

	} catch(error) {
		return null;
	}
};