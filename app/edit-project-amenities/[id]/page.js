'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertData,updateData } from "@/components/api/Axios/Helper";
import { insertMultipleUploadImage } from "@/components/common/imageUpload";
import ErrorPopup from "@/components/errorPopup/ErrorPopup.js";
import Preloader from "@/components/elements/Preloader"; // Import Preloader component

export default function EditProjectAmenities({ params }) {
    const [errors, setErrors] = useState({});  // Initialize errors as an object
	const [errorMessage, setErrorMessage] = useState('');
    const { id } = params;
	const [sucessMessage, setSucessMessage] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const router = useRouter();
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [loading, setLoading] = useState(false); // Loader state
    const [userDetail, setUserDetail] = useState(null);

    const validationSchema = Yup.object({
        title_en: Yup.string().required("Title is required"),
        title_fr: Yup.string().required("Title is required"),
        key: Yup.string().required("Key is required for Unique ID"),
        type: Yup.string().required("Type is required"),
        icon_img: Yup.mixed()
        .test("file-required", "Image is required", function (value) {
            const { icon } = this.options.context.userDetail || {}; // Access userDetail in the context
            return value || icon; // Pass if a new image is uploaded or `userDetail.icon` exists
        }),    });
       useEffect(() => {
        const fetchData = async () => {
            try {
                const requestData = {
                    property_type_id: id,
                };
                const getUserInfo = await insertData('api/project-type-listings/getbyid', requestData, true);
                const allUsersList = getUserInfo.data;

                console.log(allUsersList);

                if (allUsersList) {
                    setUserDetail(allUsersList);
                } else {
                    setErrorMessage("User not found.");
                }

                setLoading(false); // Stop loading
            } catch (err) {
                setLoading(false);
                setErrorMessage("Failed to fetch user data");
                console.error("Error fetching data:", err);
            }
        };

        fetchData(); // Fetch data when id is ready
    }, [id]);

    const handleSubmit = async (values, { resetForm, setErrors }) => {
    console.log(values);
    setShowErrorPopup(false); // Ensure popup is initially closed.

    try {
        /********* Handle Icon Image ***********/
        let pictureUrl;

        // Check if a new image was uploaded or use the existing one
        if (typeof values.icon_img === "string") {
            pictureUrl = values.icon_img; // Use the existing URL
        } else if (values.icon_img) {
            // Upload the new image if a file is selected
            const uploadImageObj = [values.icon_img];
            const uploadImageUrl = await insertMultipleUploadImage("image", uploadImageObj);

            if (uploadImageUrl.files.length > 0) {
                const fileUrls = uploadImageUrl.files.map((file) => file.url);
                pictureUrl = fileUrls[0] || null;
            }
        }
        // Ensure we have a valid pictureUrl
        if (!pictureUrl) {
            setErrors({ serverError: "Image not found or failed to upload." });
            setShowErrorPopup(true);
            return;
        }

        setLoading(true); // Start loader

        /********* Check Property Info ***********/
        const checkPropertyInfo = await insertData("api/project-type-listings/check", { key: values.key }, true);

        // if (checkPropertyInfo.status === true) {
            /********* Create Property Info ***********/
            const propertyData = {
                id: id,
                en_string: values.title_en,
                fr_string: values.title_fr,
                icon: pictureUrl, // Use either new image or existing URL
                type: values.type,
                key: values.key,
                lang: "en",
                category: 1,
            };

            const createPropertyInfo = await updateData(`api/project-type-listings/${id}`, propertyData, true);

            if (createPropertyInfo.status) {
                setSucessMessage(true);
                resetForm();
                setShowErrorPopup(true);
                setErrors({ serverError: "Project of Amenities created successfully." });
                router.push("/project-amenities-listing");
            } else {
                setErrors({ serverError: createPropertyInfo.message || "Failed to create project amenities." });
                setShowErrorPopup(true);
            }
        // } else {
        //     console.log("errors", checkPropertyInfo.message);
        //     setErrors({ serverError:  "Property check failed." });
        //     setShowErrorPopup(true); // Trigger the popup
        // }
    } catch (error) {
        setErrors({ serverError: error.message || "An unexpected error occurred." });
        setShowErrorPopup(true);
    } finally {
        setLoading(false); // Stop loader
    }
};

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
                    title_en: userDetail ? userDetail.en_string : '', // Fallback to empty string
                    title_fr: userDetail ? userDetail.fr_string : '', // Fallback for French title
                    type: userDetail ? userDetail.type : '',         // Fallback for type
                    key: userDetail ? userDetail.key : '',           // Fallback for key
                    icon_img: userDetail ? userDetail.icon : '', // Fallback for icon image
                }}
                validationSchema={validationSchema}
                enableReinitialize={true} // Allows form to reinitialize when data updates
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue,values }) => (
                    <Form>
                        <div>
                            <div className="widget-box-2">
                                <h6 className="title">Project Amenities Information</h6>
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
                                        <label htmlFor="title">Type:<span>*</span></label>
                                        <Field as="select" name="type" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("type", selectedState);
                                                }}
                                            >
                                            <option value="">Select Type</option>
                                            <option value="number">Number</option>
                                            <option value="boolean">Boolean</option>
                                        </Field>
                                        {/* <ErrorMessage name="type" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Key:<span>*</span></label>
                                        <Field type="text" id="key" name="key" className="form-control style-1" />
                                        {/* <ErrorMessage name="key" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                                <div className="grid-2 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">Icon Image:</label>
                                        <div className="box-floor-img uploadfile">
                                            <div className="btn-upload">
                                                <Link href="#" className="tf-btn primary">Choose File</Link>
                                                <input
                                                    type="file"
                                                    className="ip-file"
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        setFieldValue("icon_img", file);
                                                        setFilePictureImg(URL.createObjectURL(file));
                                                    }}
                                                />
                                               {filePictureImg ? (
                                                    <img
                                                        src={filePictureImg}
                                                        alt="Preview"
                                                        className="uploadFileImage"
                                                    />
                                                ) : values.icon_img ? (
                                                    <img
                                                        src={values.icon_img} // Show the existing image URL as default
                                                        alt="Preview"
                                                        className="uploadFileImage"
                                                    />
                                                ) : null}
                                            </div>
                                            <p className="file-name fw-5"> Or drop image here to upload </p>

                                        </div>
                                    </fieldset>
                                </div>

                            </div>

                            <button type="submit"  className="tf-btn primary"  onClick={() => setShowErrorPopup(!showErrorPopup)}>Update Project Amenities</button>
                            {/* Error Popup */}
                            {showErrorPopup && Object.keys(errors).length > 0 && (
                                <ErrorPopup
                                    errors={errors}
                                    validationSchema={validationSchema}
                                    onClose={() => setShowErrorPopup(false)}
                                />
                            )}
                        </div >
                    </Form>
                )}
                </Formik>


			</LayoutAdmin >
		</>
           )}
        </>
	)
}