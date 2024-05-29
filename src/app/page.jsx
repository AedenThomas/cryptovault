"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { encryptAndStore } from './api';
import Popup from '@/components/ui/Popup';

export default function Home() {
  const [content, setContent] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const [contentHash, setContentHash] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const { contentHash, uniqueIdentifier, key } = await encryptAndStore(content);
      setContentHash(contentHash);
      const url = new URL(window.location.href);
      const baseUrl = url.origin;
      const generatedLink = `${baseUrl}/content/${uniqueIdentifier}`;
      setGeneratedLink(generatedLink);
      setEncryptionKey(key);
      setShowPopup(true);
    } catch (error) {
      console.error('Error encrypting and storing content:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after operation completes
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="max-w-3xl p-8 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-900">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl sm:leading-[4.5rem] text-center text-black dark:text-white">
            Securely store and share encrypted text
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Paste your text content below to encrypt it using blockchain technology. Your encrypted content will be stored securely and immutably.
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Textarea
            className="min-h-[200px] p-4 rounded-lg text-sm font-mono bg-gray-200 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            placeholder="Enter your text here. It will be encrypted securely."
            value={content}
            onChange={handleContentChange}
          />
          <Button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
            disabled={isLoading} // Disable the button when loading
          >
            {isLoading ? ( // Render loading spinner or progress indicator when loading
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Encrypting...
              </div>
            ) : (
              'Encrypt & Store'
            )}
          </Button>
        </form>
      </div>
      {showPopup && <Popup link={generatedLink} encryptionKey={encryptionKey} contentHash={contentHash} onClose={handleClosePopup} />}
    </div>
  );
}