'use client'
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import { use, useState, useEffect } from "react"
import { insertData, insertImageData, updateData } from "../../components/api/Axios/Helper";
import { insertMultipleUploadImage } from "../../components/common/imageUpload";
import ErrorPopup from "../../components/errorPopup/ErrorPopup.js";
import SuccessPopup from "@/components/SuccessPopup/SuccessPopup";
import { useRouter } from 'next/navigation';
import Preloader from "@/components/elements/Preloader";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

export default function CreateAuthor() {
    const [sucessMessage, setSucessMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [filePreviews, setFilePreviews] = useState([]);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [authorData, setAuthorData] = useState([]);
    const [content, setContent] = useState('');

    const validationSchema = Yup.object({
        title: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
        picture_img: Yup.mixed().required("Image is required"),
    });

    const router = useRouter();
    const handleSubmit = async (values, { resetForm, setErrors }) => {

        console.log(values, ' >>> blog Data');
        try {
            const { title, picture_img } = values;
            let image = '';
            const uploadImageIconUrl = await insertMultipleUploadImage("image", picture_img);
            if (uploadImageIconUrl?.files?.length > 0) {
                image = uploadImageIconUrl.files[0].url;
            }
            console.log(image, ' >>> Image URL ');
            const response = await insertData('api/author/create', { name: title, image: image }, true);
            console.log(response, ' >>> blog Data');

            if (response.status) {
                setAuthorData(response.data);
                router.push("/author-list");
                resetForm();
            } else {
                setShowErrorPopup(true);
                setErrors({ title: response.message });
            }
        } catch (error) {
            console.error('Error fetching blog data:', error);
            setErrors({ title: 'Something went wrong!' });
        }
    };

    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <>
                    <LayoutAdmin>
                        {errorMessage && <div className={messageClass}>{errorMessage}</div>}
                        <Formik
                            initialValues={{
                                title: "",
                                picture_img: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
                                <Form>
                                    {    console.log(errors,' >>>> error')}
                                    <div>
                                        <div className="widget-box-2">
                                            <h6 className="title">Author Information</h6>
                                            <div className="box grid-2 gap-30">
                                                <fieldset className="box box-fieldset">
                                                    <label htmlFor="title">Title:<span>*</span></label>
                                                    <Field type="text" id="title" name="title" className="form-control style-1" />
                                                     {/* <ErrorMessage name="title" component="div" className="error" /> */}
                                                </fieldset>
                                            </div>
                                            <div className="box grid-2 box gap-30">
                                                <fieldset className="box-fieldset">
                                                    <label htmlFor="picture_img">Author Image:</label>
                                                    <Field
                                                        name="picture_img"
                                                        component={({ field, form }) => (
                                                            <div className="box-floor-img uploadfile">
                                                                {/* Upload Button */}
                                                                <div className="btn-upload">
                                                                    <label className="tf-btn primary">
                                                                        Choose Files
                                                                        <input
                                                                            type="file"
                                                                            // multiple
                                                                            className="ip-file"
                                                                            onChange={(event) => {
                                                                                const files = Array.from(event.target.files);
                                                                                let updatedImageList = [...filePreviews]; // Preserve existing previews
                                                                                let updatedValidFiles = [...form.values[field.name] || []]; // Preserve existing selected files

                                                                                files.forEach((file) => {
                                                                                    const img = new Image();
                                                                                    const reader = new FileReader();
                                                                                    reader.onload = (e) => {
                                                                                        img.src = e.target.result;
                                                                                        img.onload = () => {
                                                                                            const imageHeight = img.height;
                                                                                            const imageWidth = img.width;

                                                                                            if (imageHeight <= 80 || imageWidth <= 100) {
                                                                                                alert('Please upload images with a maximum height of 80px and a maximum width of 80px');
                                                                                            } else {
                                                                                                updatedImageList.push(URL.createObjectURL(file));
                                                                                                updatedValidFiles.push(file);
                                                                                            }

                                                                                            setFilePreviews([...updatedImageList]); // Update state with new images
                                                                                            form.setFieldValue(field.name, [...updatedValidFiles]); // Update Formik field value
                                                                                        };
                                                                                    };

                                                                                    reader.readAsDataURL(file);
                                                                                });
                                                                            }}
                                                                            style={{ display: "none" }}
                                                                        />
                                                                    </label>
                                                                </div>



                                                                <p className="file-name fw-5">Or drop images here to upload</p><br></br>

                                                                {/* Error Message */}
                                                                {/* <ErrorMessage name="picture_img" component="div" className="error" /> */}
                                                            </div>
                                                        )}
                                                    />

                                                </fieldset>
                                                <fieldset className="box-fieldset">
                                                    {/* Image Previews */}
                                                    <div className="image-preview-container image-gallery">
                                                        {filePreviews.length > 0 && (<p className="fw-5">Image Preview:</p>)}
                                                        {filePreviews.map((preview, index) => (
                                                            <div key={index} className="preview-item">
                                                                <img
                                                                    src={preview}
                                                                    alt={`Preview ${index + 1}`}
                                                                    className="uploadFileImage"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newFilePreviews = filePreviews.filter((_, i) => i !== index);
                                                                        const newImageList = values.picture_img.filter((_, i) => i !== index);
                                                                        setFilePreviews(newFilePreviews);
                                                                        setFieldValue("picture_img", newImageList);
                                                                    }}
                                                                    className="remove-image-btn"
                                                                >
                                                                    &times;
                                                                </button>

                                                            </div>
                                                        ))}
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>

                                        <button type="submit" className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)}>Add Author</button>
                                    </div>
                                    {/* Error Popup */}
                                    {showErrorPopup && Object.keys(errors).length > 0 && (
                                        <ErrorPopup
                                            errors={errors}
                                            validationSchema={validationSchema}
                                            onClose={() => setShowErrorPopup(false)}
                                        />
                                    )}
                                    {sucessMessage && (
                                        <SuccessPopup
                                            message={sucessMessage}
                                            onClose={() => setSucessMessage(false)}
                                        />
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </LayoutAdmin >
                </>
            )}
        </>
    );
}
