'use client';

import { retrieveDecryptedContent } from '../../api';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";

function Content() {
  const [decryptedContent, setDecryptedContent] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const [searchParams] = useSearchParams();

  const handleKeySubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const url = new URL(window.location.href);
      const uuid = url.pathname.split('/').pop();
      const content = await retrieveDecryptedContent(uuid, encryptionKey);
      setDecryptedContent(content);
      setErrorMessage(''); // Clear the error message on successful decryption
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data); // Store the error message in the state
        } else {
          console.error('Error retrieving and decrypting content:', error);
        }
      } else {
        console.error('Error retrieving and decrypting content:', error);
      }
    } finally {
      setIsLoading(false); // Set loading state to false after operation completes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="max-w-3xl p-8 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-900">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl sm:leading-[4.5rem] text-center text-black dark:text-white">
            Decrypt Encrypted Content
          </h1>
          <form className="space-y-4" onSubmit={handleKeySubmit}>
            <div>
              <label htmlFor="encryption-key" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Encryption Key
              </label>
              <input
                id="encryption-key"
                type="text"
                value={encryptionKey}
                onChange={(event) => setEncryptionKey(event.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm text-lg focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ease-in-out sm:text-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:border-blue-300 dark:focus:ring-blue-300"
              />
            </div>
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
                  Decrypting...
                </div>
              ) : (
                'Decrypt Content'
              )}
            </Button>
          </form>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          {decryptedContent && (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
              <pre className="text-gray-800 dark:text-gray-400 whitespace-pre-wrap">{decryptedContent}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Content;