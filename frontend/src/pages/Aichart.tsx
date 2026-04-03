import React from 'react';

const Aichart: React.FC = () => {
    const handleClick = () => {
        // Open in a new tab using window.open()
        window.open('http://localhost:5174/', '_blank');
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                AI Chart Analyzer
            </button>
        </div>
    );
};

export default Aichart;