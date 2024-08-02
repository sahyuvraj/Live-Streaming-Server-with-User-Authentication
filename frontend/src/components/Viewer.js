import React, { useEffect, useRef } from 'react';

function Viewer() {
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchStream = async () => {
            try {
                const response = await fetch('https://live-streaming-server-with-user.onrender.com'); // Replace with actual stream endpoint
                if (response.ok) {
                    const stream = await response.blob();
                    const url = URL.createObjectURL(stream);
                    videoRef.current.src = url;
                }
            } catch (err) {
                console.error('Error:', err);
            }
        };

        fetchStream();

        return () => {
            if (videoRef.current) {
                URL.revokeObjectURL(videoRef.current.src);
            }
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} width="100%" height="auto" controls autoPlay />
        </div>
    );
}

export default Viewer;
