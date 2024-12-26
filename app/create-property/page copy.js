'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import PropertyMapMarker from "@/components/elements/PropertyMapMarker"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { use, useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { insertData, insertImageData } from "../../components/api/Axios/Helper";
import { insertMultipleUploadImage } from "../../components/common/imageUpload";
import { capitalizeFirstChar } from "../../components/common/functions";

import  "../../components/ErrorPopup/ErrorPopup.css";

export default function CreateProperty() {
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
	const [propertyMeta, setPropertyMeta] = useState(false);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [projectOfListing, setProjectOfListing] = useState([]);
    const [projectOfNumberListing, setProjectOfNumberListing] = useState([]);
    const [propertyofTypesListing, setpropertyofTypesListing] = useState([]);
    const [projectOfBooleanListing, setProjectOfBooleanListing] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [propertyOfMetaNumberValue, setPropertyOfMetaNumberValue] = useState([]);
    const [videoPreview, setVideoPreview] = useState(null); // State for video preview
    const [isVideoUpload, setIsVideoUpload] = useState(true);
    const [video, setVideo] = useState(null);
    const [videoLink, setVideoLink] = useState("");

    const [filePreviews, setFilePreviews] = useState([]);

    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const router = useRouter();
    const validationSchema = Yup.object({
        title_en: Yup.string()
            .min(3, "Title must be at least 3 characters")
            .required("Title is required"),
        title_fr: Yup.string()
            .min(3, "Title must be at least 3 characters")
            .required("Title is required"),
        description_en: Yup.string().required("Description is required"),
        description_fr: Yup.string().required("Description is required"),
        price: Yup.string().required("Price is required"),
        vr_link: Yup.string().url("Invalid URL").nullable(),
        picture_img: Yup.array().min(1, "At least one image is required").required("Image is required"),
        credit: Yup.string().required("Credit is required"),
        state_id: Yup.string().required("State is required"),
        videoLink: Yup.string().url("Enter a valid URL"),
        city_id: Yup.string().required("City is required"),
        districts_id: Yup.string().required("District is required"),
        transaction_type: Yup.string().required("Transaction type is required"),
        property_type: Yup.string().required("Property type is required"),
        user_id: Yup.string().required("User is required"),
        size_sqft: Yup.string().required("Size is required"),
    });


    useEffect(() => {
        const fetchData = async () => {
            // console.log('propertyofTypes');
            try {
                if(stateList.length === 0){
                    const stateObj = {};
                    const getStateInfo = await insertData('api/state', stateObj, true);
                    console.log(getStateInfo);
                    if(getStateInfo) {
                        setStateList(getStateInfo.data);
                    }
                }
                // console.log('cityList');
                // console.log(cityList.length);
                // if(cityList.length === 0){
                //     const stateObj = {};
                //     const getCityInfo = await insertData('api/city', stateObj, true);
                //     console.log(getCityInfo);
                //     if(getCityInfo) {
                //         setCityList(getCityInfo.data);
                //     }
                // }

                if(userList.length === 0){
                    const getUsersDeveloperInfo = await insertData('auth/get/developer', {}, false);
                    const developerList = getUsersDeveloperInfo.data.user_data;
                    const getUsersAgencyInfo = await insertData('auth/get/agency', {}, false);
                    const agencyList = getUsersAgencyInfo.data.user_data;
                    const getalluserInfo = developerList.concat(agencyList);
                    setUserList(getalluserInfo);
                }

                if(propertyofTypesListing.length === 0){
                    const getPropertyTypeInfo = await insertData('api/property-type/', {page: 1, limit: 100}, true);
                    if(getPropertyTypeInfo.status) {
                        console.log(getPropertyTypeInfo.data.list);
                        setpropertyofTypesListing(getPropertyTypeInfo.data.list);
                    }
                }

                if(projectOfListing.length === 0){
                    const getProjectListInfo = await insertData('api/projects/', {}, true);
                    if(getProjectListInfo.status) {
                        setProjectOfListing(getProjectListInfo.data);
                    }
                }

                if(!propertyMeta){
                    const projectMetaObj = { page: 1, limit: 100 };
                    const getPropertyInfo = await insertData('api/property-type-listings', projectMetaObj, true);
                    if(getPropertyInfo) {
                        const projectOfNumberType = getPropertyInfo.data.list.filter(item => item.type === "number");
                        const projectOfBlooeanType = getPropertyInfo.data.list.filter(item => item.type === "boolean");
                        setProjectOfNumberListing(projectOfNumberType);
                        setProjectOfBooleanListing(projectOfBlooeanType);
                    }
                    setPropertyMeta(true);
                }
                //console.log(propertyofTypes)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        console.log(stateList);
    });
const showValidationErrors = (errors) => {
        setErrorsState(errors);
        if (Object.keys(errors).length > 0) {
            setShowErrorPopup(true);
        } else {
            setShowErrorPopup(false);
        }
    };
    const handleStateChange = async (stateId) => {
        console.log('State ID:', stateId);

        if (!stateId) {
            setCityList([]); // Clear cities if no state is selected
            return;
        }
        try {
            const cityObj = { state_id: stateId };
            const getCityInfo = await insertData('api/city', cityObj, true);
            if (getCityInfo.status) {
                setCityList(getCityInfo.data);
            } else {
                setCityList([]);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            setCityList([]);
        }
    };
    const handleCityChange = async (cityId) => {
        console.log('City ID:', cityId);

        if (!cityId) {
            setDistrictList([]); // Clear cities if no state is selected
            return;
        }
        try {
            const districtObj = { city_id: cityId };
            const getDistrictInfo = await insertData('api/district', districtObj, true);
            if (getDistrictInfo.status) {
                setDistrictList(getDistrictInfo.data);
            } else {
                setDistrictList([]);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            setDistrictList([]);
        }
    };
    const handleVideoUpload = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file.type === "video/mp4" && file.size <= 20 * 1024 * 1024) { // Check for file type and size (20 MB)
            const videoUrl = URL.createObjectURL(file);
            setFieldValue("video", file);
            setVideoPreview(videoUrl);
        } else if (file.size > 20 * 1024 * 1024) {
            alert("File size exceeds the 20 MB limit. Please upload a smaller video.");
        } else {
            alert("Please upload a valid MP4 video.");
        }
    };

    const handleNumberChange = (id, value) => {
        setPropertyOfMetaNumberValue((prev) => {
          const propertyOfMetaNumberValue = [...prev];
          const index = propertyOfMetaNumberValue.findIndex((item) => item.id === id);
          if (index > -1) {
            propertyOfMetaNumberValue[index].value = value;
          } else {
            const propertyOfMetaNumberObj = {property_type_id: id, value: value};
            propertyOfMetaNumberValue.push(propertyOfMetaNumberObj);
          }
          return propertyOfMetaNumberValue;
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Prevent default behavior to enable drop
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type === "video/mp4") {
            const videoUrl = URL.createObjectURL(file);
            setVideoPreview(videoUrl);
        } else {
            alert("Please upload a valid MP4 video.");
        }
    };

    const handleFileChange = (event, setFieldValue) => {
        const files = Array.from(event.currentTarget.files);  // Convert FileList to Array
        const videoFile = files.find(file => file.type === "video/mp4");  // Check for video files
        const imageFiles = files.filter(file => file.type.startsWith("image/"));  // Filter for image files
    
        // If video file is selected, set it in the "video" field
        if (videoFile) {
            setFieldValue("video", videoFile);
            setVideoPreview(URL.createObjectURL(videoFile));  // Optional: Display video preview
        }
    
        // If image files are selected, set them in the "picture_img" field
        if (imageFiles.length > 0) {
            setFieldValue("picture_img", imageFiles);  // Multiple image files in Formik field
            setFilePreviews(imageFiles.map(file => URL.createObjectURL(file)));  // Preview images
        }
    };
    


    // Handle form submission
    const handleSubmit = async (values, {resetForm}) => {
        if (Object.keys(errors).length > 0) {
            setShowErrorPopup(true);
        }
        console.log(values); 
        if (isVideoUpload && !values.video) {
            alert("Please upload a video file.");
            return false;
          }
        
          if (!isVideoUpload && !values.video_link) {
            alert("Please enter a YouTube video link.");
            return false;
          }
        
        const selectedAmenities = projectOfBooleanListing
            .filter((project) => checkedItems[project.key])
            .map((project) => ({ property_type_id: project.id, value: "true" }));
            if(propertyOfMetaNumberValue.length > 0) {
                selectedAmenities.push(...propertyOfMetaNumberValue);
            }
        //const allAminities = [...selectedAmenities, ...propertyOfMetaNumberValue];
        // console.log('Selected Amenities:', selectedAmenities);
        const uploadImageObj = Array.isArray(values.picture_img) ? values.picture_img : [values.picture_img];
        uploadImageObj.push(values.video);

     //   const uploadImageUrl = await insertMultipleUploadImage('image', uploadImageObj);
     // if (uploadImageUrl.files.length < 0) {
        const imageUrls  = [];
        let videoUrl = null;

        // Iterate over the files and separate images and video
       // uploadImageUrl.files.forEach(file => {
        //     if (file.mimeType.startsWith('image')) {
        //         imageUrls.push(file.url); // Collect image URLs
        //     } else if (file.mimeType.startsWith('video')) {
        //         videoUrl = file.url; // Set video URL
        //     }
        // });
//        const pictureUrl = imageUrls.join(', ');

        // pictureUrls will contain all image URLs, videoUrl will contain the video URL
        // console.log('Image URLs:', pictureUrl);
        // console.log('Video URL:', videoUrl);

        // if (!videoUrl) {
        //     videoUrl = values.video_link;
        // }

            /********* create user ***********/
            try {
                const propertData = {
                    title_en: values.title_en,
                    title_fr: values.title_fr,
                    description_en: values.description_en??null,
                    description_fr: values.description_fr??null,
                    price: parseInt(values.price)??0,
                    vr_link: values.vr_link??null,
                    picture: 'pictureUrl',
                    video: 'videoUrl',
                    user_id: values.user_id,
                    link_uuid: values.link_uuid??null,
                    state_id: values.state_id,
                    city_id: values.city_id,
                    district_id: values.districts_id,
                    latitude: values.latitude,
                    transaction: values.transaction_type,
                    longitude: values.longitude,
                    type_id: values.property_type,
                    size: parseInt(values.size_sqft)??0,
                    meta_details:selectedAmenities,
                    project_id: values.project_id??null,
                    latitude: "34.092809",
                    longitude: "-118.328661"
                }
                console.log(propertData);

//                return false;

                const createPrpertyInfo = await insertData('api/property/create', propertData, true);
                if(createPrpertyInfo.status) {
                    setSucessMessage(true);
                    setErrorMessage("Property created successfully");
                    router.push('/property-listing');
                }else{
                    setErrorMessage(createPrpertyInfo.message);
                }
            } catch (error) {
                console.log('propertData');

                setErrorMessage(error.message);
            }
        // } else {
        //     console.log('File not uploaded');
        //     setErrorMessage('File not uploaded');
        // }
    };

    const handleCheckboxChange = (key) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [key]: !prevState[key], // Toggle the checked state
        }));
    };

	const [selectedRadio, setSelectedRadio] = useState('radio1')

	// const handleRadioChange = (event) => {
	// 	const selectedRadioId = event.target.id
	// 	setSelectedRadio(selectedRadioId)
	// }

    const handleRadioChange = (event, setFieldValue) => {
        const isUpload = event.target.value === "upload";
        setIsVideoUpload(isUpload);
      
        if (!isUpload) {
          // Switching to YouTube Link
          setVideoPreview(null); // Clear video preview
          setFieldValue("video", null); // Clear Formik video field
        }else if(isUpload){

          setFieldValue("video_link", null); 
          setVideoLink(null); // Update YouTube link manually

        }
      };

    const handleVideoLinkChange = (event, setFieldValue) => {
        setVideoLink(event.target.value); // Update YouTube link manually
        setFieldValue("video_link", event.target.value); // Update Formik state

    };
    console.log(checkedItems);
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
                    description_en: "",
                    description_fr: "",
                    price: "",
                    vr_link: "",
                    picture_img: [], // Set this to an empty array for multiple files
                    video: null, // Use `null` for file inputs
                    video_link: "", // Add this for YouTube video link
                    credit: "",
                    state_id: "",
                    city_id: "",
                    districts_id: "",
                    transaction_type: "",
                    property_type: "",
                    user_id: "",
                    size_sqft: "",
                 }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <div>
                            {/* <div className="widget-box-2">
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
                            </div> */}
                            <div className="widget-box-2">
                                <h6 className="title">Property Information</h6>
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
                                <div className="grid-1 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Description English:<span>*</span></label>
                                        <Field type="textarea"  as="textarea"  id="description_en" name="description_en" className="textarea-tinymce" />
                                        <ErrorMessage name="description_en" component="div" className="error" />
                                    </fieldset>
                                </div>
                                <div className="grid-1 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Description French:<span>*</span></label>
                                        <Field type="textarea"  as="textarea"  id="description_fr" name="description_fr" className="textarea-tinymce" />
                                        <ErrorMessage name="description_fr" component="div" className="error" />
                                    </fieldset>
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Other Information</h6>
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Transaction Type:<span>*</span></label>
                                        <Field as="select" name="transaction_type" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("transaction_type", selectedState);
                                                }}
                                            >
                                            <option value="">Select Transaction Type</option>
                                            <option value="sale">Fore Sale</option>
                                            <option value="rental">For Rental</option>
                                        </Field>
                                        <ErrorMessage name="transaction_type" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Property Type:<span>*</span></label>
                                        <Field as="select" name="property_type" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("property_type", selectedState);
                                                }}
                                            >
                                            <option value="">Select Property Type</option>
                                            {propertyofTypesListing && propertyofTypesListing.length > 0 ? (
                                                propertyofTypesListing.map((property) => (
                                                    <option key={property.id} value={property.id}>{capitalizeFirstChar(property.title)}</option>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </Field>
                                        <ErrorMessage name="property_type" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Project Listing:<span>*</span></label>
                                        <Field as="select" name="project_id" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("project_id", selectedState);
                                                }}
                                            >
                                            <option value="">Select Project Listing</option>
                                            {projectOfListing && projectOfListing.length > 0 ? (
                                                projectOfListing.map((propertyList) => (
                                                    <option key={propertyList.id} value={propertyList.id}>{capitalizeFirstChar(propertyList.title)}</option>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </Field>
                                        <ErrorMessage name="project_id" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">User Listing:</label>
                                        <Field as="select" name="user_id" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("user_id", selectedState);
                                                }}
                                            >
                                            <option value="">Select User Listing</option>
                                            {userList && userList.length > 0 ? (
                                                userList.map((user) => (
                                                    (user.full_name !== null)?<option key={user.id} value={user.id}>{capitalizeFirstChar(user.full_name)}</option>:<></>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </Field>
                                        <ErrorMessage name="user_id" component="div" className="error" />
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Price:<span>*</span></label>
                                        <Field type="text" id="price" name="price" className="box-fieldset" />
                                        <ErrorMessage name="price" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">VR Link:</label>
                                        <Field type="text" name="vr_link" className="box-fieldset"  />
                                        <ErrorMessage name="vr_link" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Link UUID:</label>
                                        <Field type="text"  name="link_uuid" className="box-fieldset" />
                                        <ErrorMessage name="link_uuid" component="div" className="error" />
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
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Size of SqMeter:<span>*</span></label>
                                        <Field type="number" id="size_sqft" name="size_sqft" className="form-control style-1" />
                                        <ErrorMessage name="size_sqft" component="div" className="error" />
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                        {projectOfNumberListing && projectOfNumberListing.length > 0 ? (
                                            projectOfNumberListing.map((project) => (
                                                <fieldset className="box box-fieldset">
                                                    <label htmlFor="desc">{project.name}:</label>
                                                        <Field
                                                            type="number"
                                                            name={project.id}
                                                            className="box-fieldset"
                                                            onChange={(e) => handleNumberChange(project.id, e.target.value)}
                                                        />
                                                        <ErrorMessage name={project.key} component="div" className="error" />
                                                </fieldset>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                </div>
                                <div className="grid-2 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">Picture Images:</label>
                                        <div className="box-floor-img uploadfile">
                                            <div className="btn-upload">
                                                <Link href="#" className="tf-btn primary">
                                                    Choose Files
                                                </Link>
                                                <input
                                                    type="file"
                                                    className="ip-file"
                                                    onChange={(event) => handleFileChange(event, setFieldValue)} // Pass setFieldValue
                                                    multiple // Enable multiple file selection
                                                />
                                            </div>
                                            {/* Image previews */}
                                            <div className="image-preview-container">
                                                {filePreviews.map((preview, index) => (
                                                    <img
                                                        key={index}
                                                        src={preview}
                                                        alt={`Preview ${index + 1}`}
                                                        className="uploadFileImage"
                                                    />
                                                ))}
                                            </div>
                                            <p className="file-name fw-5">Or drop images here to upload</p>

                                            {/* Display error message if any */}
                                            {errors.picture_img && touched.picture_img && (
                                                <div className="error">{errors.picture_img}</div>
                                            )}
                                        </div>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <legend>Video Option</legend>

                                        {/* Video Option Radio Buttons */}
                                        <label>
                                            <input
                                            type="radio"
                                            name="videoOption"
                                            value="upload"
                                            checked={isVideoUpload}
                                            onChange={(event) => handleRadioChange(event, setFieldValue)}
                                            />
                                            Upload Video
                                        </label>
                                        <label>
                                            <input
                                            type="radio"
                                            name="videoOption"
                                            value="link"
                                            checked={!isVideoUpload}
                                            onChange={(event) => handleRadioChange(event, setFieldValue)}
                                            />
                                            YouTube Link
                                        </label>

                                        {/* Conditional Fields */}
                                        {isVideoUpload ? (
                                            // Video Upload Field
                                            <div className="box-floor-img uploadfile">
                                            <div className="btn-upload">
                                                <label className="tf-btn primary">
                                                    Choose File
                                                    <input
                                                        type="file"
                                                        className="ip-file"
                                                        accept="video/mp4"
                                                        onChange={(event) => handleFileChange(event, setFieldValue)}
                                                        style={{ display: 'none' }}
                                                    />
                                                </label>
                                                {videoPreview ? (
                                                <video controls className="uploadFileImage">
                                                    <source src={videoPreview} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : (<></>)}
                                            </div>
                                            <p className="file-name fw-5">Or drop video here to upload</p>
                                        </div>
                                        ) : (
                                            // YouTube Link Input Field
                                            <div>
                                            <label htmlFor="video_link">YouTube Link:</label>
                                            <input
                                                type="text"
                                                id="video_link"
                                                value={videoLink}
                                                onChange={(event) => handleVideoLinkChange(event, setFieldValue)}
                                                placeholder="Enter YouTube video link"
                                            />
                                            
                                            </div>
                                        )}
                                        </fieldset>
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Location</h6>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">State:</label>
                                        <Field as="select" name="state_id" className="nice-select country-code"
                                            onChange={(e) => {
                                                const selectedState = e.target.value;
                                                setFieldValue("state_id", selectedState);
                                                handleStateChange(selectedState);
                                            }}>
                                                <option value="">Select State</option>
                                                {stateList && stateList.length > 0 ? (
                                                    stateList.map((state) => (
                                                        <option value={state.id}>{state.name}</option>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                        </Field>
                                        <ErrorMessage name="state_id" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Cities:</label>
                                            <Field as="select" name="city_id" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("city_id", selectedState);
                                                    handleCityChange(selectedState);
                                                }}
                                            >
                                                <option value="">Select Cities</option>
                                                {cityList && cityList.length > 0 ? (
                                                    cityList.map((cities) => (
                                                        <option key={cities.id} value={cities.id}>
                                                            {cities.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </Field>
                                        <ErrorMessage name="city_id" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">District:</label>
                                            <Field as="select" name="districts_id" className="nice-select country-code">
                                                <option value="">Select District</option>
                                                {districtList && districtList.length > 0 ? (
                                                    districtList.map((districts) => (
                                                        <option key={districts.id} value={districts.id}>
                                                            {districts.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </Field>
                                        <ErrorMessage name="districts_id" component="div" className="error" />
                                    </fieldset>
                                </div>
                                <div className="box box-fieldset">
                                    <label htmlFor="location">Address:<span>*</span></label>
                                    <div className="box-ip">
                                        <input type="text" className="form-control style-1" name="address" />
                                        <Link href="#" className="btn-location"><i className="icon icon-location" /></Link>
                                    </div>
                                    <PropertyMapMarker />
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Amenities </h6>
                                <div className="box-amenities-property">
                                    <div className="box-amenities">
                                        {projectOfBooleanListing && projectOfBooleanListing.length > 0 ? (
                                            projectOfBooleanListing.map((project) => (
                                                <fieldset className="amenities-item">
                                                    <Field
                                                        type="checkbox" name={project.id}
                                                        className="tf-checkbox style-1 primary"
                                                        checked={!!checkedItems[project.key]} // Set checked status
                                                        onChange={() => handleCheckboxChange(project.key)}
                                                    />
                                                    <label for="cb1" className="text-cb-amenities">{project.name}</label>
                                                    <ErrorMessage name={project.key} component="div" className="error" />
                                                </fieldset>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button type="submit"  className="tf-btn primary"onClick={() => setShowErrorPopup(!showErrorPopup)} >Add Property</button>
                        </div >
                    </Form>
                )}
                </Formik>

                {/* Error Popup */}
                {showErrorPopup && (
                    <div className="error-popup">
                        <h3>Validation Errors</h3>
                        <ul>
                            {Object.keys(validationSchema.fields).map((field) => {
                                const error = errors[field];
                                if (error) {
                                    return (
                                        <li key={field}>
                                            <strong>{field}:</strong> {error}
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                )}
			</LayoutAdmin >
		</>
	)
}