'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { userType } from "../../../components/common/functions";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import passwordShow from "../../../public/images/favicon/password-show.png";
import passwordHide from "../../../public/images/favicon/password-hide.png";
import { insertData, updateData } from "../../../components/api/Axios/Helper";
import Preloader from '@/components/elements/Preloader';
import { allCountries } from "country-telephone-data";
import ErrorPopup from "@/components/errorPopup/ErrorPopup.js";

export default function EditDeveloper({params}) {
    const { id } = params;
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
	const [loading, setLoading] = useState(true);
    const [filePreview, setFilePreview] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [developerDetail, setDeveloperDetail] = useState(null);

    const [selectedCode, setSelectedCode] = useState("+33");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [agencyPackageList, setAgencyPackageList] = useState([]);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const [fileCoverImg, setFileCoverImg] = useState(null);




    useEffect(() => {
            console.log(id);
            const fetchData = async () => {
            try {
                setLoading(true);
                const type = { user_id: id };
                const getDeveloperInfo = await insertData('api/developer/getbyuserid', type, true);
    
                if (getDeveloperInfo.status) {
                    setUserDetail(getDeveloperInfo.data.user);
                    setDeveloperDetail(getDeveloperInfo.data.developer);
                    setFilePreview(getDeveloperInfo.data.user.image);
                    setErrorMessage('');
                } else {
                    setShowErrorPopup(true);
                }
            } catch (err) {
                setShowErrorPopup(true); 
            } finally{
                setLoading(false);
            }
        };
            fetchData();
        }, []);

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

    const validationSchema = Yup.object({
        // username: Yup.string()
        //   .min(3, "Username must be at least 3 characters")
        //   .required("Username is required"),
        // email: Yup.string()
        //   .email("Invalid email format")
        //   .required("Email is required"),
        // phone: Yup.string()
        //     .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        //     .required("Phone Number is required"),
        // image: Yup.mixed().required("Image is required"),
    });



    const router = useRouter();
    const handleSubmit = async (values, { resetForm }) => {
        console.log(id);
        setErrorMessage('');
    
        // Create FormData for image upload
        const formData = new FormData();
        formData.append('image', values.image);
    
        try {
            let imageUrl = filePreview;
            if (values.image instanceof File) {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/images/upload/single`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                imageUrl = response.data.data.files.map(file => file.url)[0];
            }
    
            const userData = {
                user_name: values.username,
                full_name: values.fullname,
                email_address: values.email,
                phone_number: values.phone,
                country_code: values.country_code,
                image_url: imageUrl,
                user_id: id
            };
    
            console.log(userData);

            const updateUserInfo = await insertData("auth/update/allRole", userData, true);

            if (updateUserInfo.status) {
                const developerData = {
                    credit: values.credit,
                    description_en: values.description_en,
                    description_fr: values.description_fr,
                    whatsup_number: values.developer_phone,
                    service_area_en: values.service_area_en,
                    service_area_fr: values.service_area_fr,
                    tax_number: values.tax_number,
                    license_number: values.license_number,
                    country_code: values.developer_country_code,
                    agency_packages: values.agency_packages,
                    facebook_link: values.facebook_link,
                    twitter_link: values.twitter_link,
                    youtube_link: values.youtube_link,
                    pinterest_link: values.pinterest_link,
                    linkedin_link: values.linkedin_link,
                    instagram_link: values.instagram_link,
                };

                console.log(developerData);
                const updateDeveloperInfo = await updateData(`api/developer/${developerDetail.id}`, developerData, true);
                console.log(updateDeveloperInfo,"hbdshjbdhsbvhdbvhj")
                if(updateDeveloperInfo.status){
                    setSucessMessage(updateDeveloperInfo.message);
                }else{
                    setErrors({ serverError: response.message || "Failed to create state." });
                    setShowErrorPopup(true);
                }
            } else {
                setErrorMessage(updateUserInfo.data.message);
            }
    
        } catch (error) {
            console.error('Error updating user information:', error);
            setErrorMessage('Failed to update user information. Please try again.');
        }
    };


    const messageClass = (sucessMessage) ? "message success" : "message error";

	return (
		<>
            {loading?
                    <><Preloader /></>
                :
			        <LayoutAdmin>
                    {errorMessage && <div className={messageClass}>{errorMessage}</div>}
                    <Formik
                         initialValues={{
                          
                            image: userDetail?.image || "",
                            username: userDetail?.user_name || "",
                            fullname: userDetail?.full_name || "",
                            email: userDetail?.user_email_adress || "",
                            phone: userDetail?.mobile_number || "",
                            password: userDetail?.password || "",
                            country_code: userDetail?.country_code || "",


                            description_en: developerDetail.description_en || '',
                            description_fr: developerDetail.description_fr || '',
                            developer_country_code: developerDetail.country_code || '',
                            developer_phone: developerDetail.whatsup_number || '',
                            service_area_en: developerDetail.service_area_en || '',
                            service_area_fr: developerDetail.service_area_fr || '',
                            tax_number: developerDetail.tax_number || '',
                            license_number: developerDetail.license_number || '',
                            credit: developerDetail.credit || '',
                            agency_packages: developerDetail.agency_packages || '',

                            facebook_link: developerDetail?.facebook_link || "",
                            twitter_link: developerDetail?.twitter_link || "",
                            youtube_link: developerDetail?.youtube_link || "",
                            pinterest_link: developerDetail?.pinterest_link || "",
                            linkedin_link: developerDetail?.linkedin_link || "",
                            instagram_link: developerDetail?.instagram_link || "",

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
                                                            console.log(event)
                                                            const file = event.currentTarget.files[0];
                                                            console.log("Uploaded File: ", file); 
                                                            if (file) {
                                                                setFieldValue("image", file);
                                                                setFilePreview(URL.createObjectURL(file)); 
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {filePreview && (
                                                    <img src={filePreview} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />
                                                )}
                                                <p className="file-name fw-5"> Or drop image here to upload </p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="widget-box-2">
                                        <h6 className="title">User Information</h6>
                                        <div className="box grid-3 gap-30">
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="title">User Name:<span>*</span></label>
                                                <Field type="text" id="username" name="username" className="form-control style-1" />
                                            </fieldset>
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="title">Full Name:<span>*</span></label>
                                                <Field type="text" id="fullname" name="fullname" className="form-control style-1" />
                                            </fieldset>
                                            <fieldset className="box-fieldset">
                                                <label htmlFor="name">Mobile Number<span>*</span>:</label>
                                                <div className="phone-and-country-code">
                                                    <Field
                                                        as="select"
                                                        name="country_code"
                                                        className="nice-select country-code"
                                                        id="country-code"
                                                        onChange={(e) => {
                                                            const selectedState = e.target.value;
                                                            setFieldValue("country_code", selectedState);
                                                            console.log('Selected Country Code:', selectedState); // Debugging output
                                                        }}
                                                    >
                                                        <option value="">Select Country Code</option>
                                                        {allCountries && allCountries.length > 0 ? (
                                                            allCountries
                                                                .sort((a, b) => a.dialCode.localeCompare(b.dialCode))
                                                                .map((country, index) => (
                                                                    <option key={index} value={`+${country.dialCode}`}>
                                                                        {country.name} (+{country.dialCode})
                                                                    </option>
                                                                ))
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Field>
                                                    <Field
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        className="form-control style-1"
                                                    />
                                                </div>
                                            </fieldset>
    
    
                                        </div>
                                        <div className="box grid-2 gap-30">
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="desc">Email:<span>*</span></label>
                                                <Field type="email" id="email" name="email" />
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
                                            <fieldset className="box-fieldset">
                                                <label htmlFor="name">Mobile Number<span>*</span>:</label>
                                                <div className="phone-and-country-code">
                                                    <Field
                                                        as="select"
                                                        name="developer_country_code"
                                                        className="nice-select country-code"
                                                        id="country-code"
                                                        onChange={(e) => {
                                                            const selectedState = e.target.value;
                                                            setFieldValue("developer_country_code", selectedState);
                                                            console.log('Selected Country Code:', selectedState); // Debugging output
                                                        }}
                                                    >
                                                        <option value="">Select Country Code</option>
                                                        {allCountries && allCountries.length > 0 ? (
                                                            allCountries
                                                                .sort((a, b) => a.dialCode.localeCompare(b.dialCode))
                                                                .map((country, index) => (
                                                                    <option key={index} value={`+${country.dialCode}`}>
                                                                        {country.name} (+{country.dialCode})
                                                                    </option>
                                                                ))
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Field>
                                                    <Field
                                                        type="text"
                                                        id="phone"
                                                        name="developer_phone"
                                                        className="form-control style-1"
                                                    />
                                                </div>
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

                                    <button type="submit"  className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)}>Update Developer</button>
                                    {/* Error Popup */}
                                    {showErrorPopup && Object.keys(errors).length > 0 && (
                                        <ErrorPopup
                                            errors={errors}
                                            validationSchema={validationSchema}
                                            onClose={() => setShowErrorPopup(false)}
                                        />
                                    )}
                                </div>
                            </Form>
                        )}
                        </Formik>


                    </LayoutAdmin >
            }
		</>
	)
}