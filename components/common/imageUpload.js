'use client'
import { insertImageData } from "../../components/api/Axios/Helper";

export async function insertUploadImage(name, images) {
    const formDataData = new FormData();
    formDataData.append('image', images);
    //formDataData.append(images);
    const response = await insertImageData(formDataData);
    console.log(response.status);
    if(response.status === true) {
        const fileUrls = response.data.files.map(file => file.url);
        if(fileUrls.length > 0) {
            return fileUrls[0];
        }else{
            throw new Error("File not found.");
        }
    }else {
        throw new Error("Invalid response from the server.");
    }
}

export async function insertMultipleUploadImage(name, images) {
    const formDataData = new FormData();

    // Iterate through the images array
    images.forEach((image) => {
        if (image instanceof File) {
            // Standard file without metaType
            formDataData.append(name, image);
        } else if (image.file && image.metaType) {
            // Object with metaType
            formDataData.append(name, image.file); // Add the file
            formDataData.append(`${name}_metaType`, image.metaType); // Add the associated metaType
        }
    });

    // Send the FormData to the backend
    const response = await insertImageData(formDataData);

    console.log(response.status);
    if (response.status === true) {
        return response.data; // Return the response data
    } else {
        throw new Error("Invalid response from the server.");
    }
}
