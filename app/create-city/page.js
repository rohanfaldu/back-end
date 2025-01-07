'use client'
import PropertyMap from "@/components/elements/PropertyMap"
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
    const [states, setStates] = useState([]);

    const router = useRouter();


    useEffect(() => {
        fetchStates();
      }, []);
    
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



    const validationSchema = Yup.object({
        title_en: Yup.string().required("Title is required"),
        title_fr: Yup.string().required("Title is required"),
        latitude: Yup.string().required("Latitude is required"),
        longitude: Yup.mixed().required("Longitude is required"),
    });

    const handleSubmit = async (values, { resetForm, setErrors }) => {
        setShowErrorPopup(''); // Reset error popup
    
        try {
            const cityData = {
                en_name: values.title_en, // Map front-end values to backend fields
                fr_name: values.title_fr,
                latitude: parseFloat(values.latitude), // Convert to float
                longitude: parseFloat(values.longitude),
                state_id: values.state
            };
    
            console.log('Sending Property Data:', cityData);
    
            const createCityInfo = await insertData('api/city/create', cityData, true);
    
            if (createCityInfo.status) {
                setSucessMessage(createCityInfo.message || "City created successfully");
                resetForm();
                router.push('/city-listing');
            } else {
                setErrors({ serverError: createCityInfo.message || "Failed to create city." });
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
                                <h6 className="title">Cities Information</h6>
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
                                        <label htmlFor="desc">States:</label>
                                            <Field as="select" name="state" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("state", selectedState);
                                                }}
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state) => (
                                                    <option key={state.id} value={state.id}>{state.name}</option>
                                                ))}
                                            </Field>
                                    </fieldset>
                                </div>
                            </div>

                            <button type="submit"  className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)}>Add City</button>
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