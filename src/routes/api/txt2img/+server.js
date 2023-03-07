import { json } from '@sveltejs/kit';
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
		throw Error('Image generation engine is not defined!');
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
			throw Error('Unknown image generation engine!');
	}
	const res = await createImage(prompt);
	return json(res); //TODO: Add types! {url: 'my-url.png'}
}
