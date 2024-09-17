import React from 'react';
import { motion } from 'framer-motion';
import logo from "../assets/logo.png";
import LeetCodeProfile from './LeetCodeProfile';
import git from "../assets/git hub.jpeg"

const Home = () => {
    return (
        <>
            <section className="text-white min-h-screen w-full pt-40 p-2 relative flex items-center justify-center flex-col">
                <div className='absolute inset-0'>
                    <img src={logo} className='w-40 h-24 text-white shadow-xl' />
                </div>

                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
                <div className='flex flex-col items-center justify-center'>
                    <motion.p
                        className="text-transparent font-semibold text-xl bg-gradient-to-r from-teal-200 to-purple-400 bg-clip-text"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Welcome to <span>LeetcodeLob</span>
                    </motion.p>
                    <motion.p
                        className='max-w-4xl text-center mt-3 text-sm text-gray-300'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        "LeetCodeLob is your ultimate destination for a fun and engaging take on your LeetCode journey.
                        Whether you're seeking a boost of motivation or a playful nudge to up your game, LeetCodeLob has got you covered."
                    </motion.p>
                </div>
                <div className='mt-10 relative'>
                    <LeetCodeProfile />
                </div>
                <div className='fixed bottom-4 right-4'>
                    <a href="https://github.com/Ankit15yadav" target='_blank' rel='noopener noreferrer'>
                        <img src={git} alt="GitHub" className='w-10 h-10 rounded-full' />
                    </a>
                </div>

            </section >
        </>
    )
}

export default Home;
