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
import variablesList from "../../components/common/variable";
import { Pagination } from "@/components/layout/pagination";
export default function ProjectAmenitiesListing() {
  const [cities, setCities] = useState([]); // Store properties for the current page
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state
  const [searchTerm, setSearchTerm] = useState(''); // Store search input
  const [statusFilter, setStatusFilter] = useState(''); // Store selected status filter
  const [pagination, setPagination] = useState({
      totalCount: 0,
      totalPages: 0,
      currentPage: variablesList.currentPage,
      itemsPerPage: variablesList.itemsPerPage,
  }); // Track pagination info
  const [currentPage, setCurrentPage] = useState(1);
  const fetchStates = async (page = variablesList.currentPage, term = '', status = '') => {
    setLoading(true);
    try {
      const requestData = {
        page,
        limit: pagination.itemsPerPage,
        lang: "en",
        searchTerm: term,
      };

      const response = await insertData("api/city/", requestData, true);
      if (response.status) {
        const { cities, totalCount, totalPages, currentPage } = response.data;
        setCities(cities);
        setPagination({
          ...pagination,
          totalCount,
          totalPages,
          currentPage,
        });
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates(pagination.currentPage, searchTerm, statusFilter);
  }, [pagination.currentPage, searchTerm, statusFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination({ ...pagination, currentPage: 1 }); // Reset to first page on search
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination({ ...pagination, currentPage: 1 }); // Reset to first page on filter
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await deletedData(`api/city/delete`, { city_id: id });
      console.log(response);
      if (response.status) {
        fetchStates(pagination.currentPage, searchTerm, statusFilter);
      } else {
        alert(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page }); // Update the current page
  };
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <DeleteFile />
          <LayoutAdmin>
            <div className="wrap-dashboard-content">
              <div className="widget-box-2 wd-listing">
                <div class="top d-flex justify-content-between align-items-center">
                  <h6 className="title">Cities Listing</h6>
                  <Link className="remove-file tf-btn primary" href="/create-city">Add City</Link>
                </div>
                {cities.length > 0 ? (
                  <>
                    <div className="wrap-table">
                      <div className="table-responsive">
                        <table>
                          <thead>
                            <tr>
                                <th>Name</th>
                                <th>State Name</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Date Published</th>
                                <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cities.map((property) => (
                             <tr key={property.id} className="file-delete">
                             <td>{property.city_name}</td>
                             <td>{property.state.state_name}</td>
                             <td>
                               {property.latitude}
                             </td>
                             <td> {property.longitude}</td>
                             <td>{new Date(property.created_at).toLocaleDateString()}</td>
                             <td>
                               <ul className="list-action">
                               <li className="edit">
                                        <Link href={`/edit-city/${property.id}`} className="item">
                                          <Image 
                                            src={EditIcon} // Imported image object or static path
                                            alt="Edit icon" 
                                            width={25} 
                                            height={25} 
                                          />
                                        </Link>
                                 </li>
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
                      <Pagination totalPages={pagination.totalPages} currentPage={pagination.currentPage} onPageChange={handlePageChange} />
                      {/* <ul className="wd-navigation">
                        {Array.from({ length: pagination.totalPages }, (_, index) => (
                          <li key={index}>
                            <Link
                              href="#"
                              className={`nav-item ${pagination.currentPage === index + 1 ? 'active' : ''}`}
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </Link>
                          </li>
                        ))}
                      </ul> */}
                    </div>
                  </>
                ) : (
                  <div>No records found</div>
                )}
              </div>
            </div>
          </LayoutAdmin>
        </>
      )}
    </>
  );
}
