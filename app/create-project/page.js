'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { use, useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import passwordShow from "../../public/images/favicon/password-show.png";
import passwordHide from "../../public/images/favicon/password-hide.png";
import { insertData, insertImageData } from "../../components/api/Axios/Helper";
import { insertMultipleUploadImage } from "../../components/common/imageUpload";
import { capitalizeFirstChar, validateYouTubeURL } from "../../components/common/functions";
import PropertyMapMarker from "@/components/elements/PropertyMapMarker";
import ErrorPopup from "../../components/errorPopup/ErrorPopup.js";
import Preloader from "@/components/elements/Preloader"; // Import Preloader component
import SuccessPopup from "@/components/SuccessPopup/SuccessPopup";

export default function CreateProject() {
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const [fileCoverImg, setFileCoverImg] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [neighborhoodList, setNeighborhoodList] = useState([]);
    const [uploadFile, setUploadFile] = useState(null);
    const [isVideoUpload, setIsVideoUpload] = useState(true);
    const [stateList, setStateList] = useState([]);
    const [developerList, setDeveloperList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [projectOfNumberListing, setProjectOfNumberListing] = useState([]);
    const [projectOfBooleanListing, setProjectOfBooleanListing] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [videoPreview, setVideoPreview] = useState(null); // State for video preview
    const [filePreviews, setFilePreviews] = useState([]);
    const [iconPreview, setIconPreview] = useState([]);
    const [loading, setLoading] = useState(false); // Loader state
    const [currencyCode, setCurrencyCode] = useState([]);
    const [currencyList, setCurrencyList] = useState([]);
    const [propertyOfMetaNumberValue, setPropertyOfMetaNumberValue] = useState([]);

    const router = useRouter();
    const [propertyMapCoords, setPropertyMapCoords] = useState({
        latitude: 33.5945144,
        longitude: -7.6200284,
        zoom: 6
    });
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const validationSchema = Yup.object({
        title_en: Yup.string() .min(3, "Title must be at least 3 characters") .required("Title is required"),
        title_fr: Yup.string() .min(3, "Title must be at least 3 characters") .required("Title is required"),
        description_en: Yup.string().required("Description is required"),
        description_fr: Yup.string().required("Description is required"),
        price: Yup.string().required("Price is required"),
        currency_id: Yup.string().required("Currency is required"),
        vr_link: Yup.string().url("Invalid VR URL").nullable(),
        picture_img: Yup.array().min(3, "At least three image is required").required("Image is required"),
        state_id: Yup.string().required("State is required"),
        city_id: Yup.string().required("City is required"),
        // districts_id: Yup.string().required("District is required"),
        // neighborhood_id: Yup.string().required("Neighborhood is required"),
        user_id: Yup.string().required("Developer is required"),
        icon: Yup.string().required("Icon is required"),
    });

    useEffect(() => {
        const fetchData = async (page=0,limit=100000) => {
            try {
                if(stateList.length === 0){
                    const stateObj = {
                        page,
                        limit
                    };
                    const getStateInfo = await insertData('api/state', stateObj, true);
                    console.log(getStateInfo.data.states[0].id);
                    if(getStateInfo) {
                        setStateList(getStateInfo.data.states);
                    }
                }
                if(projectOfNumberListing.length === 0 && projectOfBooleanListing.length === 0){
                    const stateObj = {};
                    const getProjectListingInfo = await insertData('api/project-type-listings', stateObj, true);
                    console.log(getProjectListingInfo);
                    if(getProjectListingInfo) {
                        const projectOfNumberType = getProjectListingInfo.data.list.filter(item => item.type === "number");
                        const projectOfBlooeanType = getProjectListingInfo.data.list.filter(item => item.type === "boolean");
                        setProjectOfNumberListing(projectOfNumberType);
                        setProjectOfBooleanListing(projectOfBlooeanType);
                    }
                }
                if(developerList.length === 0){
                    const getUsersDeveloperInfo = await insertData('auth/get/developer', {}, false);
                    const developerList = getUsersDeveloperInfo.data.user_data;
                    if(developerList.length) {
                        setDeveloperList(developerList);
                    }
                }
                if(currencyList.length === 0){
                    // console.log(1);
                    const currencyObj = {};
                    const getCurrencyInfo = await insertData('api/currency/get', currencyObj, true);

                    if(getCurrencyInfo.status) {
                        setCurrencyList(getCurrencyInfo.data);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        console.log(stateList);
    });
    const handleStateChange = async (stateId) => {
        console.log('State ID:', stateId);
        
        // Clear the dependent lists whenever the state changes
        setCityList([]); // Clear the city list first
        setDistrictList([]); // Clear the district list
        setNeighborhoodList([]); // Clear the neighborhood list
    
        const selectedState = stateList.find((state) => state.id === stateId);
        if (selectedState) {
            const { latitude, longitude } = selectedState;
            setPropertyMapCoords({
                latitude: latitude,
                longitude: longitude,
                zoom: 10
            });
    
            const cityObj = { state_id: stateId, lang: "en" };
            const getCityInfo = await insertData('api/city/getbystate', cityObj, true);
            if (getCityInfo.status) {
                console.log(getCityInfo.data.cities);
                setCityList(getCityInfo.data.cities);
            }
        }
    };
    

    
    const handleCityChange = async (cityId) => {
        const selectedCites = cityList.find((cities) => cities.id === cityId);
        console.log('selectedState ID:', selectedCites.latitude);
        const { latitude, longitude } = selectedCites;
        setPropertyMapCoords({
            latitude: latitude,
            longitude: longitude,
            zoom: 12
        });

        if (!cityId) {
            setDistrictList([]); // Clear cities if no state is selected
            return;
        }
        try {
            const districtObj = { city_id: cityId, lang: "en" };
            const getDistrictInfo = await insertData('api/district/getbycity', districtObj, true);
            if (getDistrictInfo.status) {
                setDistrictList(getDistrictInfo.data);
                if(getDistrictInfo.data.length == 0){
                    const neighbourhoodObj = { city_id: cityId , lang:"en" };
                    const getNeighborhoodObjInfo = await insertData('api/neighborhood/cityid', neighbourhoodObj, true);
                    if (getNeighborhoodObjInfo.status) {
                        setNeighborhoodList(getNeighborhoodObjInfo.data);
                    } else {
                        setNeighborhoodList([]);
                    }
                }
            } else {
                setDistrictList([]);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            setDistrictList([]);
        }
    };

    const handleDistrictChange = async (DistrictId) => {
        console.log('District ID:', DistrictId);
        const selectedDistricts = districtList.find((districts) => districts.id === DistrictId);
        console.log('selectedState ID:', selectedDistricts.latitude);
        const { latitude, longitude } = selectedDistricts;
        setPropertyMapCoords({
            latitude: latitude,
            longitude: longitude,
            zoom: 14
        });

        if (!DistrictId) {
            setNeighborhoodList([]); // Clear cities if no state is selected
            return;
        }
        try {
            const districtObj = { district_id: DistrictId , lang:"en" };
            const getNeighborhoodObjInfo = await insertData('api/neighborhood/id', districtObj, true);
            if (getNeighborhoodObjInfo.status) {
                setNeighborhoodList(getNeighborhoodObjInfo.data);
            } else {
                setNeighborhoodList([]);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            setNeighborhoodList([]);
        }
    };

    const handleNeighborhoodChange = async (NeighborhoodId) => {
        console.log('NeighborhoodId ID:', NeighborhoodId);
        const selecteNeighborhood = neighborhoodList.find((neighborhoods) => neighborhoods.id === NeighborhoodId);
        if (selecteNeighborhood) {
            console.log('selectedNeighborhood ID:', selecteNeighborhood.latitude);
            const { latitude, longitude } = selecteNeighborhood;
            setPropertyMapCoords({
                latitude: latitude,
                longitude: longitude,
                zoom: 14
            });
            console.log(selecteNeighborhood,"selecteNeighborhood");
        } else {
            console.error('Neighborhood not found');
        }
    };

    const handleNumberChange = (id, value) => {
        setPropertyOfMetaNumberValue((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    
    // Handle form submission
    const handleSubmit = async (values, { resetForm, setErrors }) => {
        console.log(values);
        const selectedAmenities = projectOfBooleanListing
                .filter((project) => checkedItems[project.key])
                .map((project) => ({ project_type_listing_id: project.id, value: "true" }));

            if (propertyOfMetaNumberValue && Object.keys(propertyOfMetaNumberValue).length > 0) {
                // Update selected amenities based on propertyOfMetaNumberValue
                Object.entries(propertyOfMetaNumberValue).forEach(([key, value]) => {
                    const index = selectedAmenities.findIndex(item => item.property_type_id === key);
                    if (index !== -1) {
                        selectedAmenities[index].value = value;
                    } else {
                        selectedAmenities.push({ project_type_listing_id: key, value });
                    }
                });
            }
    

    
        try {
            console.log(parseFloat(propertyMapCoords.latitude),parseFloat(propertyMapCoords.latitude))
            setSucessMessage("Processing .........");
            //setLoading(true); // Start loader
    
            // Upload Image and Handle File Uploads (remains unchanged)
            const uploadImageObj = Array.isArray(values.picture_img) ? values.picture_img : [values.picture_img];
            const videoObj = values.video ? [values.video] : [];
            const iconObj = values.icon ? [values.icon] : [];
            
            const allUploadFiles = [...uploadImageObj, ...videoObj];
            const allUploadFilesICon = [...iconObj];
            
            const uploadImageUrl = await insertMultipleUploadImage("image", allUploadFiles);
            const uploadImageIconUrl = await insertMultipleUploadImage("image", allUploadFilesICon);
            
            console.log(uploadImageIconUrl);
            
            if (uploadImageUrl.files.length > 0) {
                const imageUrls = [];
                let videoUrl = null;
                let iconUrl = null;
    
                uploadImageUrl.files.forEach((file) => {
                    if (file.mimeType.startsWith("image")) {
                        imageUrls.push(file.url);
                    } else if (file.mimeType.startsWith("video")) {
                        videoUrl = file.url;
                    }
                });
    
                if (uploadImageIconUrl?.files?.length > 0) {
                    iconUrl = uploadImageIconUrl.files[0].url;
                }
    
                console.log("Project Data:", { imageUrls, videoUrl, iconUrl });
    
                // Validate YouTube URL if a link is provided
                if (values.video_link && !validateYouTubeURL(values.video_link)) {
                    setErrors({ serverError: "Please upload a valid YouTube video link like https://www.youtube.com/watch?v=YOUR_VIDEO_ID." });
                    setShowErrorPopup(true);
                    return false;
                }
    
                // Use the provided video link if no video was uploaded
                videoUrl = videoUrl || values.video_link;
    
                console.log('values');
                console.log(propertyMapCoords.latitude);
                
                /********* Create Project ***********/
                const projectData = {
                    title_en: values.title_en,
                    title_fr: values.title_fr,
                    description_en: values.description_en,
                    description_fr: values.description_fr,
                    price: parseInt(values.price) ?? 0,
                    vr_link: values.vr_link ?? null,
                    picture: imageUrls,
                    icon: iconUrl,
                    video: videoUrl,
                    user_id: values.user_id,
                    state_id: values.state_id,
                    city_id: values.city_id,
                    district_id: values.districts_id,
                    neighborhoods_id: values.neighborhood_id,
                    latitude: isNaN(parseFloat(values.latitude)) ? parseFloat(propertyMapCoords.latitude) : parseFloat(values.latitude),
                    longitude: isNaN(parseFloat(values.longitude)) ? parseFloat(propertyMapCoords.longitude) : parseFloat(values.longitude),
                    currency_id: values.currency_id,
                    meta_details: selectedAmenities,
                    address: values.address,
                };
    
                console.log("Project Data:", projectData);
                const createUserInfo = await insertData("api/projects/create", projectData, true);
    
                if (createUserInfo.status) {
                    //setSucessMessage(true);
                    setSucessMessage(createUserInfo.message || "Project created successfully.");
                    resetForm();
                    router.push("/project-listing");
                } else {
                    //setLoading(false);
                    setErrors({ serverError: createUserInfo.message || "Failed to create project." });
                    setShowErrorPopup(true);
                    setSucessMessage("");
                }
            } else {
                //setLoading(false);
                setErrors({ serverError: "File upload failed." });
                setShowErrorPopup(true);
                setSucessMessage("");
            }
        } catch (error) {
            //setLoading(false);
            setErrors({ serverError: error.message || "An unexpected error occurred." });
            setShowErrorPopup(true);
            setSucessMessage("");
        } finally {
            setLoading(false); // Stop loader
            setSucessMessage("");
        }
    };


    const handleCheckboxChange = (key) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [key]: !prevState[key], // Toggle the checked state
        }));
    };



    console.log(checkedItems);
    const messageClass = (sucessMessage) ? "message success" : "message error";
	return (
        <>
        {loading ? (
            <Preloader />
        ) : (
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
                    currency_id: "",
                    vr_link: "",
                    picture_img: [], // Set this to an empty array for multiple files
                    icon: null, // Set this to an empty array for multiple files
                    video: null, // Use `null` for file inputs
                    state_id: "",
                    city_id: "",
                    districts_id: "",
                    neighborhood_id: "",
                    user_id: "",
                    
                 }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
                    <Form>
                        <div>
                         
                            <div className="widget-box-2">
                                <h6 className="title">Project Information</h6>
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Title English:<span>*</span></label>
                                        <Field type="text" id="title_en" name="title_en" className="form-control style-1" />
                                        {/* <ErrorMessage name="title_en" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Title French:<span>*</span></label>
                                        <Field type="text" id="title_fr" name="title_fr" className="form-control style-1" />
                                        {/* <ErrorMessage name="title_fr" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                                <div className="grid-1 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Description English:<span>*</span></label>
                                        <Field type="textarea"  as="textarea"  id="description_en" name="description_en" className="textarea-tinymce" />
                                        {/* <ErrorMessage name="description_en" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                                <div className="grid-1 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Description French:<span>*</span></label>
                                        <Field type="textarea"  as="textarea"  id="description_fr" name="description_fr" className="textarea-tinymce" />
                                        {/* <ErrorMessage name="description_fr" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Other Information</h6>
                                <div className="box grid-3 gap-30">
                                <fieldset className="box-fieldset ">
                                        <label htmlFor="name">Price<span>*</span>:</label>
                                            <div className="phone-and-country-code">
                                                <Field as="select" name="currency_id" className="nice-select country-code"
                                                    id="country-code"
                                                    value={currencyCode}
                                                    onChange={(e) => {
                                                        const selectedState = e.target.value;
                                                        setCurrencyCode(selectedState);
                                                        setFieldValue("currency_id", selectedState);
                                                        //handleCityChange(selectedState);
                                                    }}
                                                >
                                                    <option value="">Select Currency</option>
                                                    {currencyList && currencyList.length > 0 ? (
                                                        currencyList.map((currency, index) =>(
                                                            <option key={index} value={currency.id}>{currency.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Field>
                                                <Field type="text" id="price" name="price" className="form-control style-1" />
                                            </div>
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">VR Link:</label>
                                        <Field type="text" name="vr_link" className="box-fieldset"  />
                                        {/* <ErrorMessage name="vr_link" component="div" className="error" /> */}
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
                                            {developerList && developerList.length > 0 ? (
                                                developerList.map((user) => (
                                                    (user.full_name !== null)?<option key={user.id} value={user.id}>{capitalizeFirstChar(user.full_name)}</option>:<></>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </Field>
                                        {/* <ErrorMessage name="user_id" component="div" className="error" /> */}
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
                                                            min="0"
                                                            className="box-fieldset"
                                                            onChange={(e) => handleNumberChange(project.id, e.target.value)}
                                                        />
                                                        {/* <ErrorMessage name={project.key} component="div" className="error" /> */}
                                                </fieldset>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                </div>
                                <div className="grid-2 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="picture_img">Picture Images:</label>
                                        <Field
                                            name="picture_img"
                                            component={({ field, form }) => (
                                                <div className="box-floor-img uploadfile">
                                                {/* Upload Button */}
                                                <div className="btn-upload">
                                                    <label className="tf-btn primary">
                                                    Choose Files
                                                    <input
                                                        type="file"
                                                        multiple
                                                        className="ip-file"
                                                        onChange={(event) => {
                                                            const files = Array.from(event.target.files);
                                                            let updatedImageList = [...filePreviews]; // Preserve existing previews
                                                            let updatedValidFiles = [...form.values[field.name] || []]; // Preserve existing selected files
                                                        
                                                            files.forEach((file) => {
                                                                const img = new Image();
                                                                const reader = new FileReader();
                                                                reader.onload = (e) => {
                                                                    img.src = e.target.result;
                                                                    img.onload = () => {
                                                                        const imageHeight = img.height;
                                                                        const imageWidth = img.width;
                                                        
                                                                        if (imageHeight <= 800 || imageWidth <= 1100) {
                                                                            alert('Please upload images with a maximum height of 800px and a maximum width of 1100px.');
                                                                        } else {
                                                                            updatedImageList.push(URL.createObjectURL(file)); // Store preview
                                                                            updatedValidFiles.push(file); // Store valid file
                                                                        }
                                                        
                                                                        setFilePreviews([...updatedImageList]); // Update preview state
                                                                        setFieldValue(field.name, [...updatedValidFiles]); // Update Formik field value
                                                                    };
                                                                };
                                                        
                                                                reader.readAsDataURL(file);
                                                            });
                                                        }}
                                                        
                                                        style={{ display: "none" }}
                                                    />
                                                    </label>
                                                </div>


                                                <p className="file-name fw-5">Or drop images here to upload</p>

                                                {/* Error Message */}
                                                {/* <ErrorMessage name="picture_img" component="div" className="error" /> */}
                                                </div>
                                            )}
                                            />

                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        {/* Image Previews */}
                                        <div className="image-preview-container image-gallery">
                                            {filePreviews.length > 0 && (<p className="fw-5">Image Preview:</p>)}
                                            {filePreviews.map((preview, index) => (
                                                <div key={index} className="preview-item">
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${index + 1}`}
                                                        className="uploadFileImage"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newFilePreviews = filePreviews.filter((_, i) => i !== index);
                                                            console.log(values,"valuesvaluesvalues")
                                                            const newImageList = values.picture_img.filter((_, i) => i !== index);
                                                            setFilePreviews(newFilePreviews);
                                                            setFieldValue("picture_img", newImageList);
                                                          }}
                                                        className="remove-image-btn"
                                                    >
                                                        &times;
                                                    </button>

                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>

                                </div>
                                <div className="grid-2 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="picture_img">Icon Images:</label>
                                        <Field
                                            name="icon"
                                            component={({ field, form }) => (
                                                <div className="box-floor-img uploadfile">
                                                {/* Upload Button */}
                                                <div className="btn-upload">
                                                    <label className="tf-btn primary">
                                                    Choose Files
                                                    <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="ip-file"
                                                            onChange={(event) => {
                                                            const file = event.target.files[0]; // Get the first file
                                                            if (file) {
                                                                // Perform size validation
                                                                // if (file.size < 1000) {
                                                                // alert(`Please upload a file above the size of 1KB`);
                                                                // return;
                                                                // }

                                                                const img = new Image();
                                                                const reader = new FileReader();

                                                                reader.onload = (e) => {
                                                                img.src = e.target.result;

                                                                img.onload = () => {
                                                                    const imageHeight = img.height;
                                                                    const imageWidth = img.width;

                                                                    setFieldValue("icon", file); // Set the file in Formik state
                                                                    setIconPreview(URL.createObjectURL(file)); // Generate a preview URL
                                                                    // Perform dimension validation
                                                                    // if (imageHeight > 200 || imageWidth > 200) {
                                                                    // alert(
                                                                    //     "Please upload an image with a maximum height and width of 200px."
                                                                    // );
                                                                    // } else {
                                                                    // setFieldValue("icon", file); // Set the file in Formik state
                                                                    // setIconPreview(URL.createObjectURL(file)); // Generate a preview URL
                                                                    // }
                                                                };
                                                                };

                                                                reader.readAsDataURL(file); // Read file as Data URL
                                                            }
                                                            }}
                                                            style={{ display: "none" }}
                                                        />
                                                    </label>
                                                </div>
                                                <p className="file-name fw-5">Or drop images here to upload</p>
                                                </div>
                                            )}
                                        />
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        {/* Image Previews */}
                                        <div className="image-preview-container image-gallery">
                                            {iconPreview && iconPreview.length > 0 && ( // Check if iconPreview is not null
                                            <div className="preview-item">
                                                <img
                                                src={iconPreview}
                                                alt="Icon Preview"
                                                className="uploadFileImage"
                                                />
                                                <button
                                                type="button"
                                                onClick={() => {
                                                    setIconPreview(null); // Clear the preview
                                                    setFieldValue("icon", null); // Clear the file in Formik state
                                                }}
                                                className="remove-image-btn"
                                                >
                                                &times;
                                                </button>
                                            </div>
                                            )}
                                        </div>
                                        </fieldset>


                                </div>
                                

                                <div className="box grid-1 box gap-50">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="video_link">YouTube Link:</label>
                                        {/* YouTube Link Input Field */}
                                        <div>
                                            <Field
                                                type="text"
                                                name="video_link"
                                                className="form-control"
                                                placeholder="https://www.youtube.com/watch?v=QgAQcrvHsHQ"
                                            />
                                            {/* <ErrorMessage name="video_link" component="div" className="error" /> */}
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Location</h6>
                                <div className="box grid-4 gap-30">
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
                                        {/* <ErrorMessage name="state_id" component="div" className="error" /> */}
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
                                        {/* <ErrorMessage name="city_id" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">District:</label>
                                            <Field as="select" name="districts_id" className="nice-select country-code"  onChange={(e) => {
                                                    const selectedDistrict = e.target.value;
                                                    setFieldValue("districts_id", selectedDistrict);
                                                    handleDistrictChange(selectedDistrict);
                                                }}>
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
                                        {/* <ErrorMessage name="districts_id" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Neighborhood:</label>
                                            <Field as="select" name="neighborhood_id" className="nice-select country-code"  onChange={(e) => {
                                                    const selectedNeighborhood = e.target.value;
                                                    setFieldValue("neighborhood_id", selectedNeighborhood);
                                                    handleNeighborhoodChange(selectedNeighborhood);
                                                }}>
                                                <option value="">Select Neighborhood</option>
                                                {neighborhoodList && neighborhoodList.length > 0 ? (
                                                    neighborhoodList.map((neighborhoods) => (
                                                        <option key={neighborhoods.id} value={neighborhoods.id}>
                                                            {neighborhoods.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </Field>
                                        {/* <ErrorMessage name="neighborhood_id" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
                                <div className="box box-fieldset">
                                    {/* <label htmlFor="location">Address:<span>*</span></label>
                                    <div className="box-ip">
                                        <input type="text" className="form-control style-1" name="address" />
                                        <Link href="#" className="btn-location"><i className="icon icon-location" /></Link>
                                    </div> */}
                                    <PropertyMapMarker
                                        latitude={propertyMapCoords.latitude}
                                        longitude={propertyMapCoords.longitude}
                                        zoom={propertyMapCoords.zoom}
                                        onPlaceSelected={(newAddress, newLocation) => {
                                            setFieldValue('address', newAddress);
                                            setFieldValue('latitude', newLocation.lat);
                                            setFieldValue('longitude', newLocation.lng);
                                            //handleAddressSelect(newAddress, newLocation);
                                        }
                                    }
                                    />
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
                                                    {/* <ErrorMessage name={project.key} component="div" className="error" /> */}
                                                </fieldset>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button type="submit"  className="tf-btn primary" onClick={() => setShowErrorPopup(!showErrorPopup)}>Add Project</button>
                        </div >
                        {/* Error Popup */}
                          {showErrorPopup && Object.keys(errors).length > 0 && (
                            <ErrorPopup
                                errors={errors}
                                validationSchema={validationSchema}
                                onClose={() => setShowErrorPopup(false)}
                            />
                        )}
                        {sucessMessage && (
                            <SuccessPopup
                                message={sucessMessage}
                                onClose={() => setSucessMessage(false)}
                            />
                        )}
                    </Form>
                )}
                </Formik>


			</LayoutAdmin >
		</>
           )}
        </>
	)
}