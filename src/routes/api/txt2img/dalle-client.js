import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const configuration = new Configuration({
	//organization: OPENAI_ORG_ID,
	apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function createImage(prompt) {
	if (prompt) {
		console.log('****** Prompt******: ', prompt);
		if (!OPENAI_API_KEY) throw Error('OPENAI_API_KEY missing!');
		//if (!prompt) throw Error('Prompt is missing'); //Fix how to do error-stuff in Sveltekit?
		console.log('...Calling Dalle API...');
		const response = await openai.createImage({
			//model: "dall-e-3",
			prompt: prompt,
			n: 1,
			size: '1024x1024'
		});
		const imageUrlPublic = response.data.data[0].url
		return { url: imageUrlPublic };
	}
	else{
		console.log("######## empty Promtp return no img #########");
		return { url: "/oopsie.png"};
	}
}
