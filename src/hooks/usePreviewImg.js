import { useState } from "react"
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 2 * 1024 * 1024;

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSizeInBytes) {
                showToast("Error", "File size must be less than 2MB", "error")
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
            }

            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));

        }
        else {
            showToast("Error", "Please select an image file", "error")
            setSelectedFile(null);
            setPreviewUrl(null);

        }
    };

    const clearPreview = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    return { selectedFile, previewUrl, handleImageChange, setSelectedFile, clearPreview}
};

export default usePreviewImg;


// const usePreviewImg = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const showToast = useShowToast();
//     const maxFileSizeInBytes = 2 * 1024 * 1024;

//     const handleImageChange = (e) => {
//         const file = e.target.files[0]
//         if (file && file.type.startsWith("image/")) {
//             if (file.size > maxFileSizeInBytes) {
//                 showToast("Error", "File size must be less than 2MB", "error")
//                 setSelectedFile(null)
//                 return
//             }

//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 setSelectedFile(reader.result)
//             }

//             reader.readAsDataURL(file);


//         }
//         else {
//             showToast("Error", "Please select an image file", "error")
//             setSelectedFile(null)
//         }
//     }

//     return { selectedFile, handleImageChange, setSelectedFile }
// };


// I have created an implementation for a edit profile modal to appear which has a button for a user to upload a new image file from their computer as seen in EditProfile.jsx. When the user clicks on this button it callas the handleImageChange function from usePreviewimg.js hook to verify it is an image and correct file size. In this file I was planning to read it as dataURL but that won't work with Supabase. How can I read it as a File