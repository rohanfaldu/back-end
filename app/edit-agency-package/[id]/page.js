'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { userType } from "../../../components/common/functions";
import React, { useEffect, useState } from 'react';
import passwordShow from "../../../public/images/favicon/password-show.png";
import passwordHide from "../../../public/images/favicon/password-hide.png";
import { insertData } from "../../../components/api/Axios/Helper";
import Preloader from '@/components/elements/Preloader';
import { allCountries } from "country-telephone-data";
import { useRouter } from 'next/navigation';

export default function EditAgency({ params }) {
    const { id } = params;

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [agencyData, setAgencyData] = useState(null);
    const [sucessMessage, setSucessMessage] = useState(false);
    const [userDetail, setUserDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // if (!router.isReady || !id) return; // Ensure router is ready and id exists
        console.log(id);

        const fetchData = async () => {

            const requestData = {
                   page: '',
                   limit: '',
                   lang: "en",
                   searchTerm: '',
                   status: '',
                 };
        const type = { agency_package_id: '7df6e881-cba4-4b5d-8ea6-5262968da01c' };

                //  const response = await insertData("api/agency-packages", requestData, true);
        const getUserInfo = await insertData('api/agency-packages/getbyid', type, true);
            console.log(getUserInfo); // Check if the API returns the expected data

            try {
                const requestData = {
                    lang: "en",
                };
                const getUserInfo = await insertData("api/agency-packages/", false);

                console.log(getUserInfo); // Check if the API returns the expected data

                // Assuming getUserInfo has a 'list' property containing the data
                const allUsersList = getUserInfo.data.list;
                const specificUserDetail = allUsersList.find(item => item.id === id);

                if (specificUserDetail) {
                    console.log(specificUserDetail); // Log to confirm correct user data
                    setUserDetail(specificUserDetail);
                } else {
                    setErrorMessage("User not found.");
                }

                setLoading(false); // Stop loading
            } catch (err) {
                setLoading(false); // Stop loading on error
                setErrorMessage("Failed to fetch user data");
                console.error("Error fetching data:", err); // Log the error
            }
        };

        fetchData(); // Fetch data when id is ready
    }, [router.isReady, id]); // Dependency on router.isReady and id

    // Validation Schema
    const validationSchema = Yup.object({
        title_en: Yup.string().required("Title is required"),
        title_fr: Yup.string().required("Title is required"),
    });

    // Handle form submission
    const handleSubmit = async (values, { setErrors }) => {
        setShowErrorPopup(false); // Reset popup
        try {
            const updatedAgency = {
                en_string: values.title_en,
                fr_string: values.title_fr,
                type: "BASIC", // Optional, depending on your API requirements
            };

            const response = await updateData(`api/agency-packages/${id}/update`, updatedAgency, true);

            if (response.status) {
                setSuccessMessage(true);
                router.push('/agency-types-listing');
            } else {
                setErrors({ serverError: response.message || "Failed to update agency type." });
                setShowErrorPopup(true);
            }
        } catch (error) {
            setErrors({ serverError: error.message || "An unexpected error occurred." });
            setShowErrorPopup(true);
        }
    };

    const messageClass = (sucessMessage) ? "message success" : "message error";

    // Prevent rendering form until userDetail is fetched
    if (loading) return <Preloader />; // Show a preloader while data is being fetched
    if (errorMessage) return <div className="message error">{errorMessage}</div>; // Show error message if no data is found

    return (
        <LayoutAdmin>
            {errorMessage && <div className={messageClass}>{errorMessage}</div>}
            <Formik
                initialValues={{
                    title_en: userDetail?.name || "",
                    title_fr: userDetail?.name || "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
                    <Form>
                        <div>
                            <div className="widget-box-2">
                                <h6 className="title">Edit Agency Type</h6>
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title_en">Title English:<span>*</span></label>
                                        <Field type="text" id="title_en" name="title_en" className="form-control style-1" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title_fr">Title French:<span>*</span></label>
                                        <Field type="text" id="title_fr" name="title_fr" className="form-control style-1" />
                                    </fieldset>
                                </div>
                            </div>
                            <button type="submit" className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)}>Update Agency Type</button>
                        </div>
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
        </LayoutAdmin>
    );
}
