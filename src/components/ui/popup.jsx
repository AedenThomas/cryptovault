import React, { useEffect, useRef, useState} from 'react';

const Popup = ({ link, encryptionKey, contentHash, onClose }) => {
  const popupRef = useRef(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-xl w-full" ref={popupRef}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Generated Link
            </h2>
            <button
              onClick={() => handleCopyToClipboard(link)}
              title="Copy to clipboard"
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 overflow-wrap break-word">
            {link}
          </p>


          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Encryption Key <span className="text-sm font-normal">(won't be shown again)</span>
            </h2>
            <button
              onClick={() => handleCopyToClipboard(encryptionKey)}
              title="Copy to clipboard"
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 overflow-wrap break-word">
            {encryptionKey}
          </p>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Content Hash
              <button
                onMouseEnter={toggleTooltip}
                onMouseLeave={toggleTooltip}
                className="ml-2"
              >
                <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3 -3v6m4 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
                </svg>
              </button>
              {isTooltipVisible && (
               <span className="absolute mt-2 w-64 p-2 bg-white text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-300 shadow-lg rounded-md">
               The Content Hash is a digital fingerprint for files on the IPFS network, ensuring a piece of content is unique and unchanged. Just like a fingerprint uniquely identifies a person, this hash uniquely identifies and secures your file. Additionally, this hash allows the file to be accessed from anywhere in the world using any IPFS gateway. It's a powerful way to ensure content integrity and global accessibility without relying on a single server.
             </span>
             
              )}
            </h2>
            <button
              onClick={() => handleCopyToClipboard(contentHash)}
              title="Copy to clipboard"
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div> 
          
          <p className="text-sm text-gray-500 dark:text-gray-400 overflow-wrap break-word word-break: break-all;">
  {contentHash}
</p>
          
        </div>
      </div>
    </div>
  );
};

export default Popup;