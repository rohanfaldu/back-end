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
import { insertUploadImage } from "../../components/common/imageUpload"
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
        facebook_link: Yup.string().url("Invalid URL").nullable(),
        twitter_link: Yup.string().url("Invalid URL").nullable(),
        youtube_link: Yup.string().url("Invalid URL").nullable(),
        pinterest_link: Yup.string().url("Invalid URL").nullable(),
        linkedin_link: Yup.string().url("Invalid URL").nullable(),
        instagram_link: Yup.string().url("Invalid URL").nullable()
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
    const handleSubmit = async (values, {resetForm}) => {
        setErrorMessage('');
        console.log(values);
        const checkData = { email_address: values.email, phone_number: parseInt(values.phone,10) }
        const getUserInfo = await insertData('auth/check/user', checkData, false);
        if(getUserInfo.status === false) {
            /********* upload image ***********/
            const fileUrls = await insertUploadImage('image', values.image);
            if(fileUrls) {

                /********* create user ***********/
                try {
                    const userData = {
                        full_name: values.username??null, 
                        user_name: values.username??null, 
                        email_address: values.email??null, 
                        fcm_token: '', 
                        image_url: fileUrls, 
                        type: "agency", 
                        user_login_type	: userType("NONE"),
                        phone_number: values.phone.toString(),
                        password: values.password??null,
                        user_id: null,
                        device_type:"web",
                        social_id: null
                    }
                    const createUserInfo = await insertData('auth/create/user', userData, false);
                    console.log(createUserInfo.status);
                    if(createUserInfo.status === true) {
                        setSucessMessage(true);
                        setErrorMessage("Agency created successfully");
                        /********* create agency ***********/
                        const user_id = createUserInfo.data.userProfile.id;
                        const agencyData = {  
                            user_id:  user_id,
                            sub_user_id:  null,
                            credit:  values.credit??null,
                            description: values.description??null,
                            facebook_link:  values.facebook_link??null,
                            twitter_link: values.twitter_link??null,
                            youtube_link:  values.youtube_link??null,
                            pinterest_link:  values.pinterest_link??null,
                            linkedin_link:  values.linkedin_link??null,
                            instagram_link:  values.instagram_link??null,
                            whatsup_number:  values.whatsup_number??null,
                            service_area:  values.service_area??null,
                            tax_number:  values.tax_number??null,
                            license_number:  values.license_number??null,
                            agency_packages:  values.agency_packages??null,
                            picture: null,
                            cover: null
                        };
                        console.log(agencyData);
                        const createAgencyInfo = await insertData('api/agencies/create', agencyData, true);
                        if(createAgencyInfo.status === true) {
                            resetForm();
                            router.push('/agency-listing');    
                        } else{
                            setErrorMessage(createAgencyInfo.message);   
                        }
                    }else{
                        setErrorMessage(createUserInfo.message);   
                    } 
                } catch (error) {
                    setErrorMessage(error.message);
                } 
            } else {
               setErrorMessage(fileUrls.message);
            }
        }else{
            setErrorMessage(getUserInfo.message);
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

			{/* <DeleteFile /> */}
            <div className="error-message" >
                <ul>
                    <li>12</li>
                    <li>23</li>
                    <li>45</li>
                    <li>66</li>
                </ul>
                <p>Please check the required fields</p>
            </div>
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
                    facebook_link: "",
                    twitter_link: "",
                    youtube_link: "",
                    pinterest_link: "", 
                    linkedin_link: "",  
                    instagram_link: "",  
                    country_code: "+33",
                    whatsup_country_code: "+33",
                 }}  
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <div>
                            <div className="widget-box-2">
                                <h6 className="title">Upload Agency User Image</h6>
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
                                    {errors.image && touched.image && (
                                    <div className="error">{errors.image}</div>
                                    )}
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">User Information</h6>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">User Name:<span>*</span></label>
                                        <Field type="text" id="username" name="username" className="form-control style-1" />
                                        <ErrorMessage name="username" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Full Name:<span>*</span></label>
                                        <Field type="text" id="fullname" name="fullname" className="form-control style-1" />
                                        <ErrorMessage name="fullname" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box-fieldset ">
                                        <label htmlFor="name">Mobile Number<span>*</span>:</label>
                                            <div className="phone-and-country-code">
                                                <Field as="select" name="country_code" className="nice-select country-code"
                                                    id="country-code"
                                                    value={selectedCode}
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
                                        <ErrorMessage name="phone" component="div" className="error" />
                                        <ErrorMessage name="country_code" component="div" className="error" />
                                    </fieldset>
                                </div>
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Email:<span>*</span></label>
                                        <Field type="email" id="email" name="email" />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box-fieldset">
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
                                        <ErrorMessage name="password" component="div" className="error" />
                                    </fieldset>
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Agency Information</h6>
                                <div className="grid-1 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Description:</label>
                                        
                                        <Field type="textarea"  as="textarea"  id="description" name="description" className="textarea-tinymce" />
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Whatsup number:</label>
                                            <div className="phone-and-country-code">
                                                <Field as="select" name="whatsup_country_code" className="nice-select country-code"
                                                    id="country-code"
                                                    value={selectedCode}
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
                                        <ErrorMessage name="whatsup_country_code" component="div" className="error" />
                                        <ErrorMessage name="whatsup_number" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Service Area:</label>
                                        <Field type="text" name="service_area" className="box-fieldset"  />
                                        <ErrorMessage name="service_area" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Tax Number:</label>
                                        <Field type="text"  name="tax_number" className="box-fieldset" />
                                        <ErrorMessage name="tax_number" component="div" className="error" />
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">License number:</label>
                                        <Field type="text" id="license_number" name="license_number" className="box-fieldset" />
                                        <ErrorMessage name="license_number" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Credit:</label>
                                        <Field type="text" name="credit" className="box-fieldset"  />
                                        <ErrorMessage name="credit" component="div" className="error" />
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
                                        <ErrorMessage name="agency_packages" component="div" className="error" />
                                    </fieldset>
                                </div>
                                <div className="grid-2 box gap-30">
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
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Other Information</h6>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Facebook Link:</label>
                                        <Field type="text" id="facebook_link" name="facebook_link" className="box-fieldset" />
                                        <ErrorMessage name="facebook_link" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Twitter Link:</label>
                                        <Field type="text" name="twitter_link" className="box-fieldset"  />
                                        <ErrorMessage name="twitter_link" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Youtube Link:</label>
                                        <Field type="text"  name="youtube_link" className="box-fieldset" />
                                        <ErrorMessage name="youtube_link" component="div" className="error" />
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Pinterest Link:</label>
                                        <Field type="text" name="pinterest_link" className="box-fieldset" />
                                        <ErrorMessage name="pinterest_link" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Linkedin Link:</label>
                                        <Field type="text" name="linkedin_link" className="box-fieldset" />
                                        <ErrorMessage name="linkedin_link" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Instagram Link:</label>
                                        <Field type="text" name="instagram_link" className="box-fieldset" />
                                        <ErrorMessage name="instagram_link" component="div" className="error" />
                                    </fieldset>
                                </div>
                            </div>
                            <button type="submit"  className="tf-btn primary" >Add Agency</button>
                        </div >
                    </Form>
                )}
                </Formik>
				

			</LayoutAdmin >
		</>
	)
}