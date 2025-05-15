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
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreateBlog() {
    const [sucessMessage, setSucessMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [filePreviews, setFilePreviews] = useState([]);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [authorData, setAuthorData] = useState([]);
    const [content, setContent] = useState('');

    const QuillEditor = ({ field, form, ...props }) => {
        const handleChange = (value) => {
            form.setFieldValue(field.name, value);
        };
        const modules = {
            toolbar: [
                [{ 'header': [2, 3, 4, 5, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
        };
        return (
            <div style={{ height: '400px' }} className="">
                <ReactQuill
                    value={field.value}
                    onChange={handleChange}
                    theme="snow"
                    modules={modules}
                    style={{ height: '350px' }} // Editor height
                    {...props}
                />
            </div>
        );
    };

    const validationSchema = Yup.object({
        title_en: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
        title_fr: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
        description_en: Yup.string().required("Description is required"),
        description_fr: Yup.string().required("Description is required"),
        picture_img: Yup.mixed().required("Image is required"),
    });

    const router = useRouter();
    const handleSubmit = async (values, { resetForm, setErrors }) => {

        console.log(values, ' >>> blog Data');
        try {
            const { title_en, title_fr, description_en, description_fr, author_id, picture_img } = values;
            let image = '';
            const uploadImageIconUrl = await insertMultipleUploadImage("image", picture_img);
            if (uploadImageIconUrl?.files?.length > 0) {
                image = uploadImageIconUrl.files[0].url;
            }
            console.log(image, ' >>> Image URL ');
            const response = await insertData('api/blog/create', { title_en, title_fr, description_en, description_fr, author_id, image }, true);
            console.log(response, ' >>> blog Data');

            if (response.status) {
                setAuthorData(response.data);
                router.push("/blog-listing");
                resetForm();
            } else {
                setShowErrorPopup(true);
                setErrors({ title_en: response.message });
            }
        } catch (error) {
            setShowErrorPopup(true);
            console.error('Error fetching blog data:', error);
            setErrors({ title_en: 'Something went wrong!' });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorPerameter = {
                    page: 1,
                    lang: "en",
                    limit: 1000
                }
                const response = await insertData('api/author/getall', authorPerameter , true);
                console.log(response, ' >>> Author Data');
                if (response.status) {
                    setAuthorData(response.data.list);
                }
            } catch (error) {
                console.error('Error fetching author data:', error);
            }
        }

        if (authorData.length === 0) {
            fetchData();
        }
    }, []);
    console.log(authorData, '>>>> Author');

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
                                title_en: "",
                                title_fr: "",
                                description_en: "",
                                description_fr: "",
                                picture_img: "",
                                author_id: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
                                <Form>
                                    <div>
                                        <div className="widget-box-2">
                                            <h6 className="title">Blog Information</h6>
                                            <div className="box grid-2 gap-30">
                                                <fieldset className="box box-fieldset">
                                                    <label htmlFor="title">Title English:<span>*</span></label>
                                                    <Field type="text" id="title_en" name="title_en" className="form-control style-1" />
                                                    {/* <ErrorMessage name="title_en" component="div" className="error" /> */}
                                                </fieldset>
                                                <fieldset className="box box-fieldset">
                                                    <label htmlFor="title">Title French:<span>*</span></label>
                                                    <Field type="text" id="title_fr" name="title_fr" className="form-control style-1" />
                                                    {/* <ErrorMessage name="title_fr" component="div" className="error" /> */}
                                                </fieldset>
                                            </div>
                                            <div className="grid-1 box gap-30">
                                                <fieldset className="box-fieldset">
                                                    <label htmlFor="description">Description English:<span>*</span></label>
                                                    <Field
                                                        name="description_en"
                                                        component={QuillEditor}
                                                    />
                                                    {/* <ErrorMessage name="description_en" component="div" className="error" /> */}
                                                </fieldset>
                                            </div>
                                            <div className="grid-1 box gap-30">
                                                <fieldset className="box-fieldset">
                                                    <label htmlFor="description">Description French:<span>*</span></label>
                                                    <Field
                                                        name="description_fr"
                                                        component={QuillEditor}
                                                    />
                                                    {/* <Field type="textarea" as="textarea" id="description_fr" name="description_fr" className="textarea-tinymce" /> */}
                                                    {/* <ErrorMessage name="description_fr" component="div" className="error" /> */}
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="widget-box-2">
                                            <div className="box grid-2 box gap-30">
                                                <fieldset className="box-fieldset">
                                                    <label htmlFor="picture_img">Blog Image:</label>
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

                                            <div className="box grid-2 gap-30">
                                                <fieldset className="box box-fieldset">
                                                    <label htmlFor="title">Author:<span></span></label>

                                                    <Field as="select" name="author_id" className="nice-select country-code"
                                                        onChange={(e) => {
                                                            const selectedState = e.target.value;
                                                            setFieldValue("author_id", selectedState);
                                                        }}
                                                    >
                                                        <option value="">Select Author</option>
                                                        {
                                                            (authorData.length > 0) ?
                                                                authorData.map((authorList) => (
                                                                    <option value={authorList.id}>{authorList.author_name}</option>
                                                                ))
                                                                :
                                                                null
                                                        }
                                                    </Field>
                                                    {/* <ErrorMessage name="transaction_type" component="div" className="error" /> */}
                                                </fieldset>
                                            </div>
                                        </div>

                                        <button type="submit" className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)}>Add Blog</button>
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
