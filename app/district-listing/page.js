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

export default function ProjectAmenitiesListing() {
  const [districts, setDistricts] = useState([]); // Store properties for the current page
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

  const fetchDistricts = async (page = variablesList.currentPage, term = '', status = '') => {
    setLoading(true);
    try {
      const requestData = {
        page,
        limit: pagination.itemsPerPage,
        lang: "en",
        searchTerm: term,
      };

      const response = await insertData("api/district", requestData, true);
      if (response.status) {
        const { districts, totalCount, totalPages, currentPage } = response.data;
        setDistricts(districts);
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
    fetchDistricts(pagination.currentPage, searchTerm, statusFilter);
  }, [pagination.currentPage, searchTerm, statusFilter]);

 
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await deletedData(`api/district/delete`, { district_id: id });
      console.log(response);
      if (response.status) {
        fetchDistricts(pagination.currentPage, searchTerm, statusFilter);
      } else {
        alert(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
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
                <h6 className="title">Districts Listing</h6>
                <Link className="remove-file tf-btn primary" href="/create-district">Add Districts</Link>
              </div>
                {districts.length > 0 ? (
                  <>
                    <div className="wrap-table">
                      <div className="table-responsive">
                        <table>
                          <thead>
                            <tr>
                                <th>Name</th>
                                <th>City Name</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Date Published</th>
                                <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {districts.map((property) => (
                             <tr key={property.id} className="file-delete">
                             <td>{property.district_name}</td>
                             <td>{property.city.city_name}</td>
                             <td>
                               {property.latitude}
                             </td>
                             <td> {property.longitude}</td>
                             <td>{new Date(property.created_at).toLocaleDateString()}</td>
                             <td>
                               <ul className="list-action">
                               <li className="edit">
                                        <Link href={`/edit-district/${property.id}`} className="item">
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
                      <ul className="wd-navigation">
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
                      </ul>
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
