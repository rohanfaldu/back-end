'use client'
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { use, useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { insertData} from "../../components/api/Axios/Helper";
import ErrorPopup from "../../components/errorPopup/ErrorPopup.js";
import Preloader from "@/components/elements/Preloader"; // Import Preloader component

export default function CreateAgency() {
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
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
                                <h6 className="title">Create Agency Package</h6>
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Title English:<span>*</span></label>
                                        <Field type="text" id="title_en" name="title_en" className="form-control style-1" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Title French:<span>*</span></label>
                                        <Field type="text" id="title_fr" name="title_fr" className="form-control style-1" />
                                    </fieldset>
                                </div>
                            </div>
                            <button type="submit"  className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)} >Add Agency Package</button>
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