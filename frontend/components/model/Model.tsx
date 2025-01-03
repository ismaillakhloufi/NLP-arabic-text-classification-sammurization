// Features.tsx
'use client'
import React, { useState } from 'react';
import LeftCard from './LeftCard';
import RightCard from './RightCard';

export default function Model() {
    const [tab, setTab] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    
    const [responseText, setResponseText] = useState("");

    return (
        <section className="">
            {/* Section background (needs .relative class on parent and next sibling elements) */}
            <div className="absolute inset-0 bg-gray-100 pointer-events-none mb-16" aria-hidden="true"></div>
            <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
                <div className="pt-12 md:pt-20">
                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h1 className="h2 mb-4">Explore the solutions</h1>
                        <p className="text-xl text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p>
                    </div>


                    


                    {/* Section content */}
                    <div className="md:flex md:gap-1" style={{justifyContent:"center"}}>
                        {/* Left Card */}
                        <LeftCard tab={tab} setResponseText={setResponseText} setTab={setTab} setLoading={setLoading} />

                        {/* Right Card */}
                        <RightCard responseText={responseText} loading={loading}/>
                    </div>
                </div>
            </div>
        </section>
    );
}
