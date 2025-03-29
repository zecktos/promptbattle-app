//import { Configuration, OpenAIApi } from 'openai';
import OpenAI from "openai";
import { OPENAI_API_KEY } from '$env/static/private';


const openai = new OpenAI({apiKey: OPENAI_API_KEY});

export async function createImage(prompt) {
	if (prompt) {
		console.log('****** Prompt******: ', prompt);
		if (!OPENAI_API_KEY) throw Error('OPENAI_API_KEY missing!');
		//if (!prompt) throw Error('Prompt is missing'); //Fix how to do error-stuff in Sveltekit?
		console.log('...Calling Dalle API...');
		const response = await openai.images.generate({
			model: "dall-e-2",
			prompt: prompt,
			n: 2,
			size: '1024x1024'
		});
		//const imageUrlPublic = response.data.data[0].url
		let finalImages = [];
		for(let i = 0; i < response.data.length; i++){
			finalImages.push(response.data[i].url);
		}
		return { images: finalImages};
	}
	else{
		console.log("######## empty Promtp return no img #########")
		return { images: ["/oopsie.png"]};
	}
}
