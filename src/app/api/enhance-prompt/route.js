import OpenAI from 'openai';

export async function POST(request) {
  try {
    const { prompt, apiKey } = await request.json();

    if (!prompt || !apiKey) {
      return Response.json(
        { error: 'Prompt and API key are required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert prompt engineer. Your task is to enhance user prompts to make them more effective, detailed, and specific for AI interactions. 

Guidelines for enhancement:
- Make prompts more specific and detailed
- Add context that helps AI understand the task better
- Include output format specifications when helpful
- Add examples or templates when appropriate
- Ensure clarity and remove ambiguity
- Maintain the original intent while making it more powerful
- Add relevant constraints or parameters that improve results

Please enhance the following prompt while keeping it practical and usable:`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const enhancedPrompt = completion.choices[0].message.content;

    return Response.json({ enhancedPrompt });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error.status === 401) {
      return Response.json(
        { error: 'Invalid API key. Please check your OpenAI API key.' },
        { status: 401 }
      );
    }
    
    if (error.status === 429) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return Response.json(
      { error: 'An error occurred while enhancing the prompt. Please try again.' },
      { status: 500 }
    );
  }
}