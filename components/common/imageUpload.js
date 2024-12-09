'use client'
import { insertImageData } from "../../components/api/Axios/Helper";

export async function insertUploadImage(name, images) {
    const formDataData = new FormData();
    formDataData.append(name, images);
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

