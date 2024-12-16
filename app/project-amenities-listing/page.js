'use client';

import DeleteFile from "@/components/elements/DeleteFile";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import Link from "next/link";
import { insertData, deletedData } from "../../components/api/Axios/Helper";
import Preloader from "@/components/elements/Preloader";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import EditIcon from "../../public/images/favicon/edit.png";
import DeleteIcon from "../../public/images/favicon/delete.png";
export default function ProjectAmenitiesListing() {
  const [properties, setProperties] = useState([]); // Store all fetched properties
  const [filteredPropertysofamenities, setfilteredPropertysofamenities] = useState([]); // Store filtered properties
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state
  const [searchTerm, setSearchTerm] = useState(''); // Store search input
  const [statusFilter, setStatusFilter] = useState(''); // Store selected status filter
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const type = { page: 1, limit: 100 };
        const getUserInfo = await insertData('api/project-type-listings', type, true);
        console.log(getUserInfo);
        setProperties(getUserInfo.data.list); // Save all properties
        setfilteredPropertysofamenities(getUserInfo.data.list); // Initially display all properties
        setLoading(false); // Stop loading
        setError(null); // Clear errors
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred'); // Handle error
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  useEffect(() => {
    filterAndPaginateData(); // Apply filter and pagination whenever inputs change
  }, [searchTerm, statusFilter, currentPage, properties]);

  // Filter and paginate properties
  const filterAndPaginateData = () => {
    let filtered = properties;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(property => property.status === statusFilter);
    }

    // Paginate results
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

    setfilteredPropertysofamenities(paginated);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const data = { id: id };
      const deleteUserInfo = await deletedData(`api/project-type-listings/${id}`, data);
      if(deleteUserInfo.status){
        const filteredData = filteredPropertysofamenities.filter((item) => item.id !== id);
        setProperties(filteredData); // Save all properties
        setfilteredPropertysofamenities(filteredData); // Initially display all properties
        setLoading(false); // Stop loading
        setError(null); // Clear errors
      }else{
        alert(deleteUserInfo.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred'); // Handle error
      setLoading(false); // Stop loading
    }
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter
  };
  console.log(filteredPropertysofamenities);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <DeleteFile />
          <LayoutAdmin>
            <div className="wrap-dashboard-content">
              {/* <div className="row">
                <div className="col-md-3">
                  <fieldset className="box-fieldset">
                    <label htmlFor="status">Post Status:<span>*</span></label>
                    <select className="nice-select" onChange={handleStatusChange}>
                      <option value="">Select</option>
                      <option value="Published">Publish</option>
                      <option value="Pending">Pending</option>
                      <option value="Hidden">Hidden</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </fieldset>
                </div>
                <div className="col-md-9">
                  <fieldset className="box-fieldset">
                    <label htmlFor="search">Search by Title:<span>*</span></label>
                    <input
                      type="text"
                      className="form-control style-1"
                      placeholder="Search by title"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </fieldset>
                </div>
              </div> */}

              <div className="widget-box-2 wd-listing">
                <h6 className="title">Project Aminities Listing</h6>
                  {(filteredPropertysofamenities.length > 0)?
                    <>
                      <div className="wrap-table">
                        <div className="table-responsive">
                          <table>
                            <thead>
                              <tr>
                                {/* <th>Image</th> */}
                                <th>Title</th>
                                <th>Price / Transaction</th>
                                <th>Date Published</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPropertysofamenities.map(property => (
                                <tr key={property.id} className="file-delete">
                                  {/* <td>
                                    <div className="listing-box">
                                      <div className="images">
                                        <img src={property.icon || '/images/avatar/user-image.png'} alt="images" />
                                      </div>
                                    </div>
                                  </td> */}
                                  <td>{property.name}</td>
                                  <td>
                                    {property.type}
                                  </td>
                                  <td>{new Date(property.created_at).toLocaleDateString()}</td>
                                  <td>
                                    <div className="status-wrap">
                                      <Link href="#" className="btn-status">{property.status? 'Active':'Inactive'}</Link>
                                    </div>
                                  </td>
                                  <td>
                                    <ul className="list-action">
                                      {/* <li className="edit">
                                        <Link href={`/edit-agency/${property.id}`} className="item">
                                          <Image 
                                            src={EditIcon} // Imported image object or static path
                                            alt="Edit icon" 
                                            width={25} 
                                            height={25} 
                                          />
                                        </Link>
                                      </li> */}
                                      <li className="delete">
                                        <a className="remove-file item" onClick={() => handleDelete(property.id)}>
                                          <Image 
                                              src={DeleteIcon} // Imported image object or static path
                                              alt="Delete icon" 
                                              width={25} 
                                              height={25} 
                                            />
                                        </a>
                                      </li>                                        
                                    </ul>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <ul className="wd-navigation">
                          {[...Array(Math.ceil(properties.length / itemsPerPage))].map((_, index) => (
                            <li key={index}>
                              <Link
                                href="#"
                                className={`nav-item ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index + 1)}
                              >
                                {index + 1}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>:<>
                      <div className="wrap-table">
                        <div className="table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>User name</th>
                                <th>Date Published</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>No Record Found</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  }
                
              </div>
            </div>
          </LayoutAdmin>
        </>
      )}
    </>
  );
}
