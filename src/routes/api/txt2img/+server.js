import { json, error } from '@sveltejs/kit';
import { createImage as sdCreateImage } from './sd-client';
import { createImage as dalleCreateImage } from './dalle-client';

export function GET(params) {
	return new Response(JSON.stringify(params));
}

export async function POST({ request }) {
	const requestJson = await request.json();
	const { prompt } = requestJson;
	const engine = import.meta.env.VITE_IMAGE_ENGINE;

	if (!engine) {
		throw error(500, { message: 'Unknown image generation engine!' });
	}
	let createImage;
	switch (engine) {
		case 'sd':
			createImage = sdCreateImage;
			break;
		case 'dalle':
			createImage = dalleCreateImage;
			break;
		default:
			throw error(500, { message: 'Unknown image generation engine!' });
	}
	try {
		const res = await createImage(prompt);
		return json(res); //TODO: Add types! {url: 'my-url.png'}
	} catch (err) {
		console.log(err);
		throw error(500, { message: 'There was a problem accessing the image generation API' });
	}
}
