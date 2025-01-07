'use client';
import PropertyMap from "@/components/elements/PropertyMap";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { insertData, updateData } from "../../../components/api/Axios/Helper";
import ErrorPopup from "@/components/errorPopup/ErrorPopup.js";
import Preloader from "@/components/elements/Preloader";
import SuccessPopup from "@/components/SuccessPopup/SuccessPopup";

export default function EditPropertyType({ params }) {
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [sucessMessage, setSucessMessage] = useState(false);
    const router = useRouter();
    const { id } = params || {};

    const validationSchema = Yup.object({
        title_en: Yup.string().required("Title is required"),
        title_fr: Yup.string().required("Title is required"),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await insertData('api/property-type/getbyid', { id }, true);
                if (response && response.data) {
                    setType(response.data);
                } else {
                    setErrorMessage("No data found for the provided ID.");
                }
            } catch (error) {
                setErrorMessage("Failed to fetch property amenities data.");
            } finally {
                setLoading(false);
            }
        };
        if (id)
 fetchData();
    }, [id]);

    const handleSubmit = async (values, { setErrors }) => {
        try {
            setLoading(true);
            const propertyData = {
                en_string: values.title_en,
                fr_string: values.title_fr,
                id: id
            };
            const response = await updateData(`api/property-type/${id}`, propertyData, true);

            if (response.status) {
                setSucessMessage(true);
                router.push('/property-type-listing');
            } else {
                setErrors({ serverError: response.message || "Failed to update property type." });
                setShowErrorPopup(true);
            }
        } catch (error) {
            setErrors({ serverError: error.message || "An unexpected error occurred." });
            setShowErrorPopup(true);
        } finally {
            setLoading(false);
        }
    };

    const messageClass = sucessMessage ? "message success" : "message error";

    return loading ? (
        <Preloader />
    ) : (
        <LayoutAdmin>
            {errorMessage && <div className={messageClass}>{errorMessage}</div>}
            <Formik
                enableReinitialize
                initialValues={{
                    title_en: type?.en_string || '',
                    title_fr: type?.fr_string || '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors }) => (
                    <Form>
                        <div className="widget-box-2">
                            <h6 className="title">Property Type Information</h6>
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
                        <button type="submit" className="tf-btn primary">Update Property Type</button>
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
        </LayoutAdmin>
    );
}