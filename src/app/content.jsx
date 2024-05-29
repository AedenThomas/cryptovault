// // app/content.jsx

// import { retrieveDecryptedContent } from '../api';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// export default function Content() {
//   const [decryptedContent, setDecryptedContent] = useState('');
//   const router = useRouter();
//   const { uniqueIdentifier } = router.query;

//   useEffect(() => {
//     const fetchContent = async () => {
//       if (uniqueIdentifier) {
//         try {
//           const content = await retrieveDecryptedContent(uniqueIdentifier);
//           setDecryptedContent(content);
//         } catch (error) {
//           console.error('Error retrieving and decrypting content:', error);
//         }
//       }
//     };

//     fetchContent();
//   }, [uniqueIdentifier]);

//   return (
//     <div>
//       <h1>Decrypted Content</h1>
//       <pre>{decryptedContent}</pre>
//     </div>
//   );
// }