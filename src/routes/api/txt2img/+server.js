import { json } from '@sveltejs/kit';
import { post as dallePost } from './dalle-client';

export function GET(params) {
	return new Response(JSON.stringify(params));
}

export async function POST({ request }) {
	const requestJson = await request.json();
	const { prompt } = requestJson;
	const res = await dallePost(prompt);
	return json(res); //in welcher Form würde ich Bilddaten zurück schicken? Als Text, json oder mime?
}
