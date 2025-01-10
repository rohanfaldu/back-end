'use client'
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const [fileCoverImg, setFileCoverImg] = useState(null);
    const [selectedCode, setSelectedCode] = useState("+33");
    const [agencyPackageList, setAgencyPackageList] = useState([]);
    const [selectedWhatsupCode, setSelectedWhatsupCode] = useState("+33");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [loading, setLoading] = useState(false); // Loader state

    const router = useRouter();
    const validationSchema = Yup.object({
        username: Yup.string() .min(3, "User name must be at least 3 characters") .required("User name is required"),
        fullname: Yup.string().min(5, "Full name must be at least 5 characters") .required("Full name is required"),
        email: Yup.string() .email("Invalid email format") .required("Email is required"),
        country_code: Yup.string().required("Country code is required"),
        whatsup_country_code: Yup.string().required("Country code is required"),
        phone: Yup.string() .matches(/^\d{10}$/, "Phone number must be exactly 10 digits") .required("Phone Number is required"),
        image: Yup.mixed().required("Image is required"),
        password: Yup.string() .min(6, "Password must be at least 6 characters") .required("Password is required"),
        facebook_link: Yup.string().url("Invalid facebook URL").nullable(),
        twitter_link: Yup.string().url("Invalid twitter URL").nullable(),
        youtube_link: Yup.string().url("Invalid youtube URL").nullable(),
        pinterest_link: Yup.string().url("Invalid pinterest URL").nullable(),
        linkedin_link: Yup.string().url("Invalid linkedin URL").nullable(),
        instagram_link: Yup.string().url("Invalid instagram URL").nullable(),
        agency_packages: Yup.string().required("Agency packages are required"),
    });

    useEffect (() => {
        const fetchData = async () => {
            try{
                if(agencyPackageList.length === 0){
                    const getAgencyPackageListInfo = await insertData('api/agency-packages/', {page: 1, limit: 100}, true);
                    if(getAgencyPackageListInfo) {
                        setAgencyPackageList(getAgencyPackageListInfo.data.list);
                    }
                }
            }catch (error) {
                console.error('Error inserting data:', error);
            }
        }
        fetchData();
    });

    // Handle form submission
    const handleSubmit = async (values, { resetForm, setErrors }) => {
        setShowErrorPopup(false); // Reset error popup initially
        try {
            console.log(values);

            // Check if user exists
            const checkData = { email_address: values.email, phone_number: parseInt(values.phone, 10) };
            const getUserInfo = await insertData('auth/check/user', checkData, false);

            if (getUserInfo.status === false) {
                /********* Upload Image ***********/
                const fileUrls = await insertUploadImage('image', values.image);

                if (fileUrls) {
                    try {
                        setLoading(true); // Start loader

                        /********* Create User ***********/
                        const userData = {
                            full_name: values.username ?? null,
                            user_name: values.username ?? null,
                            email_address: values.email ?? null,
                            fcm_token: '',
                            image_url: fileUrls,
                            type: "developer",
                            user_login_type: userType("NONE"),
                            phone_number: values.phone.toString(),
                            password: values.password ?? null,
                            user_id: null,
                            device_type: "web",
                            social_id: null,
                            country_code: values.country_code,
                        };

                        const createUserInfo = await insertData('auth/create/user', userData, false);

                        if (createUserInfo.status === true) {
                            setSucessMessage(true);
                            setShowErrorPopup("Developer created successfully");

                            /********* Create Developer ***********/
                            const user_id = createUserInfo.data.userProfile.id;
                            const developerData = {
                                user_id: user_id,
                                sub_user_id: null,
                                credit: values.credit ?? null,
                                description_en: values.description_en ?? null,
                                description_fr: values.description_fr ?? null,
                                facebook_link: values.facebook_link ?? null,
                                twitter_link: values.twitter_link ?? null,
                                youtube_link: values.youtube_link ?? null,
                                pinterest_link: values.pinterest_link ?? null,
                                linkedin_link: values.linkedin_link ?? null,
                                instagram_link: values.instagram_link ?? null,
                                whatsup_number: values.whatsup_number ?? null,
                                service_area_en: values.service_area_en ?? null,
                                service_area_fr: values.service_area_fr ?? null,
                                tax_number: values.tax_number ?? null,
                                license_number: values.license_number ?? null,
                                agency_packages: values.agency_packages ?? null,
                                country_code: values.whatsup_country_code,
                                picture: null,
                                cover: null
                            };

                            console.log(developerData);
                            const createDeveloperInfo = await insertData('api/developer/create', developerData, true);

                            if (createDeveloperInfo.status === true) {
                                resetForm();
                                router.push('/developer-listing');
                            } else {
                                setErrors({ serverError: createDeveloperInfo.message });
                                setShowErrorPopup(true);
                            }
                        } else {
                            setErrors({ serverError: createUserInfo.message });
                            setShowErrorPopup(true);
                        }
                    } catch (error) {
                        setErrors({ serverError: error.message });
                        setShowErrorPopup(true);
                    }
                } else {
                    setErrors({ serverError: fileUrls.message });
                    setShowErrorPopup(true);
                }
            } else {
                setErrors({ serverError: getUserInfo.message });
                setShowErrorPopup(true);
            }
        } catch (error) {
            setErrors({ serverError: error.message });
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
                    username: "",
                    email: "",
                    phone: "",
                    image: null,
                    password: "",
                    fullname: "",
                    description_en: "",
                    description_fr: "",
                    service_area_fr: "",
                    service_area_en: "",
                    facebook_link: "",
                    twitter_link: "",
                    youtube_link: "",
                    pinterest_link: "",
                    linkedin_link: "",
                    instagram_link: "",
                    country_code: "+33",
                    whatsup_country_code: "+33",
                    agency_packages: ""
                 }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <div>
                            <div className="widget-box-2">
                                <h6 className="title">Upload Developer User Image</h6>
                                <div className="box-uploadfile text-center">
                                    <label className="uploadfile">
                                    <span className="icon icon-img-2" />
                                    <div className="btn-upload">
                                        <span className="tf-btn primary">Choose Image</span>
                                        <input
                                            type="file"
                                            className="ip-file"
                                            onChange={(event) => {
                                                const file = event.currentTarget.files[0];
                                                setFieldValue("image", file);
                                                setFilePreview(URL.createObjectURL(file));
                                            }}
                                        />
                                    </div>
                                    {filePreview && ( <img src={filePreview} alt="Preview" style={{ width: "100px", marginTop: "10px" }} /> )}
                                    <p className="file-name fw-5"> Or drop image here to upload </p>
                                    </label>
                                    {/* {errors.image && touched.image && (
                                    <div className="error">{errors.image}</div>
                                    )} */}
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">User Information</h6>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">User Name:<span>*</span></label>
                                        <Field type="text" id="username" name="username" className="form-control style-1" />
                                        {/* <ErrorMessage name="username" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Full Name:<span>*</span></label>
                                        <Field type="text" id="fullname" name="fullname" className="form-control style-1" />
                                        {/* <ErrorMessage name="fullname" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box-fieldset ">
                                        <label htmlFor="name">Mobile Number<span>*</span>:</label>
                                            <div className="phone-and-country-code">
                                                <Field as="select" name="country_code" className="nice-select country-code"
                                                    id="country-code"
                                                   
                                                    onChange={(e) => {
                                                        const selectedState = e.target.value;
                                                        setSelectedCode(selectedState);
                                                        setFieldValue("country_code", selectedState);
                                                        //handleCityChange(selectedState);
                                                    }}
                                                >
                                                    <option value="">Select Country Code</option>
                                                    {allCountries && allCountries.length > 0 ? (
                                                        allCountries
                                                        .sort((a, b) => a.dialCode.localeCompare(b.dialCode)) // Sort alphabetically by country name
                                                        .map((country, index) =>(
                                                            <option key={index} value={`+${country.dialCode}`}>{country.name} (+{country.dialCode})
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Field>
                                                <Field type="text" id="phone" name="phone" className="form-control style-1" />
                                            </div>
                                        {/* <ErrorMessage name="phone" component="div" className="error" /> */}
                                        {/* <ErrorMessage name="country_code" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Email:<span>*</span></label>
                                        <Field type="email" id="email" name="email" />
                                        {/* <ErrorMessage name="email" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box-fieldset password-field">
                                        <label htmlFor="pass">Password<span>*</span>:</label>
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{ width: "100%", paddingRight: "2.5rem" }}
                                        />
                                        <span
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="show-password"
                                            >
                                            {showPassword ? <img src="/images/favicon/password-hide.png" /> : <img src="/images/favicon/password-show.png" /> }
                                        </span>
                                        {/* <ErrorMessage name="password" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Developer Information</h6>
                                <div className="grid-1 box gap-30">
                                <fieldset className="box-fieldset">
                                    <label htmlFor="description_en">Description English:</label>
                                    <Field type="textarea"  as="textarea"  id="description_en" name="description_en" className="textarea-tinymce" />
                                </fieldset>
                                <fieldset className="box-fieldset">
                                    <label htmlFor="description_fr">Description French:</label>
                                    <Field type="textarea"  as="textarea"  id="description_fr" name="description_fr" className="textarea-tinymce" />
                                </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Whatsup number:</label>
                                            <div className="phone-and-country-code">
                                                <Field as="select" name="whatsup_country_code" className="nice-select country-code"
                                                    id="whatsup-country-code"
                                                    
                                                    onChange={(e) => {
                                                        const selectedState = e.target.value;
                                                        setSelectedWhatsupCode(selectedState);
                                                        setFieldValue("whatsup_country_code", selectedState);
                                                        //handleCityChange(selectedState);
                                                    }}
                                                >
                                                    <option value="">Select Country Code</option>
                                                    {allCountries && allCountries.length > 0 ? (
                                                        allCountries
                                                        .sort((a, b) => a.dialCode.localeCompare(b.dialCode)) // Sort alphabetically by country name
                                                        .map((country, index) =>(
                                                            <option key={index} value={`+${country.dialCode}`}>{country.name} (+{country.dialCode})
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Field>
                                                <Field type="text" id="whatsup_number" name="whatsup_number" className="box-fieldset" />
                                            </div>
                                        {/* <ErrorMessage name="whatsup_country_code" component="div" className="error" /> */}
                                        {/* <ErrorMessage name="whatsup_number" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                    <label htmlFor="service_area_en">Service Area English:</label>
                                        <Field type="text" name="service_area_en" className="box-fieldset"  />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Service Area French:</label>
                                        <Field type="text" name="service_area_fr" className="box-fieldset"  />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Tax Number:</label>
                                        <Field type="text"  name="tax_number" className="box-fieldset" />
                                        {/* <ErrorMessage name="tax_number" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">License number:</label>
                                        <Field type="text" id="license_number" name="license_number" className="box-fieldset" />
                                        {/* <ErrorMessage name="license_number" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Credit:</label>
                                        <Field type="text" name="credit" className="box-fieldset"  />
                                        {/* <ErrorMessage name="credit" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Agency Packages:</label>
                                            <Field as="select" name="agency_packages" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("agency_packages", selectedState);
                                                    //handleAgencyPackageChange(selectedState);
                                                }}
                                            >
                                                <option value="">Select Agency Packages</option>
                                                {agencyPackageList && agencyPackageList.length > 0 ? (
                                                    agencyPackageList.map((agency) => (
                                                        <option key={agency.id} value={agency.id}>
                                                            {agency.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </Field>
                                        {/* <ErrorMessage name="agency_packages" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                                {/* <div className="grid-2 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">Picture Image:</label>
                                        <div className="box-floor-img uploadfile">
                                            <div className="btn-upload">
                                                <Link href="#" className="tf-btn primary">Choose File</Link>
                                                <input
                                                    type="file"
                                                    className="ip-file"
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        setFieldValue("picture_img", file);
                                                        setFilePictureImg(URL.createObjectURL(file));
                                                    }}
                                                />
                                                {filePictureImg && ( <img src={filePictureImg} alt="Preview" className="uploadFileImage" /> )}
                                            </div>
                                            <p className="file-name fw-5"> Or drop image here to upload </p>
                                        </div>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">Cover Image:</label>
                                        <div className="box-floor-img uploadfile">
                                            <div className="btn-upload">
                                                <Link href="#" className="tf-btn primary">Choose File</Link>
                                                <input
                                                    type="file"
                                                    className="ip-file"
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        setFieldValue("cover_img", file);
                                                        setFileCoverImg(URL.createObjectURL(file));
                                                    }}
                                                />
                                                {fileCoverImg && ( <img src={fileCoverImg} alt="Preview" className="uploadFileImage" /> )}
                                            </div>
                                            <p className="file-name fw-5"> Or drop image here to upload </p>
                                        </div>
                                    </fieldset>
                                </div> */}
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Other Information</h6>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Facebook Link:</label>
                                        <Field type="text" id="facebook_link" name="facebook_link" className="box-fieldset" />
                                        {/* <ErrorMessage name="facebook_link" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Twitter Link:</label>
                                        <Field type="text" name="twitter_link" className="box-fieldset"  />
                                        {/* <ErrorMessage name="twitter_link" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Youtube Link:</label>
                                        <Field type="text"  name="youtube_link" className="box-fieldset" />
                                        {/* <ErrorMessage name="youtube_link" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Pinterest Link:</label>
                                        <Field type="text" name="pinterest_link" className="box-fieldset" />
                                        {/* <ErrorMessage name="pinterest_link" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Linkedin Link:</label>
                                        <Field type="text" name="linkedin_link" className="box-fieldset" />
                                        {/* <ErrorMessage name="linkedin_link" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Instagram Link:</label>
                                        <Field type="text" name="instagram_link" className="box-fieldset" />
                                        {/* <ErrorMessage name="instagram_link" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                            </div>
                            <button type="submit"  className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)} >Add Developer</button>
                        </div >
                        {/* Error Popup */}
                          {showErrorPopup && Object.keys(errors).length > 0 && (
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