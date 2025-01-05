'use client'
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { insertData } from "../../components/api/Axios/Helper";
import { insertMultipleUploadImage } from "../../components/common/imageUpload";
import ErrorPopup from "../../components/errorPopup/ErrorPopup.js";
import Preloader from "@/components/elements/Preloader"; // Import Preloader component

export default function CreateProjectAmenities() {
	const [sucessMessage, setSucessMessage] = useState(false);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const router = useRouter();
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [loading, setLoading] = useState(false); // Loader state
    const validationSchema = Yup.object({
        title_en: Yup.string().required("Title is required"),
        title_fr: Yup.string().required("Title is required"),
        key: Yup.string().required("Key is required for Unique ID"),
        type: Yup.string().required("Type is required"),
        icon_img: Yup.mixed().required("Image is required"),
    });

    const handleSubmit = async (values, { resetForm, setErrors }) => {
        console.log(values);
        setShowErrorPopup(false); // Ensure popup is initially closed.

        try {
            /********* Upload Image ***********/
            const uploadImageObj = [values.icon_img];
            const uploadImageUrl = await insertMultipleUploadImage("image", uploadImageObj);

            if (uploadImageUrl.files.length > 0) {
                const fileUrls = uploadImageUrl.files.map((file) => file.url);
                const pictureUrl = fileUrls[0] || null;

                if (!pictureUrl) {
                    setErrors({ serverError: "Image not found or failed to upload." });
                    setShowErrorPopup(true);
                    return;
                }
                            setLoading(true); // Start loader

                /********* Check Property Info ***********/
                const checkPropertyInfo = await insertData("api/project-type-listings/check", { key: values.key }, true);

                if (checkPropertyInfo.status) {
                    /********* Create Property Info ***********/
                    const propertyData = {
                        en_string: values.title_en,
                        fr_string: values.title_fr,
                        icon: pictureUrl,
                        type: values.type,
                        key: values.key,
                        category: 1,
                    };

                    const createPropertyInfo = await insertData("api/project-type-listings/create", propertyData, true);

                    if (createPropertyInfo.status) {
                        setSucessMessage(true);
                        resetForm();
                        setShowErrorPopup(true);
                        setErrors({ serverError: "Project of Amenities created successfully." });
                        router.push("/project-amenities-listing");
                    } else {
                        setErrors({ serverError: createPropertyInfo.message || "Failed to create project amenities." });
                        setShowErrorPopup(true);
                    }
                } else {
                    setErrors({ serverError: checkPropertyInfo.message || "Property check failed." });
                    setShowErrorPopup(true);
                }
            } else {
                setErrors({ serverError: "Image not found or failed to upload." });
                setShowErrorPopup(true);
            }
        } catch (error) {
            setErrors({ serverError: error.message || "An unexpected error occurred." });
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
                           <div className="widget-box-2">
                                <h6 className="title">Project Amenities Information</h6>
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
                                        <label htmlFor="title">Type:<span>*</span></label>
                                        <Field as="select" name="type" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedType = e.target.value;
                                                    setFieldValue("type", selectedType);
                                                }}
                                            >
                                            <option value="">Select Type</option>
                                            <option value="boolean">Boolean</option>
                                        </Field>
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Key:<span>*</span></label>
                                        <Field type="text" id="key" name="key" className="form-control style-1" />
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
                                        </div>
                                    </fieldset>
                                </div>

                            </div>

                            <button type="submit"  className="tf-btn primary"  onClick={() => setShowErrorPopup(!showErrorPopup)}>Add Project Amenities</button>
                            {/* Error Popup */}
                            {showErrorPopup && Object.keys(errors).length > 0 && (
                                <ErrorPopup
                                    errors={errors}
                                    validationSchema={validationSchema}
                                    onClose={() => setShowErrorPopup(false)}
                                />
                            )}
                        </div >
                    </Form>
                )}
                </Formik>
			</LayoutAdmin >
		</>
           )}
        </>
	)
}