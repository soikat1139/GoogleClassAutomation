const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey:"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",
});
const openai = new OpenAIApi(configuration);


async function getCompletion() {
    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`This is a test prompt:`,
            max_tokens: 200,
            temperature: 0.7,
          });
          
    
          console.log(response.data.choices[0].text);
          return response.data.choices[0].text;
          }
    
    catch(err){
        console.log(err);
    }

   

}
getCompletion();

      