// LeftCard.tsx
import axios from 'axios';
import { useState, FormEvent, useEffect } from 'react';

interface LeftCardProps {
    setResponseText: (text: string) => void;
    tab: number;
    setTab: (tab: number) => void;
    setLoading: (loading: boolean) => void;
    
}

const LeftCard: React.FC<LeftCardProps> = ({ tab, setTab,setResponseText ,setLoading}) => {
    const [Text, setText] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        
    };

    
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization':'Token '+token } : {};

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/api/prediction/",{'text':Text}, { headers });
            setResponseText(response.data); // Update parent state
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };





    return (
        <div className="md:w-1/2l flex justify-center bg-white shadow-md border-gray-300 bg-clip-border rounded-xl ">
            <div className="w-full max-w-md p-6">
                <h3 className="h3 mb-3">Choose Options</h3>
                <div className="flex mb-4">
                    <button className={`btn-sm ${tab === 1 ? 'bg-gray-900 text-white' : 'text-gray-600 bg-gray-200'} hover:bg-gray-700 hover:text-gray-200`} onClick={() => setTab(1)}>Past Text</button>
                    <button className={`btn-sm ${tab === 2 ? 'bg-gray-900 text-white' : 'text-gray-600 bg-gray-200'} hover:bg-gray-700 hover:text-gray-200 ml-3`} onClick={() => setTab(2)}>Upload File</button>
                    <button className={`btn-sm ${tab === 3 ? 'bg-gray-900 text-white' : 'text-gray-600 bg-gray-200'} hover:bg-gray-700 hover:text-gray-200 ml-3`} onClick={() => setTab(3)}>Add URL</button>
                </div>
                {tab === 1 && (
                    <div className="mb-4">
                        <textarea
                            value={Text}
                            onChange={handleChange}
                            placeholder="Enter past text"
                            className="border border-gray-300 rounded-lg w-full px-3 py-2 mb-3 resize-none"
                            rows={6}
                        ></textarea>
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>{Text.length} characters</span>
                        </div>
                    </div>
                )}
                {tab === 2 && (
                    <div className="flex items-center mb-4">
                        <input type="file" accept=".txt" className="hidden" id="fileInput" />
                        <label htmlFor="fileInput" className="cursor-pointer btn-sm bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 py-2 px-4 rounded-lg flex items-center">
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3h9v2H3V3zm0 4h9v2H3V7zm0 4h9v2H3v-2zm18-7H13v22h8V3zm-2 20h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4v-2h4v2z"/></svg>
                            Choose File
                        </label>
                    </div>
                )}
                {tab === 3 && (
                    <div>
                        <input type="url" placeholder="Enter URL" className="border border-gray-300 rounded-lg w-full px-3 py-2 mb-3" />
                    </div>
                )}
                <div className="mt-auto">
                    <button type="submit" className='btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 rounder-lg' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default LeftCard;
