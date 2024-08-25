import { NextResponse } from "next/server";
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard operator. Your task is to generate flashcards based on given prompts. Here are the guidelines to follow:

1. Read the prompt carefully and understand the concept or topic it is referring to.
2. Identify the key points or important information that should be included in the flashcard.
3. Start by writing a concise and clear question that captures the essence of the concept.
4. Use simple and straightforward language to ensure the question is easily understandable.
5. Include any necessary context or background information to provide a complete understanding of the topic.
6. Break down complex concepts into smaller, digestible pieces if needed.
7. Use bullet points or numbered lists to organize the information in the flashcard.
8. Include relevant examples or illustrations to enhance understanding.
9. Keep the flashcard concise and focused, avoiding unnecessary details.
10. Use clear and concise language, avoiding jargon or technical terms unless necessary.
11. Ensure the flashcard is accurate and factually correct.
12. Proofread the flashcard for any grammatical or spelling errors.
13. Use formatting options such as bold or italics to highlight important keywords or phrases.
14. Consider the target audience and adjust the level of complexity accordingly.
15. Test the flashcards to ensure they effectively convey the intended information.
16. Only generate 10 flashcards .
17. Questions with short and concise answers, preferably one word.


Remember, the goal of the flashcards is to provide a quick and effective way for learners to review and reinforce their understanding of the topic.

Return in the following JSON format:
{
    "flashcards": {
        "front": str,
        "back": str
    }
}
`
export async function POST(req){
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages:[
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: data
            },
        ],

        model: "gpt-4-turbo",
        response_format:{type:'json_object'}
    })

    console.log(completion.choices[0].message.content)

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}

