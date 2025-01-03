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
import PropertyMapMarker from "@/components/elements/PropertyMapMarker";
import { capitalizeFirstChar } from "@/components/common/functions";
const resolveIdByName = (stateName, statesList) => {
    const state = statesList.find((state) => state.name === stateName);
    return state ? state.id : ""; // Return the state id or empty string if not found
  };
export default function EditProject({params}) {
    const { id } = params;
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
	const [loading, setLoading] = useState(true);
    const [filePreview, setFilePreview] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [projectDetail, setProjectDetail] = useState(null);
    const [developerList, setDeveloperList] = useState([]);
    const [projectOfNumberListing, setProjectOfNumberListing] = useState([]);
    const [projectOfBooleanListing, setProjectOfBooleanListing] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [videoPreview, setVideoPreview] = useState(null); // State for video preview
    const [filePreviews, setFilePreviews] = useState([]);
    const [propertyMapCoords, setPropertyMapCoords] = useState({
        latitude: 33.5945144,
        longitude: -7.6200284,
        zoom: 6
    });
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [isVideoUpload, setIsVideoUpload] = useState(true);
    const [neighborhoodList, setNeighborhoodList] = useState([]);
    const [iconPreview, setIconPreview] = useState([]);
   



    useEffect(() => {
        // console.log(id);
        const fetchData = async () => {

		try {
                const requestData = {
                    project_id: id,
                };
                const getProjectInfo = await insertData('api/projects/getbyid', requestData, true);
                    // console.log(getProjectInfo);

                if (getProjectInfo.data) {
                    setProjectDetail(getProjectInfo.data);
                } else {
                    setErrorMessage("Project not found.");
                }

                if (getProjectInfo.data.meta_details) {
                    // Create the checkedItems state based on meta_details
                    const initialCheckedItems = getProjectInfo.data.meta_details.reduce((acc, meta) => {

                        if (meta.value === "true") {
                            acc[meta.key] = true; // Set the checkbox for this key as checked
                        }
                        return acc;
                    }, {});
                    console.log('initialCheckedItems',initialCheckedItems);
                    setCheckedItems(initialCheckedItems);
                }
                if (getProjectInfo.data.picture) {
                    setFilePreviews(getProjectInfo.data.picture.map((url) => url)); // Use URLs for preview
                }
                if (getProjectInfo.data.icon) {
                    setVideoPreview(getProjectInfo.data.icon); // Use URL for video preview
                }
                if (getProjectInfo.data.video) {
                    setVideoPreview(getProjectInfo.data.video); // Use URL for video preview
                }

            
             
                // setInitialValues((prevValues) => ({
                //     ...prevValues,
                //     city_id: resolveIdByName(getProjectInfo.data.city, cityList, 'city_name'),
                //     districts_id: resolveIdByName(getProjectInfo.data.district, districtList, 'district_name'),
                //     neighborhood_id: resolveIdByName(getProjectInfo.data.neighborhood, neighborhoodList),
                // }));


                if(stateList.length === 0){
                    const stateObj = {};
                    const getStateInfo = await insertData('api/state', stateObj, true);
                    // console.log(getStateInfo.data.states[0].id);
                    if(getStateInfo) {
                        setStateList(getStateInfo.data.states);
                    }
                    // const state_id = resolveIdByName(getProjectInfo.data.state, getStateInfo.data.states);
                    // console.log("Resolved State ID:", state_id);
                
                    // // Update the initialValues to set the correct state_id
                    // setInitialValues((prevValues) => ({
                    // ...prevValues,
                    // state_id: state_id, // Set resolved state_id
                    // }));
                }
                console.log('LKKKK');
                if(projectOfNumberListing.length === 0 && projectOfBooleanListing.length === 0){
                    const stateObj = {};
                    const getProjectListingInfo = await insertData('api/project-type-listings', stateObj, true);
                    // console.log(getProjectListingInfo);
                    if(getProjectListingInfo) {
                        const projectOfNumberType = getProjectListingInfo.data.list.filter(item => item.type === "number");
                        const projectOfBlooeanType = getProjectListingInfo.data.list.filter(item => item.type === "boolean");
                        setProjectOfNumberListing(projectOfNumberType);
                        setProjectOfBooleanListing(projectOfBlooeanType);
                    }
                }
                
                if(developerList.length === 0){
                    const getUsersDeveloperInfo = await insertData('auth/get/developer', {}, false);
                    console.log('getUsersDeveloperInfo');
                    console.log(getUsersDeveloperInfo);
                    const developerList = getUsersDeveloperInfo.data.user_data;
                    if(developerList.length) {
                        setDeveloperList(developerList);
                    }
                }
                const type = { project_id: id };
                const getUserInfo = await insertData('api/projects', type, true);
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
        // console.log('developerList');
        // console.log(developerList);

        


    const validationSchema = Yup.object({
            title_en: Yup.string() .min(3, "Title must be at least 3 characters") .required("Title is required"),
            title_fr: Yup.string() .min(3, "Title must be at least 3 characters") .required("Title is required"),
            description_en: Yup.string().required("Description is required"),
            description_fr: Yup.string().required("Description is required"),
            price: Yup.string().required("Price is required"),
            vr_link: Yup.string().url("Invalid VR URL").nullable(),
            picture_img: Yup.array().min(3, "At least three image is required").required("Image is required"),
            state_id: Yup.string().required("State is required"),
            city_id: Yup.string().required("City is required"),
            districts_id: Yup.string().required("District is required"),
            neighborhood_id: Yup.string().required("Neighborhood is required"),
            user_id: Yup.string().required("Developer is required"),
    });
    const router = useRouter();
    // Handle form submission

    const handleStateChange = async (stateId) => {
        // console.log('State ID:', stateId);
        const selectedState = stateList.find((state) => state.id === stateId);
        const { latitude, longitude } = selectedState;
        setPropertyMapCoords({
            latitude: latitude,
            longitude: longitude
        });
        if(cityList.length === 0){
            const cityObj = { state_id: stateId, lang: "en" };
            const getCityInfo = await insertData('api/city', cityObj, true);
            if (getCityInfo.status) {
                // console.log(getCityInfo.data.cities);
                setCityList(getCityInfo.data.cities);
            }
        }
    };
    const handleCityChange = async (cityId) => {
        const selectedCites = cityList.find((cities) => cities.id === cityId);
        // console.log('selectedState ID:', selectedCites.latitude);
        const { latitude, longitude } = selectedCites;
        setPropertyMapCoords({
            latitude: latitude,
            longitude: longitude
        });

        if (!cityId) {
            setDistrictList([]); // Clear cities if no state is selected
            return;
        }
        try {
            const districtObj = { city_id: cityId, lang: "en" };
            const getDistrictInfo = await insertData('api/district', districtObj, true);
            if (getDistrictInfo.status) {
                setDistrictList(getDistrictInfo.data.districts);
            } else {
                setDistrictList([]);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            setDistrictList([]);
        }
    };

    const handleDistrictChange = async (DistrictId) => {
        // console.log('District ID:', DistrictId);
        const selectedDistricts = districtList.find((districts) => districts.id === DistrictId);
        // console.log('selectedState ID:', selectedDistricts.latitude);
        const { latitude, longitude } = selectedDistricts;
        setPropertyMapCoords({
            latitude: latitude,
            longitude: longitude
        });

        if (!DistrictId) {
            setNeighborhoodList([]); // Clear cities if no state is selected
            return;
        }
        try {
            const districtObj = { district_id: DistrictId , lang:"en" };
            const getNeighborhoodObjInfo = await insertData('api/neighborhood', districtObj, true);
            if (getNeighborhoodObjInfo.status) {
                setNeighborhoodList(getNeighborhoodObjInfo.data);
            } else {
                setNeighborhoodList([]);
            }
        } catch (error) {
            // console.error("Error fetching cities:", error);
            setNeighborhoodList([]);
        }
    };
    const handleNeighborhoodChange = async (NeighborhoodId) => {
        // console.log('NeighborhoodId ID:', NeighborhoodId);
        const selecteNeighborhood = neighborhoodList.find((neighborhoods) => neighborhoods.id === NeighborhoodId);
        if (selecteNeighborhood) {
            // console.log('selectedNeighborhood ID:', selecteNeighborhood.latitude);
            const { latitude, longitude } = selecteNeighborhood;
            setPropertyMapCoords({
                latitude: latitude,
                longitude: longitude,
            });
        } else {
            console.error('Neighborhood not found');
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

	const handleCheckboxChange = (key) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [key]: !prevState[key], // Toggle the checked state
        }));
    };
    const messageClass = (sucessMessage) ? "message success" : "message error";
    console.log('user_id');
    console.log(projectDetail);
	return (
		<>
            {loading?
                    <><Preloader /></>
                :
			        <LayoutAdmin>
                    {errorMessage && <div className={messageClass}>{errorMessage}</div>}
                    <Formik
                        initialValues={{
                            title_en: projectDetail.title_en || "",
                            title_fr: projectDetail.title_fr || "",
                            description_en: projectDetail.description_en || "",
                            description_fr: projectDetail.description_fr || "",
                            price: projectDetail.price || 0,
                            vr_link: projectDetail.vr_link || "",
                            picture_img: projectDetail.picture_img || [],
                            icon: projectDetail.icon || null,
                            video: projectDetail.video || null,
                            state_id: "",
                            city_id: projectDetail.city || "",
                            districts_id: projectDetail.district || "",
                            neighborhood_id: projectDetail.neighborhood || "",
                            user_id: projectDetail.user_id || ""
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
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="desc">Price:<span>*</span></label>
                                                <Field type="number" id="price" name="price" className="box-fieldset" />
                                                <ErrorMessage name="price" component="div" className="error" />
                                            </fieldset>
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="desc">VR Link:</label>
                                                <Field type="text" name="vr_link" className="box-fieldset"  />
                                                {/* <ErrorMessage name="vr_link" component="div" className="error" /> */}
                                            </fieldset>
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="title">User Listing:</label>
                                                <Field
                                                    as="select"
                                                    name="user_id"
                                                    className="nice-select country-code"
                                                    value={values.user_id} // Bind the value to Formik's state
                                                    onChange={(e) => {
                                                        const selectedState = e.target.value;
                                                        setFieldValue("user_id", selectedState); // Update the Formik state
                                                    }}
                                                >
                                                    <option value="">Select User Listing</option>
                                                    {developerList && developerList.length > 0 ? (
                                                        developerList.map((user) =>
                                                            user.full_name !== null ? (
                                                                <option key={user.id} value={user.id}>
                                                                    {capitalizeFirstChar(user.full_name)}
                                                                </option>
                                                            ) : null
                                                        )
                                                    ) : null}
                                                </Field>
                                                {/* <ErrorMessage name="user_id" component="div" className="error" /> */}
                                            </fieldset>
                                            {/* <fieldset className="box box-fieldset">
                                                <label htmlFor="desc">Link UUID:<span>*</span></label>
                                                <Field type="text"  name="link_uuid" className="box-fieldset" />
                                            </fieldset> */}
                                        </div>
                                        <div className="box grid-3 gap-30">
                                            {/* <fieldset className="box box-fieldset">
                                                <label htmlFor="desc">License number:</label>
                                                <Field type="text" id="license_number" name="license_number" className="box-fieldset" />
                                                
                                            </fieldset>
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="desc">Credit:</label>
                                                <Field type="text" name="credit" className="box-fieldset"  />
                                            </fieldset> */}
                                            
                                                {/* {projectOfNumberListing && projectOfNumberListing.length > 0 ? (
                                                    projectOfNumberListing.map((project) => (
                                                        <fieldset className="box box-fieldset">
                                                            <label htmlFor="desc">{project.name}:</label>
                                                                <Field type="number" name={project.id} className="box-fieldset" />
                                                        </fieldset>
                                                    ))
                                                ) : (
                                                    <></>
                                                )} */}
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
                                                                let imageList = [];
                                                                const files = Array.from(event.target.files); // Convert to an array
                                                                const validPreviews = [];
                                                                files.forEach((file) => {
                                                                    // Check file size (less than 150KB)
                                                                    if (file.size < 150000) {
                                                                    alert(`Please upload files above the size of 150KB`);
                                                                    } else {
                                                                    // Create an Image object to check its dimensions
                                                                    const img = new Image();
                                                                    const reader = new FileReader();
                                                                    reader.onload = (e) => {
                                                                        img.src = e.target.result; // Set image src to the file's data URL

                                                                        // Once the image is loaded, check its dimensions
                                                                        img.onload = () => {
                                                                        const imageHeight = img.height;  // Get image height
                                                                        const imageWidth = img.width;    // Get image width

                                                                        // You can add your dimension validation here
                                                                        if (imageHeight <= 800 || imageWidth <= 1100) {
                                                                            alert('Please upload images with a maximum height of 800px and a maximum width of 1100px.');
                                                                        } else {
                                                                            // Add the file as a valid image and generate the preview
                                                                            validPreviews.push(URL.createObjectURL(file));
                                                                            imageList.push(file); // Add valid file to the list
                                                                        }

                                                                        // Update state and Formik with valid files
                                                                        setFilePreviews(validPreviews); // Set previews for valid files
                                                                        form.setFieldValue(field.name, imageList);
                                                                        };
                                                                    };

                                                                    // Read the file as a Data URL to create a preview
                                                                    reader.readAsDataURL(file);
                                                                    }
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
                                                                if (file.size < 1000) {
                                                                alert(`Please upload a file above the size of 1KB`);
                                                                return;
                                                                }

                                                                const img = new Image();
                                                                const reader = new FileReader();

                                                                reader.onload = (e) => {
                                                                img.src = e.target.result;

                                                                img.onload = () => {
                                                                    const imageHeight = img.height;
                                                                    const imageWidth = img.width;

                                                                    // Perform dimension validation
                                                                    if (imageHeight > 200 || imageWidth > 200) {
                                                                    alert(
                                                                        "Please upload an image with a maximum height and width of 200px."
                                                                    );
                                                                    } else {
                                                                    setFieldValue("icon", file); // Set the file in Formik state
                                                                    setIconPreview(URL.createObjectURL(file)); // Generate a preview URL
                                                                    }
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
                                            {iconPreview && (
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
                                                <label htmlFor="picture_img">Video Option:</label>
                                                {/* Video Option Radio Buttons */}
                                                <div>
                                                    <fieldset className="fieldset-radio">
                                                        <input type="radio" className="tf-radio video-upload"  value="upload" name="videoOption" onChange={() => {
                                                                setIsVideoUpload(true); // Update the state for conditional rendering
                                                                setFieldValue("video", null); // Reset the file field in Formik state
                                                            }} defaultChecked />
                                                        <label htmlFor="upload" className="text-radio">Upload Video</label>

                                                        <input
                                                            type="radio"
                                                            className="tf-radio video-upload"
                                                            name="videoOption"
                                                            value="link"
                                                            onChange={() => {
                                                                setIsVideoUpload(false); // Update the state for conditional rendering
                                                                setFieldValue("video_link", ""); // Reset the YouTube link field in Formik state
                                                            }}
                                                        />
                                                        <label htmlFor="videoOption" className="text-radio"> YouTube Link</label>
                                                        </fieldset>
                                                </div>

                                                {/* Conditional Fields */}
                                                {isVideoUpload ? (
                                                    // Video Upload Field
                                                    <div className="box-floor-img uploadfile">
                                                        <div className="btn-upload">
                                                            <label className="tf-btn primary">
                                                                Choose File
                                                                <input
                                                                    type="file"
                                                                    accept="video/mp4"
                                                                    className="ip-file"
                                                                    onChange={(event) => {
                                                                        const file = event.target.files[0];
                                                                        if (file) {
                                                                            setFieldValue("video", file); // Set the video file in Formik state
                                                                            setVideoPreview(URL.createObjectURL(file)); // Generate a preview URL
                                                                        }
                                                                    }}
                                                                    style={{ display: "none" }}
                                                                />
                                                            </label>
                                                        </div>
                                                        {videoPreview && (
                                                            <video controls className="uploadFileImage">
                                                                <source src={videoPreview} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        )}
                                                        <p className="file-name fw-5">Or drop video here to upload</p>
                                                        {/* <ErrorMessage name="video" component="div" className="error" /> */}
                                                    </div>
                                                ) : (
                                                    // YouTube Link Input Field
                                                    <div>
                                                        <label htmlFor="video_link">YouTube Link:</label>
                                                        <Field
                                                            type="text"
                                                            name="video_link"
                                                            className="form-control"
                                                            placeholder="https://www.youtube.com/watch?v=QgAQcrvHsHQ"
                                                        />
                                                        {/* <ErrorMessage name="video_link" component="div" className="error" /> */}
                                                    </div>
                                                )}
                                            </fieldset>

                                        </div>
                                    </div>
                                    <div className="widget-box-2">
                                        <h6 className="title">Location</h6>
                                        <div className="box grid-4 gap-30">
                                            <fieldset className="box box-fieldset">
                                                <label htmlFor="desc">State:</label>{values.state_id}
                                                <Field
                                                    as="select"
                                                    name="state_id"
                                                    className="nice-select country-code"
                                                    value={values.state_id}
                                                    onChange={(e) => {
                                                        const selectedState = e.target.value;
                                                        setFieldValue("state_id", selectedState);
                                                        handleStateChange(selectedState);
                                                    }}
                                                >
                                                <option value="">Select State</option>
                                                {stateList.length > 0 ? (
                                                    stateList.map((state) => (
                                                        <option key={state.id} value={state.id}>
                                                            {state.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <></>
                                                )}
                                            </Field>
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
                                                                    {cities.city_name}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Field>
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
                                                                    {districts.district_name}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Field>
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
                                            />
                                        </div>
                                    </div>
                                    <div className="widget-box-2">
                                        <h6 className="title">Amenities </h6>
                                        <div className="box-amenities-property">
                                            <div className="box-amenities">
                                            {projectOfBooleanListing && projectOfBooleanListing.length > 0 ? (
                                                    projectOfBooleanListing.map((project) => (
                                                        <fieldset         className="amenities-item">
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