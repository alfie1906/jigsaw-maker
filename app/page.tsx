'use client';

import React, { useState, ChangeEvent } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setShowModal(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [numberOfPieces, setNumberOfPieces] = React.useState<number>(0);

  const generateJigsaw = () => {
    // TODO: Add code to generate a jigsaw puzzle from the selected image
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{backgroundColor: '#b2d3e8'}}>
      <h1 
        className="text-5xl font-bold" 
        style={{ color: '#b8b5b5', textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}
      >
        Jigsaw generator
      </h1>
      <label className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer">
        Upload Image
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          style={{ display: 'none' }} 
          ref={fileInputRef}
        />
      </label>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start justify-center text-center">
                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Image Uploaded
                    </h3>
                    <div className="mt-2">
                      <img src={selectedImage ? selectedImage.toString() : ""} alt="Selected" style={{ maxHeight: '200px' }} />
                    </div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      How many pieces?
                    </h3>
                    <input 
                      type="number" 
                      value={numberOfPieces} 
                      onChange={(e) => setNumberOfPieces(parseInt(e.target.value))} 
                      className="rounded-lg text-center text-black border border-gray-300 px-2 py-1"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                  onClick={generateJigsaw}
                >
                  Generate Jigsaw
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                  onClick={() => {
                    setSelectedImage(null);
                    setShowModal(false);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  Start again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}