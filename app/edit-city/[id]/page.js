'use client';
import PropertyMap from "@/components/elements/PropertyMap";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Preloader from '@/components/elements/Preloader';
import { insertData, updateData } from "../../../components/api/Axios/Helper";
import ErrorPopup from "@/components/errorPopup/ErrorPopup.js";
import SuccessPopup from "@/components/SuccessPopup/SuccessPopup";

export default function EditCity({ params }) {
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [sucessMessage, setSucessMessage] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [states, setStates] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestData = {
                    city_id: id,
                };

                setLoading(true);
                const response = await insertData("api/city/getbycity", requestData, true);

                if (response.status) {
                    setCity(response.data);
                    setErrorMessage('');
                } else {
                    
                    setShowErrorPopup(true);
                }
            } catch (err) {
                
                setShowErrorPopup(true);
            } finally {
                setLoading(false);
            }
        };


        const fetchStates = async () => {
            try {
              const requestData = {
                page: 1,
                limit: 100,
                lang: "en",
                searchTerm: "",
              };
        
              const response = await insertData("api/state/", requestData, true);
              if (response.status) {
                setStates(response.data.states || []);
              }
            } catch (err) {
              setErrors({ serverError: err.message || "An unexpected error occurred." });
              setShowErrorPopup(true);
            }
          };
        fetchData();
        fetchStates();
    }, [id]);

    const validationSchema = Yup.object({
        en_name: Yup.string().required("Title in English is required"),
        fr_name: Yup.string().required("Title in French is required"),
        latitude: Yup.string().required("Latitude is required"),
        longitude: Yup.string().required("Longitude is required"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await updateData("api/city/update", { ...values });

            if (response.status) {
                setSucessMessage(response.message || "State created successfully");
                router.push('/city-listing');
            } else {
                setErrors({ serverError: response.message || "Failed to create state." });
                setShowErrorPopup(true);
            }
        } catch (err) {
            setErrors({ serverError: err.message || "An unexpected error occurred." });
            setShowErrorPopup(true);
        } finally {
            setSubmitting(false);
        }
    };



    if (loading) {
        return <Preloader />;
    }

    if (errorMessage) {
        return (
            <LayoutAdmin>
                <div className="message error">{errorMessage}</div>
            </LayoutAdmin>
        );
    }

    return (
        <LayoutAdmin>
            <Formik
    initialValues={{
        en_name: city?.en_name || '', // Use en_name for English title
        fr_name: city?.fr_name || '', // Use fr_name for French title
        latitude: city?.latitude || '',
        longitude: city?.longitude || '',
        state_id: city?.state_id || '',
        city_id: id || '',
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
>
    {({setFieldValue, errors, touched }) => (
        <Form>
            <div className="widget-box-2">
                <h6 className="title">City Information</h6>
                <div className="box grid-2 gap-30">
                    <fieldset className="box box-fieldset">
                        <label htmlFor="en_name">Title English:<span>*</span></label>
                        <Field type="text" id="en_name" name="en_name" className="form-control style-1" />
                        <ErrorMessage name="en_name" component="div" className="error" />
                    </fieldset>
                    <fieldset className="box box-fieldset">
                        <label htmlFor="fr_name">Title French:<span>*</span></label>
                        <Field type="text" id="fr_name" name="fr_name" className="form-control style-1" />
                        <ErrorMessage name="fr_name" component="div" className="error" />
                    </fieldset>
                </div>
                <div className="box grid-2 gap-30">
                    <fieldset className="box box-fieldset">
                        <label htmlFor="latitude">Latitude:<span>*</span></label>
                        <Field type="number" id="latitude" name="latitude" className="form-control style-1" />
                        <ErrorMessage name="latitude" component="div" className="error" />
                    </fieldset>
                    <fieldset className="box box-fieldset">
                        <label htmlFor="longitude">Longitude:<span>*</span></label>
                        <Field type="number" id="longitude" name="longitude" className="form-control style-1" />
                        <ErrorMessage name="longitude" component="div" className="error" />
                    </fieldset>
                </div>
                <div className="box grid-2 gap-30">
                    <fieldset className="box box-fieldset">
                        <label htmlFor="desc">States:</label>
                            <Field as="select" name="state_id" className="nice-select country-code"
                                onChange={(e) => {
                                const selectedState = e.target.value;
                                console.log('selectedState: ', selectedState);
                                setFieldValue("state_id", selectedState);
                                }}
                            >
                            <option value="">Select State</option>
                            {states.map((state) => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                            ))}
                            </Field>
                    </fieldset>
                    {/* <fieldset className="box box-fieldset">
                        <label htmlFor="desc">Cities:</label>
                            <Field as="select" name="city_id" className="nice-select country-code"
                                onChange={(e) => {
                                const selectedCities = e.target.value;
                                setFieldValue("city_id", selectedCities);
                                }}
                            >
                            <option value="">Select Cities</option>
                            {cities.map((city) => (
                            <option key={city.id} value={city.id}>{city.city_name}</option>
                            ))}
                            </Field>
                    </fieldset> */}
                </div>
            </div>
            <button type="submit" className="tf-btn primary">Update City</button>
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
