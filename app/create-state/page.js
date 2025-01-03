'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { userType } from "../../components/common/functions";
import { useState } from "react"
import { useRouter } from 'next/navigation';
import passwordShow from "../../public/images/favicon/password-show.png";
import passwordHide from "../../public/images/favicon/password-hide.png";
import { insertData } from "../../components/api/Axios/Helper";
import { insertMultipleUploadImage } from "../../components/common/imageUpload";
import ErrorPopup from "../../components/errorPopup/ErrorPopup.js";
import SuccessPopup from "@/components/SuccessPopup/SuccessPopup";


export default function CreatePropertyAmenities() {
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const router = useRouter();
    const validationSchema = Yup.object({
        title_en: Yup.string().required("Title is required"),
        title_fr: Yup.string().required("Title is required"),
        latitude: Yup.string().required("Latitude is required"),
        longitude: Yup.mixed().required("Longitude is required"),
    });

    const handleSubmit = async (values, { resetForm, setErrors }) => {
        setShowErrorPopup(''); // Reset error popup
    
        try {
            const propertyData = {
                en_name: values.title_en, // Map front-end values to backend fields
                fr_name: values.title_fr,
                latitude: parseFloat(values.latitude), // Convert to float
                longitude: parseFloat(values.longitude),
            };
    
            console.log('Sending Property Data:', propertyData);
    
            const createPropertyInfo = await insertData('api/state/create', propertyData, true);
    
            if (createPropertyInfo.status) {
                setSucessMessage(createPropertyInfo.message || "State created successfully");
                resetForm();
                router.push('/state-listing');
            } else {
                setErrors({ serverError: createPropertyInfo.message || "Failed to create state." });
                setShowErrorPopup(true);
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            setErrors({ serverError: error.message || "An unexpected error occurred." });
            setShowErrorPopup(true);
        }
    };
    
    

    const messageClass = (sucessMessage) ? "message success" : "message error";
	return (
		<>

			{/* <DeleteFile /> */}

			<LayoutAdmin>
            {errorMessage && <div className={messageClass}>{errorMessage}</div>}
            <Formik
                initialValues={{
                    title_en: "",
                    title_fr: "",
                    latitude: "",
                    longitude: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <div>
                            <div className="widget-box-2">
                                <h6 className="title">State Information</h6>
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
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Latitude:<span>*</span></label>
                                        <Field type="text" id="latitude" name="latitude" className="form-control style-1" />
                                        {/* <ErrorMessage name="key" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Longitude:<span>*</span></label>
                                        <Field type="text" id="longitude" name="longitude" className="form-control style-1" />
                                        {/* <ErrorMessage name="key" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                            </div>

                            <button type="submit"  className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)}>Add State</button>
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
                        </div >
                    </Form>
                )}
                </Formik>


			</LayoutAdmin >
		</>
	)
}