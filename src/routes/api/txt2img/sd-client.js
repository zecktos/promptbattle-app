import { SD_API_URL } from '$env/static/private';

function createRequestBody(prompt, width, height) {
	return {
		data: [
			prompt,
			'',
			'None',
			'None',
			20,
			'Euler a',
			false,
			false,
			1,
			1,
			7,
			-1,
			-1,
			0,
			0,
			0,
			false,
			height,
			width,
			false,
			0.7,
			2,
			'Latent',
			0,
			0,
			0,
			'None',
			false,
			false,
			false,
			false,
			'',
			'Seed',
			'',
			'Nothing',
			'',
			true,
			false,
			false,
			[
				{
					data: 'file=/home/jovyan/stable-diffusion-webui/outputs/txt2img-images/00006-800103704-A cat with a hat.png',
					is_file: true,
					name: '/home/jovyan/stable-diffusion-webui/outputs/txt2img-images/00006-800103704-A cat with a hat.png'
				}
			],
			'{"prompt": "A cat with a hat", "all_prompts": ["A cat with a hat"], "negative_prompt": "", "all_negative_prompts": [""], "seed": 800103704, "all_seeds": [800103704], "subseed": 4012033325, "all_subseeds": [4012033325], "subseed_strength": 0, "width": 512, "height": 512, "sampler_name": "Euler a", "cfg_scale": 7, "steps": 20, "batch_size": 1, "restore_faces": false, "face_restoration_model": null, "sd_model_hash": "81761151", "seed_resize_from_w": 0, "seed_resize_from_h": 0, "denoising_strength": null, "extra_generation_params": {}, "index_of_first_image": 0, "infotexts": ["A cat with a hat\\nSteps: 20, Sampler: Euler a, CFG scale: 7, Seed: 800103704, Size: 512x512, Model hash: 81761151"], "styles": ["None", "None"], "job_timestamp": "20230307101407", "clip_skip": 1, "is_using_inpainting_conditioning": false}',
			'<p>A cat with a hat<br>\nSteps: 20, Sampler: Euler a, CFG scale: 7, Seed: 800103704, Size: 512x512, Model hash: 81761151</p>',
			"<p></p><div class='performance'><p class='time'>Time taken: <wbr>14.02s</p><p class='vram'>Torch active/reserved: 3161/3690 MiB, <wbr>Sys VRAM: 5131/19968 MiB (25.7%)</p></div>"
		],
		fn_index: 66,
		session_hash: 'cy2jhq2q2be'
	};
}

export async function createImage(prompt) {
	if (!SD_API_URL) throw Error('SD_API_URL missing!');
	const bodyContent = createRequestBody(prompt, 400, 300);
	const response = await fetch(`${SD_API_URL}/run/predict/`, {
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
	const responseJson = await response.json();
	const imageUrlLocal = responseJson.data[0][0].name;
	const imageUrlPublic = `${SD_API_URL}/file=${imageUrlLocal}`;
	return { url: imageUrlPublic };
}
