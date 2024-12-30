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
export default function EditProject({params}) {
    const { id } = params;
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
	const [loading, setLoading] = useState(true);
    const [filePreview, setFilePreview] = useState(null);
    const [userDetail, setUserDetail] = useState(null);

    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
		try {
            const type = { type: "project" };
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
        username: Yup.string()
          .min(3, "Username must be at least 3 characters")
          .required("Username is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone Number is required"),
        image: Yup.mixed().required("Image is required"),
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

            if(imageUrl) {
                const userData = {
                    full_name: values.username,
                    user_name: values.username,
                    email_address: values.email,
                    fcm_token: '',
                    image_url: imageUrl,
                    type: "developer",
                    user_login_type	: userType("NONE"),
                    phone_number: values.phone.toString(),
                    password: "",
                    user_id: id,
                }
                console.log(userData);
                const checkData = {
                    email_address: values.email,
                    phone_number: parseInt(values.phone,10)
                }


                const getUserInfo = await insertData('auth/check/user', checkData, false);
                if(getUserInfo.status === false) {
                    const createUserInfo = await insertData('auth/update/user', userData, false);
                    if(createUserInfo.status === true) {
                        setSucessMessage(true);
                        setErrorMessage(createUserInfo.message);
                        router.push('/developer-listing');
                    }else{
                        setErrorMessage(createUserInfo.message);
                    }
                }else{
                    setErrorMessage(getUserInfo.message);
                }
            }else{
                setErrorMessage(response.data.message);
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
                        initialValues={{ username: userDetail.user_name, email: userDetail.email_address,  phone: userDetail.mobile_number,  image: userDetail.image  }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        >
                        {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
                            <Form>
                                <div>
                                    <div className="widget-box-2">
                                        <h6 className="title">Upload Media</h6>
                                        <div className="box-uploadfile text-center">
                                            <label className="uploadfile">
                                            <span className="icon icon-img-2" />
                                            <div className="btn-upload">
                                                <span className="tf-btn primary">Choose Image</span>
                                                <input
                                                type="file"
                                                className="ip-file"
                                                onChange={(event) => {
                                                    console.log(event.currentTarget);
                                                    const file = event.currentTarget.files[0];
                                                    setFieldValue("image", file);
                                                    setFilePreview(URL.createObjectURL(file));
                                                }}
                                                />
                                            </div>
                                            {filePreview && (
                                                <img
                                                src={filePreview}
                                                alt="Preview"
                                                style={{ width: "100px", marginTop: "10px" }}
                                                />
                                            )}
                                            <p className="file-name fw-5">
                                                Or drop image here to upload
                                            </p>
                                            </label>
                                            {errors.image && touched.image && (
                                            <div className="error">{errors.image}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="widget-box-2">
                                        <h6 className="title">Developer Information</h6>
                                        <div className="box-info-property">
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="title">User Name:<span>*</span></label>
                                                <Field type="text" id="username" name="username" className="form-control style-1" />
                                                <ErrorMessage name="username" component="div" className="error" />
                                            </fieldset>
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="desc">Email:<span>*</span></label>
                                                <Field type="email" id="email" name="email" />
                                                <ErrorMessage name="email" component="div" className="error" />
                                            </fieldset>
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="desc">Phone:<span>*</span></label>
                                                <Field type="text" id="phone" name="phone" />
                                                <ErrorMessage name="phone" component="div" className="error" />
                                            </fieldset>
                                        </div>
                                    </div>

                                    <button type="submit"  className="tf-btn primary" >Update Developer</button>
                                </div >
                            </Form>
                        )}
                        </Formik>


                    </LayoutAdmin >
            }
		</>
	)
}