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
export default function CreateProjectAmenities() {
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
        key: Yup.string().required("Key is required for Unique ID"),
        type: Yup.string().required("Type is required"),
        icon_img: Yup.mixed().required("Image is required"),
    });

    const handleSubmit = async (values, {resetForm}) => {
        console.log(values);
        setErrorMessage('');
        const uploadImageObj = [values.icon_img];
        const uploadImageUrl = await insertMultipleUploadImage('image', uploadImageObj);
        if(uploadImageUrl.files.length > 0) {
            const fileUrls = uploadImageUrl.files.map(file => file.url);
            let pictureUrl = null;
            if(uploadImageUrl.files.length > 0) {
                pictureUrl = fileUrls[0];
            }
            const checkPrpertyInfo = await insertData('api/project-type-listings/check', {key: values.key }, true);
            console.log(checkPrpertyInfo);
            if(checkPrpertyInfo.status) {
                try {
                    const propertData = {
                        en_string: values.title_en,
                        fr_string: values.title_fr,
                        icon: pictureUrl,
                        type: values.type,
                        key: values.key,
                        category: 1
                    };
                    console.log(propertData);
                    
                    const createPrpertyInfo = await insertData('api/project-type-listings/create', propertData, true);
                    if(createPrpertyInfo.status) {
                        setSucessMessage(true);
                        setErrorMessage("Project of Amenities created successfully");
                        router.push('/project-amenities-listing');
                    }else{
                        setErrorMessage(createPrpertyInfo.message);   
                    } 
                } catch (error) {
                    setErrorMessage(error.message);
                }
            }else{
                setErrorMessage(checkPrpertyInfo.message);
            }
        }else{
            setErrorMessage("Image not Found");
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
                    type: "",
                    key: "", 
                    icon_img: "", 
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
                                <h6 className="title">Project Amenities Information</h6>
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
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Type:<span>*</span></label>
                                        <Field as="select" name="type" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("type", selectedState);
                                                }}
                                            >
                                            <option value="">Select Type</option>
                                            <option value="number">Number</option>
                                            <option value="boolean">Boolean</option>
                                        </Field>
                                        <ErrorMessage name="type" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Key:<span>*</span></label>
                                        <Field type="text" id="key" name="key" className="form-control style-1" />
                                        <ErrorMessage name="key" component="div" className="error" />
                                    </fieldset>
                                </div>
                                <div className="grid-2 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">Icon Image:</label>
                                        <div className="box-floor-img uploadfile">
                                            <div className="btn-upload">
                                                <Link href="#" className="tf-btn primary">Choose File</Link>
                                                <input
                                                    type="file"
                                                    className="ip-file"
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        setFieldValue("icon_img", file);
                                                        setFilePictureImg(URL.createObjectURL(file));
                                                    }}
                                                />
                                                {filePictureImg && ( <img src={filePictureImg} alt="Preview" className="uploadFileImage" /> )}
                                            </div>
                                            <p className="file-name fw-5"> Or drop image here to upload </p>
                                            {errors.icon_img && touched.icon_img && ( <div className="error">{errors.icon_img}</div> )}
                                        </div>
                                    </fieldset>
                                </div>
                                
                            </div>
                
                            <button type="submit"  className="tf-btn primary" >Add Project Amenities</button>
                        </div >
                    </Form>
                )}
                </Formik>
				

			</LayoutAdmin >
		</>
	)
}