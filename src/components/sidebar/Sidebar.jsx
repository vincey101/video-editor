import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = ({ onAddElement, elements, setElements, videoUrl }) => {
    const [text, setText] = useState('');
    const [color, setColor] = useState('#000');
    const [editing, setEditing] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);
    const [showTextInput, setShowTextInput] = useState(false);
    const [showImageInput, setShowImageInput] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [timer, setTimer] = useState({ start: 0, end: 0 });

    const handleAddTimer = () => {
        setShowTimer(true);
    };

    const handleSetTimer = (event) => {
        const { name, value } = event.target;
        setTimer({ ...timer, [name]: parseInt(value) });
    };

    const handleSaveTimer = () => {
        const updatedElements = elements.map((element) => ({
            ...element,
            timer: { start: timer.start, end: timer.end },
        }));
        setElements(updatedElements);
        setShowTimer(false);
    };

    const handleAddText = () => {
        if (editing) {
            const updatedElements = elements.map((element) =>
                element === selectedElement ? { ...element, content: text, color } : element
            );
            setElements(updatedElements);
        } else {
            if (!elements.some(el => el.type === 'text')) {
                onAddElement({ type: 'text', content: text, color });
            }
        }
        setText('');
        setColor('#000');
        setEditing(false);
        setShowTextInput(false);
    };

    const handleEditText = (element) => {
        setText(element.content);
        setColor(element.color);
        setSelectedElement(element);
        setShowTextInput(true);
        setEditing(true);
    };

    const handleAddImage = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        if (elements.some(el => el.type === 'image')) {
            const updatedElements = elements.map((element) =>
                element.type === 'image' ? { ...element, url: imageUrl } : element
            );
            setElements(updatedElements);
        } else {
            onAddElement({ type: 'image', url: imageUrl });
        }
        setShowImageInput(false);
    };

    const handleEditImage = (element) => {
        setEditing(true);
        setSelectedElement(element);
        setShowImageInput(true);
    };


    const handleDownload = async () => {
        const projectData = {
            videoUrl,
            elements, // Include text, images, positions, timers
        };

        try {
            const response = await fetch('https://video-api-e778.onrender.com/api/save-video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();

            if (text) {
                const data = JSON.parse(text);
                if (data.videoUrl) {
                    // Create a download link and click it programmatically
                    const link = document.createElement('a');
                    link.href = data.videoUrl;
                    link.download = 'custom_video.mp4';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } else {
                console.error('Empty response received');
            }
        } catch (error) {
            console.error('Error downloading video:', error);
        }
    };

    return (
        <div className="sidebar">
            <h3>Dashboard</h3>

            {!elements.some(el => el.type === 'text') && (
                <button className='sidebar-text' onClick={() => setShowTextInput(true)}>
                    Add Text
                </button>
            )}

            {showTextInput && (
                <div>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='sidebar-input'
                    />
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <button className='sidebar-text' onClick={handleAddText}>
                        {editing ? 'Save Changes' : 'Save Text'}
                    </button>
                </div>
            )}

            {elements.map((element, index) => (
                <div key={index}>
                    {element.type === 'text' && (
                        <div>
                            <button className='sidebar-text' onClick={() => handleEditText(element)}>
                                Edit Text
                            </button>
                        </div>
                    )}

                    {element.type === 'image' && (
                        <div>
                            <button className='sidebar-text' onClick={() => handleEditImage(element)}>
                                Change Image
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {!elements.some(el => el.type === 'image') && (
                <button className='sidebar-text' onClick={() => setShowImageInput(true)}>
                    Add Image
                </button>
            )}

            {showImageInput && (
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAddImage}
                    />
                </div>
            )}

            <button className="sidebar-text" onClick={handleAddTimer}>
                Text/Image Timer
            </button>

            {showTimer && (
                <div>
                    <input
                        type="number"
                        name="start"
                        value={timer.start}
                        onChange={handleSetTimer}
                        placeholder="Start time (seconds)"
                    />
                    <input
                        type="number"
                        name="end"
                        value={timer.end}
                        onChange={handleSetTimer}
                        placeholder="End time (seconds)"
                    />
                    <button className="sidebar-text" onClick={handleSaveTimer}>
                        Save Timer
                    </button>
                </div>
            )}

            <button className="sidebar-text" onClick={handleDownload}>
                Download Video
            </button>
        </div>
    );
};

export default Sidebar;