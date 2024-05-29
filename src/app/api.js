// app/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';


export const encryptAndStore = async (content) => {
  try {
    console.log('API_BASE_URL:', API_BASE_URL);
    const response = await axios.post(`${API_BASE_URL}/create-encrypted-content/`, { content });
    const {content_hash, unique_identifier, key } = response.data;
    return {contentHash: content_hash, uniqueIdentifier: unique_identifier, key: key };
  } catch (error) {
    console.error('Error encrypting and storing content:', error);
    throw error;
  }
};

export const retrieveDecryptedContent = async (uniqueIdentifier, encryptionKey) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/retrieve-content/${uniqueIdentifier}`, {
      params: { encryptionKey },
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('Error retrieving and decrypting content:', error);
    throw error;
  }
};