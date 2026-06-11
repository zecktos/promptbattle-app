//import { Configuration, OpenAIApi } from 'openai';
import OpenAI from "openai";
import { OPENAI_API_KEY } from '$env/static/private';
import { writeFileSync } from "fs";
import { randomInt } from "crypto";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function createImage(prompt, id) {
  if (prompt) {
    console.log('****** Prompt******: ', prompt);
    if (!OPENAI_API_KEY) throw Error('OPENAI_API_KEY missing!');
    //if (!prompt) throw Error('Prompt is missing'); //Fix how to do error-stuff in Sveltekit?
    console.log('...Calling Dalle API...');
    const response = await openai.images.generate({
      model: "gpt-image-1-mini",
      quality: "low",
      prompt: prompt,
      n: 2,
      size: '1024x1024'
    });
    //const imageUrlPublic = response.data.data[0].url
    // console.log(response)
    let finalImages = [];
    for (let i = 0; i < response.data.length; i++) {
      //finalImages.push("data:image/png;base64, " + response.data[i].b64_json);
      let data = response.data[i].b64_json
      let cleanPrompt = prompt.replace(/\s/g, '')
      let filePath = "/" + String(id) + "/" + cleanPrompt.substring(0, 18) + String(randomInt(100, 999)) + String(i) + ".png"
      let fileSavePath = "./static" + filePath
      writeFileSync(fileSavePath, data, 'base64', function (err) {
        console.log(err);
      });

      finalImages.push(filePath);
    }
    return { images: finalImages };
  }
  else {
    console.log("######## empty Promtp return no img #########")
    return { images: ["/oopsie.png"] };
  }
}
