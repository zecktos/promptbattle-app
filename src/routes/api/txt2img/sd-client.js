import { SD_API_URL } from '$env/static/private';

const WIDTH = 512;
const HEIGHT = 512;


function createRequestBody(prompt, width, height) {
	return {
		prompt: prompt,
		width: width,
		height: height,
		batch_size: 1,
		send_images: true,
		save_images: false,
	}
}

export async function createImage(prompt) {
	if (!SD_API_URL) throw Error('SD_API_URL missing!');
	const bodyContent = createRequestBody(prompt, WIDTH, HEIGHT);
	const response = await fetch(`${SD_API_URL}/sdapi/v1/txt2img`, {
		credentials: 'omit',
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:108.0) Gecko/20100101 Firefox/108.0',
			Accept: '*/*',
			'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
			'Content-Type': 'application/json',
			'Sec-Fetch-Dest': 'empty',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Site': 'same-origin'
		},
		referrer: SD_API_URL,
		body: JSON.stringify(bodyContent),
		method: 'POST',
		mode: 'cors'
	});
	if (!response.ok) {
		if (response.status === 404) {
			throw Error(`Gradio: No interface is running right now`);
		}
		try {
			const responseJson = await response.json();
			console.log(responseJson);
			const errorMessage = JSON.stringify(responseJson);
			console.log(
				`SD API response was not ok. Maybe automatic111 has changed the interface? SD API says: ${errorMessage}`
			);
			throw Error(`SD API Response: ${errorMessage}`);
		} catch (error) {
			throw Error(`SD API Response: ${error}`);
		}
	}

	const responseJson = await response.json();
	//console.log(responseJson.images[0]);
	const imageUrlPublic = "data:image/gif;base64," + responseJson.images[0];

	return { url: imageUrlPublic };
}
