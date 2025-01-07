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
import { insertData } from "../../../components/api/Axios/Helper";
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
    const [selectedCode, setSelectedCode] = useState("+33");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [agencyPackageList, setAgencyPackageList] = useState([]);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const [fileCoverImg, setFileCoverImg] = useState(null);




    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
		try {
            const type = { type: "developer" };
            const getUserInfo = await insertData('auth/getall', type, false);
            const allUsersList = getUserInfo.data.user_data;
			const specifcUserDetail = allUsersList.find(item => item.id === id);
			setUserDetail(specifcUserDetail);
			setFilePreview(specifcUserDetail.image);
			setLoading(false); // Stop loading
			setError(null); // Clear errors
		} catch (err) {
			setLoading(false); // Stop loading
		}
		};
		fetchData(); // Fetch data on component mount
	}, []);

    console.log(userDetail);

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
    // Handle form submission

    const handleDelete = async (id) => {
        const deleteData = { user_id: id, is_deleted: true };
        try {
            const deleteUserInfo = await insertData('auth/update/user', deleteData, false);
            if(deleteUserInfo.status === true) {
                setSucessMessage(true);
                setErrorMessage(createUserInfo.message);
                router.push('/developer-listing');
            }else{
                setErrorMessage(createUserInfo.message);
            }
            console.log(response);
            router.push('/developer-listing');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const handleSubmit = async (values, {resetForm}) => {
        console.log(id);
        // console.log(values);
        setErrorMessage('');
        const formData = new FormData();
        formData.append('image', values.image);

        try {
            let imageUrl = filePreview;
            if (values.image instanceof File) {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/images/upload/single`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                imageUrl = response.data.data.files.map(file => file.url);// New uploaded image URL
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/images/upload/single`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });


                const userData = {
                    credit: values.credit,
                    description_en:  values.description_en,
                    description_en:  values.description_fr,
                    facebook_link: values.facebook_link,
                    twitter_link:values.twitter_link,
                    youtube_link: values.youtube_link,
                    pinterest_link: values.pinterest_link,
                    linkedin_link: values.linkedin_link,
                    instagram_link: values.instagram_link,
                    whatsup_number: values.whatsup_number,
                    service_area_en: values.service_area_en,
                    service_area_fr: values.service_area_fr,
                    tax_number: values.tax_number,
                    license_number: values.license_number,
                    picture: "new-urltopicture.jpg",
                    cover: "new-urltocoverimage.jpg"
                }
                console.log(userData);


                const updateUserInfo = await updateData(`api/developer/${id}`, userData, true);
                if(updateUserInfo.status === true) {
                        setSucessMessage(true);
                        setErrorMessage(updateUserInfo.message);
                        router.push('/agency-listing');
                    }else{
                        setErrorMessage(updateUserInfo.message);
                    }


        } catch (error) {
          console.error('Error uploading file:', error);
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
            {loading?
                    <><Preloader /></>
                :
			        <LayoutAdmin>
                    {errorMessage && <div className={messageClass}>{errorMessage}</div>}
                    <Formik
                         initialValues={{
                          
                            description_en: userDetail.description_en,
                            description_fr: userDetail.description_fr,
                            service_area_fr: userDetail.service_area_fr,
                            service_area_en: userDetail.service_area_en,
                            facebook_link: userDetail.facebook_link,
                            twitter_link: userDetail.youtube_link,
                            youtube_link: userDetail.youtube_link,
                            pinterest_link: userDetail.pinterest_link,
                            linkedin_link: userDetail.linkedin_link,
                            instagram_link: userDetail.instagram_link,
                            country_code: userDetail.country_code,
                            whatsup_country_code: userDetail.country_code,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        >
                        {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
                            <Form>
                                <div>
                                    
                                    
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