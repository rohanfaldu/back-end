'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import PropertyMapMarker from "@/components/elements/PropertyMapMarker"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFormik } from 'formik';
import { use, useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { insertData, insertImageData } from "../../components/api/Axios/Helper";
import { insertMultipleUploadImage } from "../../components/common/imageUpload";
import { capitalizeFirstChar } from "../../components/common/functions";
import Preloader from "@/components/elements/Preloader";
import SuccessPopup from "@/components/SuccessPopup/SuccessPopup";
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// Adjust the path based on your project structure
//import ReactGooglePlacesAutocomplete from 'react-google-places-autocomplete';

import  "../../components/errorPopup/ErrorPopup.css";
import ErrorPopup from "../../components/errorPopup/ErrorPopup.js";

export default function CreateProperty() {
    const [loading, setLoading] = useState(false); // Loader state
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);
	const [propertyMeta, setPropertyMeta] = useState(false);
    const [filePictureImg, setFilePictureImg] = useState(null);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [neighborhoodList, setNeighborhoodList] = useState([]);
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
    const [currencyList, setCurrencyList] = useState([]);
    const [currencyCode, setCurrencyCode] = useState([]);
    const [propertyMapCoords, setPropertyMapCoords] = useState({
        latitude: 33.5945144,
        longitude: -7.6200284,
        zoom: 6
    });
    const [address, setAddress] = useState('');

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
        // vr_link: Yup.string().url("Invalid URL").nullable(),
        picture_img: Yup.array().min(1, "At least three image is required").required("Image is required"),
        state_id: Yup.string().required("State is required"),
        videoLink: Yup.string().url("Enter a valid URL"),
        city_id: Yup.string().required("City is required"),
        currency_id: Yup.string().required("Currency is required"),
        districts_id: Yup.string().required("District is required"),
        neighborhood_id: Yup.string().required("Neighborhood is required"),
        transaction_type: Yup.string().required("Transaction type is required"),
        property_type: Yup.string().required("Property type is required"),
        user_id: Yup.string().required("User is required"),
        size_sqft: Yup.string().required("Size is required"),
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Collect API calls in an array for concurrent execution
                const apiCalls = [];

                if (stateList.length === 0) {
                    apiCalls.push(
                        insertData('api/state', {}, true).then((res) => {
                            if (res) setStateList(res.data.states);
                        })
                    );
                }

                if (userList.length === 0) {
                    apiCalls.push(
                        Promise.all([
                            insertData('auth/get/developer', {}, false),
                            insertData('auth/get/agency', {}, false),
                        ]).then(([devRes, agencyRes]) => {
                            const allUsers = [
                                ...devRes.data.user_data,
                                ...agencyRes.data.user_data,
                            ];
                            setUserList(allUsers);
                        })
                    );
                }

                if (propertyofTypesListing.length === 0) {
                    apiCalls.push(
                        insertData('api/property-type/', { page: 1, limit: 100 }, true).then((res) => {
                            if (res.status) setpropertyofTypesListing(res.data.list);
                        })
                    );
                }

                if (projectOfListing.length === 0) {
                    apiCalls.push(
                        insertData('api/projects/', { page: 1, limit: 1000 }, true).then((res) => {
                            if (res.status) setProjectOfListing(res.data.projects);
                        })
                    );
                }

                if (!propertyMeta) {
                    apiCalls.push(
                        insertData('api/property-type-listings', { page: 1, limit: 100 }, true).then((res) => {
                            if (res) {
                                setProjectOfNumberListing(
                                    res.data.list.filter((item) => item.type === "number")
                                );
                                setProjectOfBooleanListing(
                                    res.data.list.filter((item) => item.type === "boolean")
                                );
                            }
                            setPropertyMeta(true);
                        })
                    );
                }

                if (currencyList.length === 0) {
                    apiCalls.push(
                        insertData('api/currency/get', {}, true).then((res) => {
                            if (res.status) setCurrencyList(res.data);
                        })
                    );
                }

                // Execute all API calls concurrently
                await Promise.all(apiCalls);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [
        stateList.length,
        userList.length,
        propertyofTypesListing.length,
        projectOfListing.length,
        propertyMeta,
        currencyList.length,
    ]); 
  
    const handleStateChange = async (stateId) => {
        const selectedState = stateList.find((state) => state.id === stateId);
        const { latitude, longitude } = selectedState;
        setPropertyMapCoords({
            latitude: latitude,
            longitude: longitude,
            zoom: 10
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
    const handleDistrictChange = async (DistrictId) => {
        console.log('District ID:', DistrictId);
        const selectedDistricts = districtList.find((districts) => districts.id === DistrictId);
        console.log('selectedState ID:', selectedDistricts.latitude);
        const { latitude, longitude } = selectedDistricts;
        setPropertyMapCoords({
            latitude: latitude,
            longitude: longitude,
            zoom: 12
        });

        if (!DistrictId) {
            setNeighborhoodList([]); // Clear cities if no state is selected
            return;
        }
        try {
            const districtObj = { district_id: DistrictId , lang:"en" };
            const getNeighborhoodObjInfo = await insertData('api/neighborhood', districtObj, true);
            if (getNeighborhoodObjInfo.status) {
                setNeighborhoodList(getNeighborhoodObjInfo.data.neighborhoods);
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
        } else {
            console.error('Neighborhood not found');
        }
    };




    const handleCityChange = async (cityId) => {
        console.log('City ID:', cityId);
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


    const handleNumberChange = (id, value) => {
        setPropertyOfMetaNumberValue((prev) => ({
            ...prev,
            [id]: value,
        }));
    
        //setPropertyOfMetaNumberValue((prev) => {
            
        //   const propertyOfMetaNumberValue = [...prev];
        //   const index = propertyOfMetaNumberValue.findIndex((item) => item.id === id);
        //   console.log('index');
        //   console.log(index);
        //   console.log('propertyOfMetaNumberValue');
        //   console.log(propertyOfMetaNumberValue);
        //   if (index > -1) {
        //     propertyOfMetaNumberValue[index].value = value;
        //   } else {
        //     const propertyOfMetaNumberObj = {property_type_id: id, value: value};
        //     propertyOfMetaNumberValue.push(propertyOfMetaNumberObj);
        //   }
        //   return propertyOfMetaNumberValue;
        //});
    };





    const handleFileChangeVideo = (event, setFieldValue) => {
        console.log( 'video' );
        console.log( event );
        const files = Array.from(event.currentTarget.files);  // Convert FileList to Array
        const videoFile = files.find(file => file.type === "video/mp4");  // Check for video files
        //const imageFiles = files.filter(file => file.type.startsWith("image/"));  // Filter for image files
        console.log(videoFile);
        // If video file is selected, set it in the "video" field
        if (videoFile) {
            setFieldValue("video", videoFile);
            setVideoPreview(URL.createObjectURL(videoFile));  // Optional: Display video preview
        }
    };

    const handleFileChange = (event, setFieldValue) => {
        console.log( 'image' );
        console.log( event );
        const files = Array.from(event.currentTarget.files);  // Convert FileList to Array
        //const videoFile = files.find(file => file.type === "video/mp4");  // Check for video files
        const imageFiles = files.filter(file => file.type.startsWith("image/"));  // Filter for image files
        console.log(imageFiles);
        if (imageFiles.length > 0) {
            console.log(imageFiles);
            setFieldValue("picture_img", imageFiles);  // Multiple image files in Formik field
            setFilePreviews(imageFiles.map(file => URL.createObjectURL(file)));  // Preview images
        }
    };

    const handlePlaceSelect = (place) => {
        // You can access selected place details here
        console.log("place");
        console.log(place);
        // Update address state with the selected place's formatted address
        setAddress(place.description);
    };

    const handleAddressSelect = (newAddress, newLocation) => {

    };

      // Handler for image remove


    // Handle form submission
    const handleSubmit = async (values, { resetForm, setErrors }) => {
        console.log(values);
        console.log(propertyOfMetaNumberValue);
        try {
            // Validation for video
            if (isVideoUpload && !values.video) {
                setErrors({ serverError: "Please upload a video file." });
                setShowErrorPopup(true);
                return;
            }

            if (!isVideoUpload && !values.video_link) {
                setErrors({ serverError: "Please enter a YouTube video link." });
                setShowErrorPopup(true);
                return;
            }
            const selectedAmenities = projectOfBooleanListing
                .filter((project) => checkedItems[project.key])
                .map((project) => ({ property_type_id: project.id, value: "true" }));
                

                if (propertyOfMetaNumberValue && Object.keys(propertyOfMetaNumberValue).length > 0) {
                    // Iterate over the keys in the JSON object
                    Object.entries(propertyOfMetaNumberValue).forEach(([key, value]) => {
                        // Check if the key matches any property_type_id in the array
                        const index = selectedAmenities.findIndex(item => item.property_type_id === key);
                        if (index !== -1) {
                            // Update the value if a match is found
                            selectedAmenities[index].value = value;
                        } else {
                            // Add a new object if no match is found
                            selectedAmenities.push({ property_type_id: key, value });
                        }
                    });
                }

            console.log("Selected Amenities:", selectedAmenities); 
          //  setLoading(true);
            const uploadImageObj = Array.isArray(values.picture_img) 
            ? values.picture_img.filter(item => item !== null) 
            : [values.picture_img].filter(item => item !== null);
            
            if (values.video != null) {
                uploadImageObj.push(values.video);
            }
    
            setLoading(true);
            const uploadImageUrl = await insertMultipleUploadImage("image", uploadImageObj);

            if (uploadImageUrl.files.length > 0) {
                const imageUrls = [];
                let videoUrl = null;

                uploadImageUrl.files.forEach((file) => {
                    if (file.mimeType.startsWith("image")) {
                        imageUrls.push(file.url);
                    } else if (file.mimeType.startsWith("video")) {
                        videoUrl = file.url;
                    }
                });

                const pictureUrl = imageUrls.join(", ");
                console.log("Image URLs:", pictureUrl);
                console.log("Video URL:", videoUrl);

                if (!videoUrl) {
                    videoUrl = values.video_link;
                }

                const propertyData = {
                    title_en: values.title_en,
                    title_fr: values.title_fr,
                    description_en: values.description_en ?? null,
                    description_fr: values.description_fr ?? null,
                    price: parseInt(values.price) ?? 0,
                    vr_link: values.vr_link ?? null,
                    picture: imageUrls,
                    video: videoUrl,
                    user_id: values.user_id,
                    link_uuid: values.link_uuid ?? null,
                    state_id: values.state_id,
                    city_id: values.city_id,
                    district_id: values.districts_id,
                    neighborhood_id: values.neighborhood_id,
                    latitude: isNaN(parseFloat(values.latitude)) ? "20.2323" : String(values.latitude),
                    longitude: isNaN(parseFloat(values.longitude)) ? "20.2323" : String(values.longitude),
                    transaction: values.transaction_type,
                    type_id: values.property_type,
                    size: parseInt(values.size_sqft) ?? 0,
                    meta_details: selectedAmenities,
                    currency_id: values.currency_id,
                    project_id: values.project_id ?? null,
                    address: values.address,
                };

                console.log("Property Data:", propertyData); 
                const createPropertyInfo = await insertData("api/property/create", propertyData, true);

                if (createPropertyInfo.status) {
                    //setLoading(false);
                    setSucessMessage(createPropertyInfo.message || "Property created successfully.");
                    //setErrors({ serverError: "Property created successfully." });
                    //setShowErrorPopup(true);
                    resetForm();
                    router.push("/property-listing");
                } else {
                    setLoading(false);
                    setErrors({ serverError: createPropertyInfo.message || "Failed to create property." });
                    setShowErrorPopup(true);
                }
            } else {
                setLoading(false);
                setErrors({ serverError: "File upload failed. Please try again." });
                setShowErrorPopup(true);
            }
        } catch (error) {
            setLoading(false);
            setErrors({ serverError: error.message || "An unexpected error occurred." });
            setShowErrorPopup(true);
        }
        finally {
            setLoading(false); // Stop loader
        }
    };


    const handleCheckboxChange = (key) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [key]: !prevState[key], // Toggle the checked state
        }));
    };

	const [selectedRadio, setSelectedRadio] = useState('radio1')


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
    // console.log(checkedItems);
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
                    description_en: "",
                    description_fr: "",
                    price: "",
                    picture_img: [],
                    video: null,
                    video_link: "",
                    state_id: "",
                    city_id: "",
                    districts_id: "",
                    neighborhood_id: "",
                    transaction_type: "",
                    property_type: "",
                    user_id: "",
                    size_sqft: "",
                 }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
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
                                        {/* <ErrorMessage name="transaction_type" component="div" className="error" /> */}
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
                                        {/* <ErrorMessage name="property_type" component="div" className="error" /> */}
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
                                        {/* <ErrorMessage name="project_id" component="div" className="error" /> */}
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
                                        {/* <ErrorMessage name="user_id" component="div" className="error" /> */}
                                    </fieldset>
                                </div>
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
                                            {/* <ErrorMessage name="price" component="div" className="error" /> */}
                                        {/* <ErrorMessage name="currency_id" component="div" className="error" /> */}
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Direction:<span>*</span></label>
                                        <Field as="select" name="direction" className="nice-select country-code">
                                            <option value="">Select Direction</option>
                                            <option value="north">North</option>
                                            <option value="south">South</option>
                                            <option value="east">East</option>
                                            <option value="west">West</option>
                                        </Field>
                                        {/* <ErrorMessage name="property_type" component="div" className="error" /> */}
                                    </fieldset>
                                    {/* <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">VR Link:</label>
                                        <Field type="text" name="vr_link" className="box-fieldset"  />
                                        // <ErrorMessage name="vr_link" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Link UUID:</label>
                                        <Field type="text"  name="link_uuid" className="box-fieldset" />
                                        // <ErrorMessage name="link_uuid" component="div" className="error" />
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
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Size of SqMeter:<span>*</span></label>
                                        <Field type="number" id="size_sqft" name="size_sqft" className="form-control style-1" min="0" />
                                        {/* <ErrorMessage name="size_sqft" component="div" className="error" /> */}
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
                                <div className="box grid-2 box gap-30">
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
                                                                    if (imageHeight <= 80|| imageWidth <= 100) {
                                                                        alert('Please upload images with a maximum height of 80px and a maximum width of 80px');
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
                                                            //}
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
                                                            {cities.city_name}
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
                                                            {districts.district_name}
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
                                                            {neighborhoods.neighborhood_name}
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
                                    {/* <label htmlFor="location">Address:<span>*</span></label> */}
                                    {/* <div className="box-ip"> */}

                                        {/* <GooglePlacesAutocomplete /> */}


                                     {/* <ReactGooglePlacesAutocomplete
                                        apiKey="AIzaSyCwhqQx0uqNX7VYhsgByiF9TzXwy81CFag"
                                        selectProps={{
                                            value: address,
                                            onChange: (selected) => handlePlaceSelect(selected),
                                        }}
                                    /> <br/> */}
                                    {/* <Link href="#" className="btn-location"><i className="icon icon-location" /></Link>
                                    </div><br/><br/><br/> */}
                                    <PropertyMapMarker
                                        latitude={propertyMapCoords.latitude}
                                        longitude={propertyMapCoords.longitude}
                                        zoom={propertyMapCoords.zoom}
                                        onPlaceSelected={(newAddress, newLocation) => {
                                                setFieldValue('address', newAddress);
                                                setFieldValue('latitude', newLocation.lat);
                                                setFieldValue('longitude', newLocation.lng);
                                                handleAddressSelect(newAddress, newLocation);
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
                            <button type="submit"  className="tf-btn primary"onClick={() => setShowErrorPopup(!showErrorPopup)} >Add Property</button>
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
  );
}