'use client'
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { insertData } from "../../components/api/Axios/Helper";
import ErrorPopup from "../../components/errorPopup/ErrorPopup.js";
import SuccessPopup from "@/components/SuccessPopup/SuccessPopup";


export default function CreatePropertyAmenities() {
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [districts, setDistricts] = useState([]);

    const router = useRouter();


    useEffect(() => {
        const fetchStates = async () => {
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
    
        fetchStates(); // Ensures `fetchStates` runs only once on mount
    }, []); // Dependency array ensures `useEffect` runs only once
    



    const validationSchema = Yup.object({
        title_en: Yup.string().required("Title is required"),
        title_fr: Yup.string().required("Title is required"),
        latitude: Yup.string().required("Latitude is required"),
        longitude: Yup.mixed().required("Longitude is required"),
    });

    const handleSubmit = async (values, { resetForm, setErrors }) => {
        setShowErrorPopup(''); // Reset error popup
    
        try {
            const districtData = {
                en_name: values.title_en, // Map front-end values to backend fields
                fr_name: values.title_fr,
                latitude: parseFloat(values.latitude), // Convert to float
                longitude: parseFloat(values.longitude),
                district_id: values.district,
                lang: "en"
            };
    
            console.log('Sending Property Data:', districtData);
    
            const createDistrictInfo = await insertData('api/neighborhood/create', districtData, true);
    
            if (createDistrictInfo.status) {
                setSucessMessage(createDistrictInfo.message || "District created successfully");
                resetForm();
                router.push('/neighborhood-listing');
            } else {
                setErrors({ serverError: createDistrictInfo.message || "Failed to create district." });
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
                                <h6 className="title">Neighborhoods Information</h6>
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
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Latitude:<span>*</span></label>
                                        <Field type="text" id="latitude" name="latitude" className="form-control style-1" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Longitude:<span>*</span></label>
                                        <Field type="text" id="longitude" name="longitude" className="form-control style-1" />
                                    </fieldset>
                                </div>
                                <div className="box grid-2 gap-30">
                                <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Districts:</label>
                                            <Field as="select" name="district" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedDistrict = e.target.value;
                                                    setFieldValue("district", selectedDistrict);
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

                            <button type="submit"  className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)}>Add Neighborhoods</button>
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