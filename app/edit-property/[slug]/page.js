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
import { insertData, insertImageData } from "@/components/api/Axios/Helper";
import { insertMultipleUploadImage } from "@/components/common/imageUpload";
import { capitalizeFirstChar } from "@/components/common/functions";
import Preloader from "@/components/elements/Preloader";
import  "@/components/errorPopup/ErrorPopup.css";
import ErrorPopup from "@/components/errorPopup/ErrorPopup.js";

export default function EditProperty({params}) {
    const { slug } = params;
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
    const [projectOfListing, setprojectOfListing] = useState([]);
    const [propertyOfNumberListing, setPropertyOfNumberListing] = useState([]);
    const [propertyofTypesListing, setpropertyofTypesListing] = useState([]);
    const [propertyOfBooleanListing, setPropertyOfBooleanListing] = useState([]);
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
    const [propertyDetail, setPropertyDetail] = useState({}); // Initialize as an empty object

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
        picture_img: Yup.array().min(3, "At least three image is required").required("Image is required"),
        state_id: Yup.string().required("State is required"),
        videoLink: Yup.string().url("Enter a valid URL"),
        city_id: Yup.string().required("City is required"),
        currency_id: Yup.string().required("Currency is required"),
        districts_id: Yup.string().required("District is required"),
        // neighborhood_id: Yup.string().required("Neighborhood is required"),
        transaction_type: Yup.string().required("Transaction type is required"),
        property_type: Yup.string().required("Property type is required"),
        user_id: Yup.string().required("User is required"),
        size_sqft: Yup.string().required("Size is required"),
    });


    useEffect(() => {
            // console.log(id);
            const fetchData = async () => {
            try {
                    const requestData = {
                        property_slug: slug,
                    };
                    const getpropertyInfo = await insertData('api/property/getbyIds', requestData, true);
                        // console.log(getpropertyInfo);
    
                    if (getpropertyInfo.data) {
                        setPropertyDetail(getpropertyInfo.data);
                    } else {
                        setErrorMessage("Property not found.");
                    }
    
                    if (getpropertyInfo.data.meta_details) {
                    // Create the checkedItems state based on meta_details
                    const initialCheckedItems = getpropertyInfo.data.meta_details.reduce((acc, meta) => {
    
                        if (meta.value === "true") {
                            acc[meta.key] = true; // Set the checkbox for this key as checked
                        }
                        return acc;
                    }, {});
                    setCheckedItems(initialCheckedItems);
                    const initialNumberItems = getpropertyInfo.data.meta_details.reduce((acc, meta) => {
    
                        if (meta.value === "number") {
                            acc[meta.key] = true; // Set the checkbox for this key as checked
                        }
                        return acc;
                    }, {});
                    setPropertyOfMetaNumberValue(initialNumberItems);
                }
                if (getpropertyInfo.data.picture) {
                    setFilePreviews(getpropertyInfo.data.picture.map((url) => url)); // Use URLs for preview
                }
               
                if (getpropertyInfo.data.video) {
                    const videoLink = getpropertyInfo.data.video;
                    if (videoLink.toLowerCase().endsWith(".mp4")) {
                        setIsVideoUpload(true); // Set to 'Upload Video' if it's an .mp4
                        setVideoPreview(videoLink); // Set video preview (for .mp4)
                    } else {
                        console.log(videoLink);
                        setIsVideoUpload(false); // Set to 'YouTube Link' otherwise
                    }
                }
                if(stateList.length === 0){
                    const stateObj = {};
                    const getStateInfo = await insertData('api/state', stateObj, true);
                    // console.log(getStateInfo.data.states[0].id);
                    if(getStateInfo) {
                        setStateList(getStateInfo.data.states);
                    }
                   
                }
                if(cityList.length === 0){
                    const cityObj = { state_id: getpropertyInfo.data.state, lang: "en" };
                    const getCityInfo = await insertData('api/city', cityObj, true);
                    if (getCityInfo.status) {
                        console.log(getCityInfo.data.cities);
                        setCityList(getCityInfo.data.cities);
                    }
                }
                if(districtList.length === 0){
                    const districtObj = { city_id: getpropertyInfo.data.city, lang: "en" };
                    const getDistrictInfo = await insertData('api/district', districtObj, true);
                    if (getDistrictInfo.status) {
                        setDistrictList(getDistrictInfo.data.districts);
                    } else {
                        setDistrictList([]);
                    }
                }
                if(neighborhoodList.length === 0){
                    console.log("tdsd");
                    const neighborhoodObj = { district_id: getpropertyInfo.data.district, lang: "en" };
                    const getNeighborhoodObjInfo = await insertData('api/neighborhood', neighborhoodObj, true);
                    if (getNeighborhoodObjInfo.status) {
                        setNeighborhoodList(getNeighborhoodObjInfo.data);
                    } else {
                        setNeighborhoodList([]);
                    }
                }


                
                if (propertyofTypesListing.length === 0) {
                    const stateObj = {};
                    const res = await insertData('api/property-type/', stateObj, true);
                    setpropertyofTypesListing(res.data.list);

                }
                if (projectOfListing.length === 0) {
                    const res1 = await insertData('api/projects/',  { page: 1, limit: 1000 }, true);
                    setprojectOfListing(res1.data.projects);
                }
                const apiCalls = [];

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
                    
                if (currencyList.length === 0) {
                    apiCalls.push(
                        insertData('api/currency/get', {}, true).then((res) => {
                            if (res.status) setCurrencyList(res.data);
                        })
                    );
                }
                if(propertyOfNumberListing.length === 0 && propertyOfBooleanListing.length === 0){
                    apiCalls.push(
                        insertData('api/property-type-listings', { page: 1, limit: 100 }, true).then((res) => {
                            

                            if (res) {
                                setPropertyOfNumberListing(
                                    res.data.list.filter((item) => item.type === "number")
                                );
                                console.log(res.data.list);
                                setPropertyOfBooleanListing(
                                    res.data.list.filter((item) => item.type === "boolean")
                                );
                            }
                        })
                    );
                }
                if(developerList.length === 0){
                    const getUsersDeveloperInfo = await insertData('auth/get/developer', {}, false);
                    const developerList = getUsersDeveloperInfo.data.user_data;
                    if(developerList.length) {
                        setDeveloperList(developerList);
                    }
                }
                setLoading(false); // Stop loading
                setError(null); // Clear errors
            } catch (err) {
                setLoading(false); // Stop loading
            }
            };
            fetchData(); // Fetch data on component mount
        }, []);
        console.log(propertyOfNumberListing);

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
                console.log(getCityInfo.data.cities);
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
                setNeighborhoodList(getNeighborhoodObjInfo.data);
            } else {
                setNeighborhoodList([]);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            setNeighborhoodList([]);
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

    // Handle form submission
    const handleSubmit = async (values, { resetForm, setErrors }) => {
        console.log(values);

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

            setLoading(true); // Start loader


            // Prepare amenities
            const selectedAmenities = propertyOfBooleanListing
                .filter((property) => checkedItems[property.key])
                .map((property) => ({ property_type_id: property.id, value: "true" }));

            if (propertyOfMetaNumberValue.length > 0) {
                selectedAmenities.push(...propertyOfMetaNumberValue);
            }

            console.log("Selected Amenities:", selectedAmenities);
                    setLoading(true); // Start loader


            const uploadImageObj = Array.isArray(values.picture_img) ? values.picture_img : [values.picture_img];
            const videoObj = values.video ? [values.video] : [];
            const iconObj = values.icon ? [values.icon] : [];
            
            // Combine all files (images, video, icons) for upload
            const allUploadFiles = [...uploadImageObj, ...videoObj];
            const allUploadFilesICon = [...iconObj];
            console.log('uploadImageIconUrl');
            console.log(allUploadFiles);

            const hasFile = allUploadFiles.some((item) => item instanceof File);
            const hasFileIcon = allUploadFilesICon.some((item) => item instanceof File);
            console.log("Contains a File:", hasFileIcon);
            // Upload files
            let  uploadImageUrl = values.picture_img;
            let uploadImageIconUrl = [];
            if(hasFile){
                const uploadImageUrlFIles = await insertMultipleUploadImage("image", allUploadFiles);
                uploadImageUrl = uploadImageUrlFIles.files;
            }
            if(hasFileIcon){
            uploadImageIconUrl = await insertMultipleUploadImage("image", allUploadFilesICon);
            }

            if (uploadImageUrl.length > 0) {
                const imageUrls = [];
                let videoUrl = values.video;
                let iconUrl = values.icon; // Initialize as null for a single URL
            
                // Process uploaded files to separate URLs
                if(hasFile){
                    uploadImageUrl.forEach((file) => {


                        if (file.mimeType.startsWith("image")) {
                            imageUrls.push(file.url); // Collect image URLs
                        } else if (file.mimeType.startsWith("video")) {
                            videoUrl = file.url; // Assign video URL
                        }
                    });
                } else{
                    uploadImageUrl.forEach((file) => {
                        imageUrls.push(file);
                    })
                    
                }
                // Assign the first icon file's URL to iconUrl
                if (uploadImageIconUrl?.files?.length > 0) {
                    iconUrl = uploadImageIconUrl.files[0].url; // Use the first file's URL
                }else{
                    iconUrl = values.icon;
                }
            
                
                console.log("Project Data:", { imageUrls, videoUrl, iconUrl });
            
                // Default video URL if not uploaded
                if (!videoUrl) {
                    const isValid = validateYouTubeURL(values.video_link);
                    if (!isValid) {
                        setErrors({ serverError: "Please upload a Valid YouTube video link like https://www.youtube.com/watch?v=YOUR_VIDEO_ID." });
                        setShowErrorPopup(true);
                        return false;
                    }
                    videoUrl = values.video_link ?? null; // Use values.video_link as fallback
                }
                console.log('values');
                console.log(values);

                // Prepare data for property creation
                const propertyData = {
                    title_en: values.title_en,
                    title_fr: values.title_fr,
                    description_en: values.description_en ?? null,
                    description_fr: values.description_fr ?? null,
                    price: parseInt(values.price) ?? 0,
                    vr_link: values.vr_link ?? null,
                    picture: imageUrls.length > 0 ? imageUrls : values.picture_img, // Default to an empty array if `values.picture_img` is undefined
                    video: videoUrl,
                    user_id: values.user_id,
                    link_uuid: values.link_uuid ?? null,
                    state_id: values.state_id,
                    city_id: values.city_id,
                    district_id: values.districts_id,
                    neighborhood_id: values.neighborhood_id,
                    latitude: values.latitude ? String(values.latitude) : "33.985047",
                    longitude: values.longitude ? String(values.longitude) : "-118.469483",
                    transaction: values.transaction_type,
                    type_id: values.property_type,
                    size: parseInt(values.size_sqft) ?? 0,
                    meta_details: selectedAmenities,
                    currency_id: values.currency_id,
                    project_id: values.project_id ?? null,
                    address: values.address,
                };

                console.log("Property Data:", propertyData);

                // Create property
                const createPropertyInfo = await insertData("api/property/create", propertyData, true);

                if (createPropertyInfo.status) {
                    setErrors({ serverError: "Property created successfully." });
                    setShowErrorPopup(true);
                    resetForm();
                    router.push("/property-listing");
                } else {
                    setErrors({ serverError: createPropertyInfo.message || "Failed to create property." });
                    setShowErrorPopup(true);
                }
            } else {
                setErrors({ serverError: "File upload failed. Please try again." });
                setShowErrorPopup(true);
            }
        } catch (error) {
            setErrors({ serverError: error.message || "An unexpected error occurred." });
            setShowErrorPopup(true);
        }
        finally {
            setLoading(false); // Stop loader
        }
    };

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
                enableReinitialize
                initialValues={{
                    title_en: propertyDetail?.title_en || "",
                    title_fr: propertyDetail?.title_fr || "",
                    description_en: propertyDetail?.description_en || "",
                    description_fr: propertyDetail?.description_fr || "",
                    price: propertyDetail?.price || "",
                    picture_img: propertyDetail?.picture || [],
                    video: propertyDetail?.video || null,
                    video_link: propertyDetail?.video || null,
                    currency_id: propertyDetail?.currency || "",
                    credit: propertyDetail?.credit || "",
                    state_id: propertyDetail?.state || "",
                    city_id: propertyDetail?.city || "",
                    districts_id: propertyDetail?.district || "",
                    neighborhood_id: propertyDetail?.neighborhood || "",
                    transaction_type: propertyDetail?.transaction_type || "",
                    property_type: propertyDetail?.type_details?.id || "",
                    project_id: propertyDetail?.project_id || "",
                    user_id: propertyDetail?.user || "",
                    size_sqft: propertyDetail?.size || "",
                    direction: propertyDetail?.direction || "",
                }}

                 
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
                    <Form>
                        <div>
                            <div className="widget-box-2">
                                <h6 className="title">Property Information</h6>
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
                                <div className="grid-1 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Description English:<span>*</span></label>
                                        <Field type="textarea"  as="textarea"  id="description_en" name="description_en" className="textarea-tinymce" />
                                    </fieldset>
                                </div>
                                <div className="grid-1 box gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Description French:<span>*</span></label>
                                        <Field type="textarea"  as="textarea"  id="description_fr" name="description_fr" className="textarea-tinymce" />
                                    </fieldset>
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Other Information</h6>
                                <div className="box grid-2 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Transaction Type:<span>*</span></label>
                                        <Field as="select" name="transaction_type" className="nice-select"
                                                onChange={(e) => {
                                                    const selectedType = e.target.value;
                                                    setFieldValue("transaction_type", selectedType);
                                                }}
                                            >
                                            <option value="">Select Transaction Type</option>
                                            <option value="sale">Fore Sale</option>
                                            <option value="rental">For Rental</option>
                                        </Field>
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Property Type:<span>*</span></label>
                                        <Field as="select" name="property_type" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedProperty = e.target.value;
                                                    setFieldValue("property_type", selectedProperty);
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
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Project Listing:<span>*</span></label>
                                        <Field as="select" name="project_id" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedProject = e.target.value;
                                                    setFieldValue("project_id", selectedProject);
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
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">User Listing:</label>
                                        <Field as="select" name="user_id" className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedUser = e.target.value;
                                                    setFieldValue("user_id", selectedUser);
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
                                    </fieldset>
                                   
                                </div>
                                <div className="box grid-3 gap-30">
                                <fieldset className="box-fieldset ">
                                        <label htmlFor="name">Price<span>*</span>:</label>
                                            <div className="phone-and-country-code">
                                                <Field as="select" name="currency_id" className="nice-select country-code"
                                                    id="country-code"
                                                    value={propertyDetail.currency_id || values.currency_id || ""}
                                                    onChange={(e) => {
                                                        const selecteCureency = e.target.value;
                                                        setCurrencyCode(selecteCureency);
                                                        setFieldValue("currency_id", selecteCureency);
                                                    }}
                                                >
                                                    
                                                    <option value="">Select Currency</option>
                                                    {currencyList && currencyList.length > 0 ? (
                                                        currencyList.map((currency, index) =>(
                                                            <option key={index} value={currency.id}>{currency.symbol}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Field>
                                                <Field type="text" id="price" name="price" className="form-control style-1" />
                                            </div>
                                           
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">Direction:<span>*</span></label>
                                        <Field as="select" name="direction" className="nice-select country-code">
                                            <option value="">Select Direction</option>
                                            <option value="north">North</option>
                                            <option value="south">South</option>
                                            <option value="east">East</option>
                                            <option value="west">West</option>
                                        </Field>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="description">Size of SqMeter:<span>*</span></label>
                                        <Field type="number" id="size_sqft" name="size_sqft" className="form-control style-1" min="0" />
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                        {propertyOfNumberListing && propertyOfNumberListing.length > 0 ? (
                                            propertyOfNumberListing.map((property) => (
                                                <fieldset className="box box-fieldset">
                                                    <label htmlFor="desc">{property.name}:</label>
                                                        <Field
                                                            type="number"
                                                            name={property.id}
                                                            min="0"
                                                            className="box-fieldset"
                                                            onChange={(e) => handleNumberChange(property.id, e.target.value)}
                                                        />
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
                                                                                                   // if (file.size < 150000) {
                                                                                                   // alert(`Please upload files above the size of 150KB`);
                                                                                                   // } else {
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
                                                                                                       console.log(validPreviews);
                                                                                                       // Update state and Formik with valid files
                                                                                                       setFilePreviews(validPreviews); // Set previews for valid files
                                                                                                       setFieldValue(field.name, imageList);
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
                                                <input
                                                    type="radio"
                                                    className="tf-radio video-upload"
                                                    value="upload"
                                                    name="videoOption"
                                                    onChange={() => {
                                                        setIsVideoUpload(true); // Update the state for 'Upload Video'
                                                        setFieldValue("video", null); // Reset the file field in Formik state
                                                    }}
                                                    checked={isVideoUpload} // Ensure this radio is checked if it's an .mp4
                                                />
                                                <label htmlFor="upload" className="text-radio">Upload Video</label>

                                                <input
                                                    type="radio"
                                                    className="tf-radio video-upload"
                                                    name="videoOption"
                                                    value="link"
                                                    onChange={() => {
                                                        setIsVideoUpload(false); // Update the state for 'YouTube Link'
                                                        setFieldValue("video_link", ""); // Reset the YouTube link field in Formik state
                                                    }}
                                                    checked={!isVideoUpload} // Ensure this radio is checked if it's not an .mp4
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
                                <div className="widget-box-2">
                                    <h6 className="title">Location</h6>
                                    <div className="box grid-4 gap-30">
                                        <fieldset className="box box-fieldset">
                                            <label htmlFor="desc">State:</label>
                                            <Field
                                                as="select"
                                                name="state_id"
                                                className="nice-select country-code"
                                                value={ propertyDetail.state|| values.state_id}
                                                onChange={(e) => {
                                                    const selectedStateId = e.target.value;
                                                    setFieldValue("state_id", selectedStateId);
                                                    handleStateChange(selectedStateId);
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
                                                <>  </>
                                                )
                                            }
                                        </Field>
                                        </fieldset>
                                        <fieldset className="box box-fieldset">
                                            <label htmlFor="desc">Cities:</label>
                                            <Field
                                                as="select"
                                                name="city_id"
                                                className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedCity = e.target.value;
                                                    setFieldValue("city_id", selectedCity);
                                                    handleCityChange(selectedCity);
                                                }}
                                                value={propertyDetail.city || values.city_id }
                                            >
                                                <option value="">Select Cities</option>
                                                {cityList && cityList.length > 0 ? (
                                                    cityList.map((cities) => (
                                                        <option key={cities.id} value={cities.id}>
                                                            {cities.city_name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    // Show the propertyDetail city name when cityList is empty
                                                    propertyDetail?.city?.id && (
                                                        <option value={propertyDetail.city.id}>
                                                            {propertyDetail.city.name}
                                                        </option>
                                                    )
                                                )}
                                            </Field>
                                        </fieldset>

                                        <fieldset className="box box-fieldset">
                                            <label htmlFor="desc">District:</label>
                                            <Field
                                                as="select"
                                                name="districts_id"
                                                className="nice-select country-code"
                                                onChange={(e) => {
                                                    const selectedDistrict = e.target.value;
                                                    setFieldValue("districts_id", selectedDistrict);
                                                    handleDistrictChange(selectedDistrict);
                                                }}
                                                value={propertyDetail.district || values.districts_id || ""}
                                            >
                                                <option value="">Select District</option>
                                                
                                                {districtList && districtList.length > 0 ? (
                                                    districtList.map((districts) => (
                                                        <option key={districts.id} value={districts.id}>
                                                            {districts.district_name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    propertyDetail?.district && (
                                                        <option value={propertyDetail.district.id}>
                                                            {propertyDetail.district.name}
                                                        </option>
                                                    )
                                                )}
                                            </Field>
                                        </fieldset>

                                        <fieldset className="box box-fieldset">
                                            <label htmlFor="desc">Neighborhood:</label>
                                                <Field
                                                    as="select"
                                                    name="neighborhood_id"
                                                    className="nice-select country-code"
                                                    onChange={(e) => {
                                                        const selectedNeighborhood = e.target.value;
                                                        setFieldValue("neighborhood_id", selectedNeighborhood);
                                                        handleNeighborhoodChange(selectedNeighborhood);
                                                    }}
                                                    value={propertyDetail.neighborhood || values.neighborhood_id || ""}
                                                >
                                                <option value="">Select Neighborhood</option>
                                                {neighborhoodList && neighborhoodList.length > 0 ? (
                                                    neighborhoodList.map((neighborhoods) => (
                                                        <option key={neighborhoods.id} value={neighborhoods.id}>
                                                            {neighborhoods.neighborhood_name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    propertyDetail?.neighborhood && (
                                                        <option value={propertyDetail.neighborhood}>
                                                            {propertyDetail.neighborhood}
                                                        </option>
                                                    )
                                                )}
                                            </Field>
                                        </fieldset>

                                    </div>
                                    <div className="box box-fieldset">
                                        <PropertyMapMarker
                                            latitude={propertyMapCoords.latitude}
                                            longitude={propertyMapCoords.longitude}
                                            zoom={propertyMapCoords.zoom}
                                            address={propertyDetail.address}
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
                    </Form>

                )}
            </Formik>
			</LayoutAdmin >
		</>
            )}
        </>
  );
}