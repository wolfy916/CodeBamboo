import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class GptService {
  private readonly openAIApi: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      organization: process.env.GPT_ORG_ID,
      apiKey: process.env.GPT_API_KEY,
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  async callGpt(){
    console.log('gptservice')
  try {
    
    const response = await this.openAIApi.createCompletion({
      model: "text-davinci-003",
      prompt: "폭죽 1개가 펑펑 터지는 컴포넌트의 html, css, js를 각각 작성해줘. 3000토큰 이내로 작성해줘.",
      max_tokens: 3900,
      temperature: 0,
    });
    const answer = response.data.choices[0].text
    console.log(answer)
    const markedResponse = answer.replace(/\n\nHTML/g, '@@@HTML').replace(/\n\nCSS/g, '@@@CSS').replace(/\n\nJS/g, '@@@JS').split('@@@');

    const html = markedResponse.find(section => section.startsWith('HTML')).replace('HTML\n', '');
    const css = markedResponse.find(section => section.startsWith('CSS')).replace('CSS\n', '');
    const js = markedResponse.find(section => section.startsWith('JS')).replace('JS\n', '');
    
    console.log('HTML:', html);
    console.log('CSS:', css);
    console.log('JS:', js);

    return { 
      html,
      css,
      js
    };
  } catch (error) {
    console.log(error) 
  }
  }

  async viewModels(){
    const response = await this.openAIApi.listModels();
    console.log(response.data)
    return { result: response.data };
  }
}