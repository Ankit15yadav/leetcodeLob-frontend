import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream } from 'ai';
import toast from 'react-hot-toast';

const GeminiResponse = ({ response, setGemini }) => {
    const [roast, setRoast] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [isGrilling, setIsGrilling] = useState(false);
    const [isCheering, setIsCheering] = useState(false);

    const genAI = new GoogleGenerativeAI("AIzaSyB3xi3WWKTzUG8826PFvWvsMYwoJloQnUo" || '');

    function cleanUpText(text) {
        return text.replace(/"/g, ' ').trim();
    }

    async function streamToText(stream) {
        const reader = stream.getReader();
        let result = '';
        let done = false;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = streamDone;
            if (value) {
                const chunk = new TextDecoder().decode(value);
                result += chunk;
            }
        }

        const text = result
            .replace(/\\n/g, ' ')
            .replace(/\\0/g, '')
            .replace(/0:/g, ' ');

        return cleanUpText(text);
    }

    const onSubmit = async (promptToUse, isRoast) => {

        if (isRoast) {
            setIsGrilling(true);
        }
        else {
            setIsCheering(true);
        }

        toast.loading("loading...")
        try {
            const geminiStream = await genAI
                .getGenerativeModel({ model: 'gemini-pro' })
                .generateContentStream(promptToUse);

            const stream = GoogleGenerativeAIStream(geminiStream);
            const answer = await streamToText(stream);
            setGemini(answer);

        } catch (error) {
            console.error("An unexpected error occurred", error);
            return Response.json({
                success: false,
                message: "gemini API error",
            }, { status: 500 });
        }

        setIsGrilling(false);
        setIsCheering(false);
        toast.dismiss();
    };

    const handleButtonClick = (isRoast) => {
        setRoast(isRoast);
        const prompt = `
        Generate a personalized and detailed praise for a user based on their LeetCode profile data. The profile includes the following information: 

        - User's Name: ${response.matchedUser?.username}
        - Total Questions Solved: ${response?.matchedUser?.submitStats?.acSubmissionNum[0].count}
        - Easy Questions Solved: ${response?.matchedUser?.submitStats?.acSubmissionNum[1].count}
        - Medium Questions Solved: ${response?.matchedUser?.submitStats?.acSubmissionNum[2].count}
        - Hard Questions Solved: ${response?.matchedUser?.submitStats?.acSubmissionNum[3].count}
        - Global Ranking: ${response?.matchedUser?.profile?.ranking}
        - Badges Earned: ${response?.matchedUser?.badges?.length}

        The praise should highlight the user's dedication,
        skill level, and achievements in algorithm and data
        structure problem-solving. Emphasize their strengths in solving different 
        levels of questions, particularly noting their ability in hard problems. Acknowledge their global ranking as an indicator of their competitive edge and commitment to continuous improvement. Celebrate any unique badges that showcase exceptional skills or contributions to the LeetCode community. Encourage them to keep pushing their limits and recognize their potential to achieve even greater heights in coding challenges. The response should be engaging, motivating, and reflect a deep appreciation of their hard work and accomplishments.
        the number of characters in the response should not be more than 1000 and must be more than 500
        `;

        const prompt2 = `
        Generate a humorous roast based on the following LeetCode profile information:
        User's Name: ${response.matchedUser?.username}
        - Total Questions Solved: ${response?.matchedUser?.submitStats?.acSubmissionNum[0].count}
        - Easy Questions Solved: ${response?.matchedUser?.submitStats?.acSubmissionNum[1].count}
        - Medium Questions Solved: ${response?.matchedUser?.submitStats?.acSubmissionNum[2].count}
        - Hard Questions Solved: ${response?.matchedUser?.submitStats?.acSubmissionNum[3].count}
        - Global Ranking: ${response?.matchedUser?.profile?.ranking}
        - Badges Earned: ${response?.matchedUser?.badges?.length}

        The roast should incorporate the following elements:

        1. **Light-hearted Sarcasm**: Use playful sarcasm to highlight the disparity between the number of easy and hard questions solved, poking fun at the user’s choice of challenges.
        2. **Ranking Humor**: Make a joke about the user’s global ranking, suggesting that they might need to step it up if they want to be recognized in the coding community.
        3. **Badge Banter**: Comment on the badges earned, teasing the user about how they collected them like Pokémon, but still struggle with the basics.
        4. **Question Count Quip**: Jokingly question how they managed to solve a certain number of problems yet still have a questionable skill level in coding.
        5. **Encouragement with a Twist**: End with a humorous note suggesting that there’s always room for improvement, while making a funny remark about how they should probably stick to watching coding tutorials instead.

        Make sure the tone is friendly and humorous, don't avoid any mean-spirited comments while still being pointed and witty.
        the number of characters in the response should not be more than 1000 and must be more than 500
        `;

        // Call the onSubmit function with the correct prompt
        onSubmit(isRoast ? prompt2 : prompt, isRoast);
    };

    return (
        <div className='flex justify-between w-11/12 mx-auto mt-6'>
            <button onClick={() => handleButtonClick(true)}
                className=' w-fit px-4 py-2 bg-red-500 rounded-md'
            >
                {
                    isGrilling ? ('Grilling...') : ('Grill Me')
                }
            </button>
            <button onClick={() => handleButtonClick(false)}
                className=' w-fit px-4 py-2 bg-emerald-500 rounded-md'
            >
                {
                    isCheering ? ('Cheering...') : ('Cheer Me')
                }
            </button>
        </div>
    );
};

export default GeminiResponse;



