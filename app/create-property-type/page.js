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
import { insertMultipleUploadImage } from "../../components/common/imageUpload";
export default function CreatePropertyType() {
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const router = useRouter();
    const validationSchema = Yup.object({
        title_en: Yup.string().required("Title is required"),
        title_fr: Yup.string().required("Title is required"),
    });

    const handleSubmit = async (values, {resetForm}) => {
        console.log(values);
        setErrorMessage('');
        try {
          const propertData = {
              en_string: values.title_en,
              fr_string: values.title_fr
          };
          console.log(propertData);
          
          const createPrpertyInfo = await insertData('api/property-type/create', propertData, true);
          if(createPrpertyInfo.status) {
                setSucessMessage(true);
                setErrorMessage("Property of Type created successfully");
                router.push('/property-type-listing');
          }else{
              setErrorMessage(createPrpertyInfo.message);   
          } 
      } catch (error) {
          setErrorMessage(error.message);
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
                initialValues={{ 
                    title_en: "",
                    title_fr: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <div>
                            {/* <div className="widget-box-2">
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
                            </div> */}
                            <div className="widget-box-2">
                                <h6 className="title">Property Type Information</h6>
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Title English:<span>*</span></label>
                                        <Field type="text" id="title_en" name="title_en" className="form-control style-1" />
                                        <ErrorMessage name="title_en" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Title French:<span>*</span></label>
                                        <Field type="text" id="title_fr" name="title_fr" className="form-control style-1" />
                                        <ErrorMessage name="title_fr" component="div" className="error" />
                                    </fieldset>
                                </div>
                            </div>
                
                            <button type="submit"  className="tf-btn primary" >Add Property Type</button>
                        </div >
                    </Form>
                )}
                </Formik>
				

			</LayoutAdmin >
		</>
	)
}