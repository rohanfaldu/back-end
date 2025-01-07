'use client'
import PropertyMap from "@/components/elements/PropertyMap";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link"

import * as Yup from "yup";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertData, updateData } from "@/components/api/Axios/Helper";
import { insertMultipleUploadImage } from "@/components/common/imageUpload";
import ErrorPopup from "@/components/errorPopup/ErrorPopup";
import Preloader from "@/components/elements/Preloader";

export default function EditPropertyAmenities({ params }) {
    const { id } = params;
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [eminities, setEminities] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [message, setMessage] = useState({ type: "", content: "" });

    const validationSchema = Yup.object().shape({
        title_en: Yup.string().required("Title (English) is required"),
        title_fr: Yup.string().required("Title (French) is required"),
        key: Yup.string().required("Key is required"),
        type: Yup.string().required("Type is required"),
        icon_img: Yup.mixed().nullable().required("Icon image is required"),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await insertData('api/property-type-listings/getbyid', { id }, true);
                setEminities(response.data || {});
            } catch (error) {
                setMessage({ type: "error", content: "Failed to fetch property amenities data." });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setLoading(true);

            let pictureUrl = values.icon_img;
            if (values.icon_img && typeof values.icon_img !== "string") {
                const uploadResponse = await insertMultipleUploadImage("image", [values.icon_img]);
                pictureUrl = uploadResponse.files[0]?.url || null;
            }

            if (!pictureUrl) throw new Error("Failed to upload or fetch icon image.");

            const propertyData = {
                id,
                en_string: values.title_en,
                fr_string: values.title_fr,
                icon: pictureUrl,
                type: values.type,
                key: values.key,
                lang: "en",
                category: 1,
            };

            const response = await updateData(`api/property-type-listings/${id}`, propertyData, true);

            if (response.status) {
                setMessage({ type: "success", content: "Property amenities updated successfully!" });
                resetForm();
                router.push("/property-amenities-listing");
            } else {
                throw new Error(response.message || "Failed to update property amenities.");
            }
        } catch (error) {
            setMessage({ type: "error", content: error.message || "An unexpected error occurred." });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    if (loading) return <Preloader />;

    return (
        <LayoutAdmin>
            {message.content && (
                <div className={`message ${message.type}`}>{message.content}</div>
            )}
            <Formik
                initialValues={{
                    title_en: eminities?.en_name || "",
                    title_fr: eminities?.fr_name || "",
                    type: eminities?.type || "",
                    key: eminities?.key || "",
                    icon_img: eminities?.icon || null,
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <div className="widget-box-2">
                            <h6 className="title">Property Amenities Information</h6>
                            <div className="box grid-2 gap-30">
                                <fieldset>
                                    <label>Title (English): <span>*</span></label>
                                    <Field name="title_en" className="form-control style-1" />
                                    <ErrorMessage name="title_en" component="div" className="error" />
                                </fieldset>
                                <fieldset>
                                    <label>Title (French): <span>*</span></label>
                                    <Field name="title_fr" className="form-control style-1" />
                                    <ErrorMessage name="title_fr" component="div" className="error" />
                                </fieldset>
                            </div>
                            <div className="box grid-2 gap-30">
                                <fieldset>
                                    <label>Type: <span>*</span></label>
                                    <Field as="select" name="type" className="nice-select country-code">
                                        <option value="">Select Type</option>
                                        <option value="number">Number</option>
                                        <option value="boolean">Boolean</option>
                                    </Field>
                                    <ErrorMessage name="type" component="div" className="error" />
                                </fieldset>
                                <fieldset>
                                    <label>Key: <span>*</span></label>
                                    <Field name="key" className="form-control style-1" />
                                    <ErrorMessage name="key" component="div" className="error" />
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
                                                        setFilePreview(URL.createObjectURL(file));
                                                    }}
                                                />
                                               {filePreview ? (
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

                            <button type="submit" className="tf-btn primary">Update Property Amenities</button>
                        </div>
                    </Form>
                )}
            </Formik>
            {showErrorPopup && <ErrorPopup onClose={() => setShowErrorPopup(false)} />}
        </LayoutAdmin>
    );
}
