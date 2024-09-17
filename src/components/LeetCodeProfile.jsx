import React, { useState } from 'react';
import axios from 'axios';
import GeminiResponse from './GeminiResponse';

function LeetCodeProfile() {
    const [username, setUsername] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [errResponse, setErrResponse] = useState(false);
    const [gemini, setGemini] = useState('');
    const [loading, setLoading] = useState(false);
    const [badges, setBadges] = useState(false);

    const imageDAta = [
        {
            id: 1,
            img: profileData?.matchedUser?.badges[2]?.icon
        },
        {
            id: 2,
            img: profileData?.matchedUser?.badges[1]?.icon
        },
        {
            id: 3,
            img: profileData?.matchedUser?.badges[0]?.icon
        },
    ]

    const fetchProfileData = async () => {
        setGemini("");
        setLoading(true);
        try {
            const response = await axios.get(`https://leetcode-lob-ankit.vercel.app/api/leetcode/${username}`);

            console.log(response?.data);

            if (response?.data?.recentSubmissionList.length <= 0) {
                setErrResponse(true);
                setProfileData(null);
            } else {
                setErrResponse(false);
                setProfileData(response.data);
            }

        } catch (error) {
            console.error('Error fetching profile data', error);
            setErrResponse(true);
        }
        setLoading(false);

    };

    return (
        <div className='text-white flex flex-col items-center gap-x-4 justify-center'>
            <div className=' flex gap-x-4'>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter LeetCode username"
                    className=' text-black  p-2 rounded-md font-serif'
                />
                <button onClick={fetchProfileData}
                    className='w-fit px-3 py-1 font-semibold bg-green-400 rounded-md'
                    disabled={loading}
                >{
                        loading ? ('Fetching....') : ('Fetch Profile')
                    }
                </button>
            </div>

            <div className=' mt-6 flex gap-x-2'>
                {
                    profileData?.matchedUser?.badges.length > 0 ?
                        (
                            imageDAta.map((badge) => (
                                <img
                                    src={badge.img}
                                    key={badge.id}
                                    className=' animate-pulse'
                                    width={100}
                                />
                            ))
                        )
                        :
                        ('')
                }
            </div>

            <div className=' flex flex-col mt-9 justify-start'>
                {!errResponse && profileData && (
                    <div className='w-11/12 mx-auto text-center flex flex-col justify-center items-center'>
                        <p className=' max-w-xl text-center'>
                            Hello, {profileData?.matchedUser?.profile?.realName}! 🤔 Ready for a dose of virtual
                            sass or a hearty pat on the back? How do you want to be treated today: like a coding superstar
                            or a lovable underdog in need of a friendly roast? 😄
                        </p>
                        {
                            <GeminiResponse response={profileData} setGemini={setGemini} roast={true} />
                        }
                        {gemini && (
                            <div className='w-11/12 mx-auto text-sm text-gray-400 mt-3 tracking-wide bg-gray-800 p-4 rounded-lg leading-loose'>
                                <p>
                                    {gemini}
                                </p>
                            </div>
                        )}
                    </div>

                )}



            </div>
            {
                errResponse && (
                    <h1 className='font-bold  text-3xl text-center'>No user exists with this name</h1>
                )
            }
        </div >
    );
}

export default LeetCodeProfile;

