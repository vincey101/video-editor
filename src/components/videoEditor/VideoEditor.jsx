import React, { useState, useRef } from 'react';
import './videoEditor.css';
import Sidebar from '../sidebar/Sidebar';
import Preview from '../preview/Preview';

const VideoEditor = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [elements, setElements] = useState([]);
    const [video, setVideo] = useState('');
    const [fileName, setFileName] = useState('');

    const fileInputRef = useRef();

    const handleUrlChange = (e) => {
        setVideoUrl(e.target.value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedVideo(URL.createObjectURL(file));
            setVideoUrl(''); // Clear the YouTube URL input field
            setVideo(''); // Clear the video state
            setFileName(file.name); // Set the file name
        }
    };

    const handleFetchVideo = () => {
        if (videoUrl) {
            // Extract video ID from URL
            const url = new URL(videoUrl);
            const videoId = url.searchParams.get('v') || url.pathname.split('/').pop();

            // Create iframe URL
            const iframeUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

            setVideo(iframeUrl);
            setUploadedVideo(null); // Clear the uploaded video
            fileInputRef.current.value = ''; // Clear the input file field
        }
    };

    const addElement = (element) => {
        setElements([...elements, element]);
    };

    return (
        <div className="editor-container">
            <Sidebar
                onAddElement={addElement}
                elements={elements}
                setElements={setElements}
                videoUrl={video || uploadedVideo} // Pass the correct videoUrl
            />
            <div className="editor-content">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Enter YouTube URL"
                        value={videoUrl}
                        onChange={handleUrlChange}
                    />
                    <button className='fetch-url' onClick={handleFetchVideo}>Fetch Video</button>
                </div>
                <div className="file-text">
                    <input type="file" onChange={handleFileUpload} ref={fileInputRef} />
                    <span>Drag and Drop text or image element around the video canvas</span>
                </div>

                <Preview
                    videoUrl={video || uploadedVideo} // Ensure videoUrl is correctly passed
                    elements={elements}
                    isIframe={!!video}
                />
            </div>
        </div>
    );
};

export default VideoEditor;