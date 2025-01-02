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
import { updateData } from "../../../components/api/Axios/Helper";
import Preloader from '@/components/elements/Preloader';
import { allCountries } from "country-telephone-data";
import ErrorPopup from "@/components/errorPopup/ErrorPopup.js";


export default function EditAgency({params}) {
    const { id } = params;
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
	const [loading, setLoading] = useState(true);
    const [filePreview, setFilePreview] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [selectedCode, setSelectedCode] = useState("+33");
    const [agencyPackageList, setAgencyPackageList] = useState([]);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const [fileCoverImg, setFileCoverImg] = useState(null);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [selectedWhatsupCode, setSelectedWhatsupCode] = useState("+33");





    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
		try {
            const type = { user_id: id };
            const getUserInfo = await insertData(`api/agencies/${id}`, type, true);
            const allUsersList = getUserInfo.data;
			const specifcUserDetail = allUsersList;
			setUserDetail(specifcUserDetail);
			setFilePreview(specifcUserDetail.image);
			setLoading(false); // Stop loading
			setError(null); // Clear errors
		} catch (err) {
			setLoading(false); // Stop loading
		}
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
		};



		fetchData(); // Fetch data on component mount
	}, []);

    // console.log(userDetail);

   const validationSchema = Yup.object({
           whatsup_country_code: Yup.string().required("Country code is required"),
           facebook_link: Yup.string().url("Invalid URL").nullable(),
           twitter_link: Yup.string().url("Invalid URL").nullable(),
           youtube_link: Yup.string().url("Invalid URL").nullable(),
           pinterest_link: Yup.string().url("Invalid URL").nullable(),
           linkedin_link: Yup.string().url("Invalid URL").nullable(),
           instagram_link: Yup.string().url("Invalid URL").nullable()
       });
    const router = useRouter();
    // Handle form submission

    const handleSubmit = async (values, {resetForm}) => {
        console.log(values);
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
                    credit: "1500",
                    description: "Updated real estate agency description",
                    facebook_link: "https://facebook.com/updated-example",
                    twitter_link: "https://twitter.com/updated-example",
                    youtube_link: "https://youtube.com/updated-example",
                    pinterest_link: "https://pinterest.com/updated-example",
                    linkedin_link: "https://linkedin.com/updated-example",
                    instagram_link: "https://instagram.com/updated-example",
                    whatsup_number: "9876543210",
                    service_area: "San Francisco",
                    tax_number: "987654321",
                    license_number: "XYZ9876",
                    picture: "new-urltopicture.jpg",
                    cover: "new-urltocoverimage.jpg"
                }
                console.log(userData);
                

               
                const updateUserInfo = await updateData('api/agencies/dc2d9041-f597-4681-b283-0da8613c5b43', userData, true);
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


    const messageClass = (sucessMessage) ? "message success" : "message error";

	return (
		<>
            {loading?
                    <><Preloader /></>
                :
			        <LayoutAdmin>
                    {errorMessage && <div className={messageClass}>{errorMessage}</div>}
                    <Formik
                        initialValues={{  image: userDetail?.image || "",
                            description_en: userDetail?.description_en || "",
                            description_fr: userDetail?.description_fr || "",
                            whatsup_country_code: userDetail?.whatsup_country_code || "+33",
                            whatsup_number: userDetail?.whatsup_number || "",
                            service_area_en: userDetail?.service_area_en || "",
                            service_area_fr: userDetail?.service_area_fr || "",
                            tax_number: userDetail?.tax_number || "",
                            license_number: userDetail?.license_number || "",
                            credit: userDetail?.credit || "",
                            agency_packages: userDetail?.agency_packages || "",
                            picture_img: userDetail?.picture_img || "",
                            cover_img: userDetail?.cover_img || "",
                            facebook_link: userDetail?.facebook_link || "",
                            twitter_link: userDetail?.twitter_link || "",
                            youtube_link: userDetail?.youtube_link || "",
                            pinterest_link: userDetail?.pinterest_link || "",
                            linkedin_link: userDetail?.linkedin_link || "",
                            instagram_link: userDetail?.instagram_link || "",  }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        >
                        {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
                            <Form>
                                    <div>
                                        <div className="widget-box-2">
                                            <h6 className="title">Agency Information</h6>
                                            <div className="grid-2 box gap-30">
                                                <fieldset className="box-fieldset">
                                                    <label htmlFor="description_en">Description English:</label>
                                                    <Field type="textarea"  as="textarea"  id="description_en" name="description_en" className="textarea-tinymce" />
                                                </fieldset>
                                                <fieldset className="box-fieldset">
                                                    <label htmlFor="description_fr">Description French:</label>
                                                    <Field type="textarea"  as="textarea"  id="description_fr" name="description_fr" className="textarea-tinymce" />
                                                </fieldset>
                                            </div>
                                            <div className="box grid-4 gap-30">
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
                                            {/* Picture Image Fieldset */}
                                            <fieldset className="box-fieldset">
                                            <label htmlFor="picture_img">Picture Image:</label>
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
                                                {values.picture_img || filePictureImg ? (
                                                    <img
                                                    src={filePictureImg || values.picture_img}
                                                    alt="Preview"
                                                    className="uploadFileImage"
                                                    />
                                                ) : null}
                                                </div>
                                                <p className="file-name fw-5">Or drop image here to upload</p>
                                            </div>
                                            </fieldset>

                                            {/* Cover Image Fieldset */}
                                            <fieldset className="box-fieldset">
                                            <label htmlFor="cover_img">Cover Image:</label>
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
                                                {values.cover_img || fileCoverImg ? (
                                                    <img
                                                    src={fileCoverImg || values.cover_img}
                                                    alt="Preview"
                                                    className="uploadFileImage"
                                                    />
                                                ) : null}
                                                </div>
                                                <p className="file-name fw-5">Or drop image here to upload</p>
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
                                    </div>
                                    <button type="submit"  className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)}>Update Agency</button>
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
            }
		</>
	)
}