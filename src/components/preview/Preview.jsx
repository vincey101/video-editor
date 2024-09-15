// import React from 'react';
// import './preview.css';

// const Preview = ({ videoUrl, elements, isIframe }) => {
//     return (
//         <div className="preview-container">
//             {videoUrl ? (
//                 <div className="video-wrapper">
//                     {isIframe ? (
//                         <iframe
//                             src={videoUrl}
//                             frameBorder="0"
//                             allowFullScreen
//                             allow="autoplay"
//                             width="100%"
//                             height="490px"
//                         />
//                     ) : (
//                         <video src={videoUrl} controls />
//                     )}
//                     {elements.map((el, idx) => (
//                         <div key={idx} className={`element-${el.type}`} style={{
//                             position: 'absolute',
//                             // Set different positions for text and image
//                             top: el.type === 'text' ? '50%' : '50%',
//                             left: el.type === 'text' ? '10%' : '50%',
//                             transform: el.type === 'image' ? 'translate(-50%, -50%)' : 'translate(0, -50%)',
//                             color: el.color
//                         }}>
//                             {el.type === 'text' && (
//                                 <div>{el.content}</div>
//                             )}
//                             {el.type === 'image' && <img src={el.url} alt="Custom" style={{ maxWidth: '100%' }} />}
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No video selected.</p>
//             )}
//         </div>
//     );
// };

// export default Preview;



// import React, { useState,useEffect } from 'react';
// import './preview.css';

// const Preview = ({ videoUrl, elements, isIframe }) => {
//     const [showElements, setShowElements] = useState({});

//     useEffect(() => {
//         elements.forEach((element) => {
//             if (element.timer) {
//                 const startTime = element.timer.start * 1000; // convert seconds to milliseconds
//                 const endTime = element.timer.end * 1000; // convert seconds to milliseconds

//                 setTimeout(() => {
//                     setShowElements((prevShowElements) => ({
//                         ...prevShowElements,
//                         [element.type]: true,
//                     }));
//                 }, startTime);

//                 setTimeout(() => {
//                     setShowElements((prevShowElements) => ({
//                         ...prevShowElements,
//                         [element.type]: false,
//                     }));
//                 }, endTime);
//             }
//         });
//     }, [elements]);

//     return (
//         <div className="preview-container">
//             {videoUrl ? (
//                 <div className="video-wrapper">
//                     {isIframe ? (
//                         <iframe
//                             src={videoUrl}
//                             frameBorder="0"
//                             allowFullScreen
//                             allow="autoplay"
//                             width="100%"
//                             height="490px"
//                         />
//                     ) : (
//                         <video src={videoUrl} controls />
//                     )}
//                     {elements.map((el, idx) => (
//                         <div key={idx}>
//                             {(showElements[el.type] || !el.timer) && (
//                                 <div
//                                     className={`element-${el.type}`}
//                                     style={{
//                                         position: 'absolute',
//                                         // Set different positions for text and image
//                                         top: el.type === 'text' ? '50%' : '50%',
//                                         left: el.type === 'text' ? '10%' : '50%',
//                                         transform:
//                                             el.type === 'image'
//                                                 ? 'translate(-50%, -50%)'
//                                                 : 'translate(0, -50%)',
//                                         color: el.color,
//                                     }}
//                                 >
//                                     {el.type === 'text' && <div>{el.content}</div>}
//                                     {el.type === 'image' && (
//                                         <img
//                                             src={el.url}
//                                             alt="Custom"
//                                             style={{ maxWidth: '100%' }}
//                                         />
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No video selected.</p>
//             )}
//         </div>
//     );
// };

// export default Preview;


// import React, { useState, useEffect } from 'react';
// import Draggable from 'react-draggable'; // Import Draggable
// import './preview.css';

// const Preview = ({ videoUrl, elements, isIframe }) => {
//     const [showElements, setShowElements] = useState({});

//     useEffect(() => {
//         elements.forEach((element) => {
//             if (element.timer) {
//                 const startTime = element.timer.start * 1000; // convert seconds to milliseconds
//                 const endTime = element.timer.end * 1000; // convert seconds to milliseconds

//                 setTimeout(() => {
//                     setShowElements((prevShowElements) => ({
//                         ...prevShowElements,
//                         [element.type]: true,
//                     }));
//                 }, startTime);

//                 setTimeout(() => {
//                     setShowElements((prevShowElements) => ({
//                         ...prevShowElements,
//                         [element.type]: false,
//                     }));
//                 }, endTime);
//             }
//         });
//     }, [elements]);

//     const handleDragStop = (e, data, idx) => {
//         const updatedElements = [...elements];
//         updatedElements[idx] = {
//             ...updatedElements[idx],
//             left: `${(data.x / e.target.offsetParent.offsetWidth) * 100}%`,
//             top: `${(data.y / e.target.offsetParent.offsetHeight) * 100}%`,
//         };
//         // Update elements with new positions here (e.g., using a method from props)
//         // Example: setElements(updatedElements);
//         console.log('Updated element positions:', updatedElements[idx]);
//     };

//     return (
//         <div className="preview-container">
//             {videoUrl ? (
//                 <div className="video-wrapper" >
//                     {isIframe ? (
//                         <iframe
//                             src={videoUrl}
//                             frameBorder="0"
//                             allowFullScreen
//                             allow="autoplay"
//                             width="100%"
//                             height="100%"
//                         />
//                     ) : (
//                         <video src={videoUrl} controls />
//                     )}
//                     {elements.map((el, idx) => (
//                         <Draggable
//                             key={idx}
//                             bounds="parent"
//                             onStop={(e, data) => handleDragStop(e, data, idx)}
//                             defaultPosition={{
//                                 x: el.left ? (parseFloat(el.left) / 100) * document.querySelector('.video-wrapper').offsetWidth : 0,
//                                 y: el.top ? (parseFloat(el.top) / 100) * document.querySelector('.video-wrapper').offsetHeight : 0
//                             }}
//                         >
//                             <div
//                                 className={`element-${el.type}`}
//                                 style={{
//                                     position: 'absolute',
//                                     cursor: 'move',
//                                     color: el.color,
//                                     top: el.top || '50%',
//                                     left: el.left || '10%',
//                                 }}
//                             >
//                                 {el.type === 'text' && <div>{el.content}</div>}
//                                 {el.type === 'image' && <img src={el.url} alt="Custom" style={{ maxWidth: '100%' }} />}
//                             </div>
//                         </Draggable>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No video selected.</p>
//             )}
//         </div>
//     );
// };

// export default Preview;

// import React, { useState, useEffect } from 'react';
// import Draggable from 'react-draggable'; // Import Draggable
// import './preview.css';

// const Preview = ({ videoUrl, elements, isIframe }) => {
//     const [showElements, setShowElements] = useState({});
//     const [positions, setPositions] = useState({}); // State to store the positions of elements

//     useEffect(() => {
//         elements.forEach((element, idx) => {
//             if (!element.timer) {
//                 setShowElements((prevShowElements) => ({
//                     ...prevShowElements,
//                     [idx]: true, // Show element if no timer is set
//                 }));
//             } else {
//                 // Initially hide the element
//                 setShowElements((prevShowElements) => ({
//                     ...prevShowElements,
//                     [idx]: false,
//                 }));

//                 const startTime = element.timer.start * 1000; // convert seconds to milliseconds
//                 const endTime = element.timer.end * 1000; // convert seconds to milliseconds

//                 // Show element at the start time and restore position
//                 setTimeout(() => {
//                     setShowElements((prevShowElements) => ({
//                         ...prevShowElements,
//                         [idx]: true,
//                     }));
//                 }, startTime);

//                 // Hide element at the end time and store its position
//                 setTimeout(() => {
//                     setShowElements((prevShowElements) => ({
//                         ...prevShowElements,
//                         [idx]: false,
//                     }));
//                 }, endTime);
//             }
//         });
//     }, [elements]);

//     const handleDragStop = (e, data, idx) => {
//         const updatedElements = [...elements];
//         const newLeft = (data.x / e.target.offsetParent.offsetWidth) * 100;
//         const newTop = (data.y / e.target.offsetParent.offsetHeight) * 100;

//         // Update the position in the elements array
//         updatedElements[idx] = {
//             ...updatedElements[idx],
//             left: `${newLeft}%`,
//             top: `${newTop}%`,
//         };

//         // Store the current position in the `positions` state
//         setPositions((prevPositions) => ({
//             ...prevPositions,
//             [idx]: { left: newLeft, top: newTop },
//         }));

//         // Log updated element positions (you may use a callback to update the parent state if needed)
//         console.log('Updated element positions:', updatedElements[idx]);
//     };

//     return (
//         <div className="preview-container">
//             {videoUrl ? (
//                 <div className="video-wrapper">
//                     {isIframe ? (
//                         <iframe
//                             src={videoUrl}
//                             frameBorder="0"
//                             allowFullScreen
//                             allow="autoplay"
//                             width="100%"
//                             height="100%"
//                         />
//                     ) : (
//                         <video src={videoUrl} controls />
//                     )}
//                     {elements.map((el, idx) => (
//                         <Draggable
//                             key={idx}
//                             bounds="parent"
//                             onStop={(e, data) => handleDragStop(e, data, idx)}
//                             defaultPosition={{
//                                 // Use stored position if it exists, otherwise use the initial position
//                                 x: (positions[idx]?.left / 100) * document.querySelector('.video-wrapper').offsetWidth || (el.left ? (parseFloat(el.left) / 100) * document.querySelector('.video-wrapper').offsetWidth : 0),
//                                 y: (positions[idx]?.top / 100) * document.querySelector('.video-wrapper').offsetHeight || (el.top ? (parseFloat(el.top) / 100) * document.querySelector('.video-wrapper').offsetHeight : 0),
//                             }}
//                         >
//                             <div
//                                 className={`element-${el.type}`}
//                                 style={{
//                                     position: 'absolute',
//                                     cursor: 'move',
//                                     color: el.color,
//                                     top: el.top || '50%',
//                                     left: el.left || '10%',
//                                     display: showElements[idx] ? 'block' : 'none', // Control visibility
//                                 }}
//                             >
//                                 {el.type === 'text' && <div>{el.content}</div>}
//                                 {el.type === 'image' && <img src={el.url} alt="Custom" style={{ maxWidth: '100%' }} />}
//                             </div>
//                         </Draggable>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No video selected, upload a video before adding text or image.</p>
//             )}
//         </div>
//     );
// };

// export default Preview;

import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable'; // Import Draggable
import './preview.css';

const Preview = ({ videoUrl, elements, isIframe }) => {
    const [showElements, setShowElements] = useState({});
    const [positions, setPositions] = useState({}); // State to store the positions of elements

    useEffect(() => {
        elements.forEach((element, idx) => {
            if (!element.timer) {
                setShowElements(prev => ({
                    ...prev,
                    [idx]: true, // Show element if no timer is set
                }));
            } else {
                // Initially hide the element
                setShowElements(prev => ({
                    ...prev,
                    [idx]: false,
                }));

                const startTime = element.timer.start * 1000; // convert seconds to milliseconds
                const endTime = element.timer.end * 1000; // convert seconds to milliseconds

                // Show element at the start time
                setTimeout(() => {
                    setShowElements(prev => ({
                        ...prev,
                        [idx]: true,
                    }));
                }, startTime);

                // Hide element at the end time
                setTimeout(() => {
                    setShowElements(prev => ({
                        ...prev,
                        [idx]: false,
                    }));
                }, endTime);
            }
        });
    }, [elements]);

    const handleDragStop = (e, data, idx) => {
        const updatedElements = [...elements];
        const newLeft = (data.x / e.target.offsetParent.offsetWidth) * 100;
        const newTop = (data.y / e.target.offsetParent.offsetHeight) * 100;

        // Update the position in the elements array
        updatedElements[idx] = {
            ...updatedElements[idx],
            left: `${newLeft}%`,
            top: `${newTop}%`,
        };

        // Store the current position in the `positions` state
        setPositions(prev => ({
            ...prev,
            [idx]: { left: newLeft, top: newTop },
        }));

        // Log updated element positions (you may use a callback to update the parent state if needed)
        console.log('Updated element positions:', updatedElements[idx]);
    };

    return (
        <div className="preview-container">
            {videoUrl ? (
                <div className="video-wrapper">
                    {isIframe ? (
                        <iframe
                            src={videoUrl}
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay"
                            width="100%"
                            height="100%"
                        />
                    ) : (
                        <video src={videoUrl} controls />
                    )}
                    {elements.map((el, idx) => (
                        <Draggable
                            key={idx}
                            bounds="parent"
                            onStop={(e, data) => handleDragStop(e, data, idx)}
                            defaultPosition={{
                                // Use stored position if it exists, otherwise use the initial position
                                x: (positions[idx]?.left / 100) * document.querySelector('.video-wrapper').offsetWidth || (el.left ? (parseFloat(el.left) / 100) * document.querySelector('.video-wrapper').offsetWidth : 0),
                                y: (positions[idx]?.top / 100) * document.querySelector('.video-wrapper').offsetHeight || (el.top ? (parseFloat(el.top) / 100) * document.querySelector('.video-wrapper').offsetHeight : 0),
                            }}
                        >
                            <div
                                className={`element-${el.type}`}
                                style={{
                                    position: 'absolute',
                                    cursor: 'move',
                                    color: el.color,
                                    top: el.top || '50%',
                                    left: el.left || '10%',
                                    display: showElements[idx] ? 'block' : 'none', // Control visibility
                                }}
                            >
                                {el.type === 'text' && <div>{el.content}</div>}
                                {el.type === 'image' && <img src={el.url} alt="Custom" style={{ maxWidth: '100%' }} />}
                            </div>
                        </Draggable>
                    ))}
                </div>
            ) : (
                <p>No video selected, upload a video before adding text or image.</p>
            )}
        </div>
    );
};

export default Preview;
