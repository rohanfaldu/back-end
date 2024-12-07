'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { userType } from "../../components/common/functions";
import { useState } from "react"
import { useRouter } from 'next/navigation';
import passwordShow from "../../public/images/favicon/password-show.png"; 
import passwordHide from "../../public/images/favicon/password-hide.png"; 
import { insertData } from "../../components/api/Axios/Helper";
export default function CreateAgency() {
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const router = useRouter();
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
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
    });

    // Handle form submission
    const handleSubmit = async (values, {resetForm}) => {
        console.log(values);
        setErrorMessage('');
        const formData = new FormData();
        formData.append('image', values.image);
        if(uploadImage === null) {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/images/upload/single`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                });
                //console.log(response.data.data.files);
                const fileUrls = response.data.data.files.map(file => file.url);
                if(fileUrls.length > 0) {
                    setUploadImage(fileUrls[0]);    
                } else {
                    setErrorMessage(fileUrls.message);
                }   
            } catch (error) {
                setErrorMessage(error.message);
            } 
        }

        if(uploadImage){
            try {
                const userData = {
                    full_name: values.username??null, 
                    user_name: values.username??null, 
                    email_address: values.email??null, 
                    fcm_token: '', 
                    image_url: uploadImage, 
                    type: "agency", 
                    user_login_type	: userType("NONE"),
                    phone_number: values.phone.toString(),
                    password: values.password??null,
                    user_id: "",
                }
        
                const checkData = {
                    email_address: values.email, 
                    phone_number: parseInt(values.phone,10)
                }
            
                const getUserInfo = await insertData('auth/check/user', checkData);
                if(getUserInfo.status === false) {
                    const createUserInfo = await insertData('auth/create/user', userData);
                    if(createUserInfo.status === true) {
                        setSucessMessage(true);
                        setErrorMessage("Agency created successfully");
                        resetForm();
                        router.push('/agency-listing');
                    }else{
                        setErrorMessage(createUserInfo.message);   
                    } 
                }else{
                    setErrorMessage(getUserInfo.message);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
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

			<LayoutAdmin>
            {errorMessage && <div className={messageClass}>{errorMessage}</div>}
            <Formik
                initialValues={{ username: "", email: "",  phone: "",  image: null  }}
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
                                <h6 className="title">Agency Information</h6>
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
                
                            <button type="submit"  className="tf-btn primary" >Add Agency</button>
                        </div >
                    </Form>
                )}
                </Formik>
				

			</LayoutAdmin >
		</>
	)
}