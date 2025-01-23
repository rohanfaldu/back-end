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

export default function EditDistrict({ params }) {
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [neighborhood, setNeighborhoods] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [sucessMessage, setSucessMessage] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [districts, setDistricts] = useState([]);
    const router = useRouter();
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestData = {
                    id: id,
                };

                setLoading(true);
                const response = await insertData("api/neighborhood/getId", requestData, true);

                if (response.status) {
                    setNeighborhoods(response.data);
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

        const fetchCities = async () => {
            try {
                const requestData = {
                    page: 1,
                    limit: 100,
                    lang: "en",
                    searchTerm: "",
                };
    
                const response = await insertData("api/city/", requestData, true);
                if (response.status) {
                    setCities(response.data.cities || []);
                }
            } catch (err) {
                setErrors({ serverError: err.message || "An unexpected error occurred." });
                setShowErrorPopup(true);
            }
        };

        const fetchDistricts = async () => {
            try {
              const requestData = {
                page: 1,
                limit: 100,
                lang: "en",
                searchTerm: "",
              };
        
              const response = await insertData("api/district/", requestData, true);
              if (response.status) {
                setDistricts(response.data.districts || []);
              }
            } catch (err) {
              setErrors({ serverError: err.message || "An unexpected error occurred." });
              setShowErrorPopup(true);
            }
          };
        fetchData();
        fetchDistricts();
        fetchCities();

    }, [id]);

    const validationSchema = Yup.object({
        en_name: Yup.string().required("Title in English is required"),
        fr_name: Yup.string().required("Title in French is required"),
        latitude: Yup.string().required("Latitude is required"),
        longitude: Yup.string().required("Longitude is required"),
        city_id: Yup.string().required("City is required"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await updateData(`api/neighborhood/${id}`, { ...values }, true);

            if (response.status) {
                setSucessMessage(response.message || "Neighborhood created successfully");
                router.push('/neighborhood-listing');
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
        en_name: neighborhood?.en_name || '', // Use en_name for English title
        fr_name: neighborhood?.fr_name || '', // Use fr_name for French title
        latitude: neighborhood?.latitude || '',
        longitude: neighborhood?.longitude || '',
        district_id: neighborhood?.district_id || '',
        city_id: neighborhood?.city_id || ''
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
>
    {({setFieldValue, errors, touched }) => (
        <Form>
            <div className="widget-box-2">
                <h6 className="title">Neighborhood Information</h6>
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
                        <label htmlFor="desc">Cities:<span>*</span></label>
                            <Field as="select" name="city_id" className="nice-select country-code"
                                onChange={(e) => {
                                const selectedCity = e.target.value;
                                setFieldValue("city_id", selectedCity);
                                }}
                            >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                            <option key={city.id} value={city.id}>{city.city_name}</option>
                            ))}
                            </Field>
                    </fieldset>

                    <fieldset className="box box-fieldset">
                        <label htmlFor="desc">Districts:</label>
                            <Field as="select" name="district_id" className="nice-select country-code"
                                onChange={(e) => {
                                const selectedDistrict = e.target.value;
                                console.log('selectedState: ', selectedDistrict);
                                setFieldValue("district_id", selectedDistrict);
                                }}
                            >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                            <option key={district.id} value={district.id}>{district.district_name}</option>
                            ))}
                            </Field>
                    </fieldset>
                </div>
            </div>
            <button type="submit" className="tf-btn primary">Update Neighborhood</button>
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
