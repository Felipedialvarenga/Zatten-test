import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createAssistant = async () => {
    const assistant = await openai.beta.assistants.create({
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4o",
    });
    console.log(assistant);
    return assistant;
  };

export const getAssistant = async () => {
  const assistants = await openai.beta.assistants.list();
  return assistants.data[0];
};

export const createThread = async () => {
    const thread = await openai.beta.threads.create();
    return thread;
  };
  
export const getThread = async ( threadId: string) => {
    const thread = await openai.beta.threads.retrieve(threadId);
    return thread;
  };
  
export const deleteThread = async ( threadId: string) => {
    const response = await openai.beta.threads.del(threadId);
    return response;
  };

export const createMessage = async ( { threadId, content }: { threadId: string, content: string }) => {
    const messages = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    });
    return messages;
  };

export const getMessages = async (threadId: string) => {
  const messages = await openai.beta.threads.messages.list(threadId);
  return messages;
};

  export const createRunStream = async ( { assistantId, threadId }: { assistantId: string, threadId: string, instructions: string }) => {
    const run = openai.beta.threads.runs.stream(threadId, {
        assistant_id: assistantId
      })
        .on('textCreated', () => process.stdout.write('\nassistant > '))
        .on('textDelta', (textDelta) => process.stdout.write(textDelta.value!))
        .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
        .on('toolCallDelta', (toolCallDelta) => {
          if (toolCallDelta.type === 'code_interpreter') {
            if (toolCallDelta.code_interpreter?.input) {
              process.stdout.write(toolCallDelta.code_interpreter.input);
            }
            if (toolCallDelta.code_interpreter?.outputs) {
              process.stdout.write("\noutput >\n");
              toolCallDelta.code_interpreter?.outputs.forEach(output => {
                if (output.type === "logs") {
                  process.stdout.write(`\n${output.logs}\n`);
                }
              });
            }
          }
        });
        
    return run;
  };

  export const createRun = async ({ assistantId, threadId }: { assistantId: string, threadId: string }) => {
    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId
      });
    return run;
  };

  export const getRun = async (threadId: string, runId: string) => {
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    return run;
  };
