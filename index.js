import openai from "./config/open_ai.js";
import readlineSync from "readline-sync";
import colors from "colors";
async function main() {
  console.log(colors.bold.green("welcome to Pseudo Chatbot"));
  console.log(colors.bold.green("you can start chatting with bot."));
  const chatHisory=[];
  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));
    try {
        const messages = chatHisory.map(([role, content]) => ({ role, content }));
        messages.push({ role: 'user', content: userInput });

        const completion=await openai.createChatCompletion({
            model:'gpt-3.5-turbo',
            messages:messages,
        })
        // get complettion text /context 
        const completionText=completion.data.choices[0].message.content;
      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green('Bot: ') + completionText);
        return;
      }
      console.log(colors.green('Bot: ') + completionText);
      chatHisory.push(['user',userInput]);
      chatHisory.push(['assistant', completionText]);

    } catch (error) {
      console.error(colors.red(error));
    }
  }
}
main();
