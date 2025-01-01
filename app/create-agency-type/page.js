'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { userType } from "../../components/common/functions";
import { use, useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { insertData, insertImageData } from "../../components/api/Axios/Helper";
import { allCountries } from "country-telephone-data";
import { insertUploadImage } from "../../components/common/imageUpload";
import ErrorPopup from "../../components/errorPopup/ErrorPopup.js";
import Preloader from "@/components/elements/Preloader"; // Import Preloader component

export default function CreateAgency() {
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const [fileCoverImg, setFileCoverImg] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [selectedCode, setSelectedCode] = useState("");
    const [selectedWhatsupCode, setSelectedWhatsupCode] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [loading, setLoading] = useState(false); // Loader state


    const router = useRouter();
    const validationSchema = Yup.object({
            title_en: Yup.string().required("Title is required"),
            title_fr: Yup.string().required("Title is required"),
        });

    // Handle form submission
    const handleSubmit = async (values, { resetForm, setErrors }) => {
        setShowErrorPopup(false); // Reset popup
        try {
            const agencyObject = {
                en_string: values.title_en,
                fr_string: values.title_fr,
                type: "BASIC",
            };
            setLoading(true); // Start loader

            const createAgencyType = await insertData('api/agency-packages/create', agencyObject, true);
            if (createAgencyType.status) {
                setSucessMessage(true);
                setShowErrorPopup(false);
                router.push('/agency-types-listing');
            } else {
                setErrors({ serverError: createAgencyType.message || "Failed to create agency type." });
                setShowErrorPopup(true);
            }
        } catch (error) {
            setErrors({ serverError: error.message || "An unexpected error occurred." });
            setShowErrorPopup(true);
        }finally {
            setLoading(false); // Stop loader
        }
    };

	const [selectedRadio, setSelectedRadio] = useState('radio1')

	const handleRadioChange = (event) => {
		const selectedRadioId = event.target.id
		setSelectedRadio(selectedRadioId)
	}
    const messageClass = (sucessMessage) ? "message success" : "message error";
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
                    title_en: "", title_fr: "",
                 }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <div>
                        <div className="widget-box-2">
                                <h6 className="title">Agency Type Information</h6>
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
                            </div>
                            <button type="submit"  className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)} >Add Agency Type</button>
                        </div >
                        {/* Error Popup */}
                        {showErrorPopup && (Object.keys(errors).length > 0) && (
                            <ErrorPopup
                                errors={errors}
                                validationSchema={validationSchema}
                                onClose={() => setShowErrorPopup(false)}
                            />
                        )}
                    </Form>
                )}
                </Formik>


			</LayoutAdmin >
		</>
           )}
        </>
	)
}