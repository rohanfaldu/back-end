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
import ViewIcon from "../../public/images/favicon/view.png";
import variablesList from "../../components/common/variable";

export default function ProjectListing() {
  const [properties, setProperties] = useState([]); // Store properties for the current page
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

  const fetchProperties = async (page = variablesList.currentPage, term = '', status = '') => {
    setLoading(true);
    try {
      const requestData = {
        page,
        limit: pagination.itemsPerPage,
        lang: "en",
        searchTerm: term,
        status,
      };

      const response = await insertData("api/projects", requestData, true);
      console.log(response);
      if (response.status) {
        const { projects, totalCount, totalPages, currentPage } = response.data;
        setProperties(projects);
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
    fetchProperties(pagination.currentPage, searchTerm, statusFilter);
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
      const response = await deletedData(`api/projects/${id}`, { propertyId: id });
      console.log(response);
      if (response.status) {
        fetchProperties(pagination.currentPage, searchTerm, statusFilter);
      } else {
        alert(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleView = (id) => {
    const URL = `${process.env.NEXT_PUBLIC_SITE_URL}/property/${id}`;
      window.open(URL, '_blank')
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
                  <h6 className="title">Project Listing</h6>
                  <Link className="remove-file tf-btn primary" href="/create-project">Add Project</Link>
                </div>
                {properties.length > 0 ? (
                  <>
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
                            {properties.map((property) => (
                              <tr key={property.id} className="file-delete">
                              <td>
                                <div className="listing-box">
                                  <div className="images">
                                    <img src={property.picture || '/images/avatar/user-image.png'} alt="images" />
                                  </div>
                                </div>
                              </td>
                              <td>{property.title}</td>
                              <td>
                                {property.user_name}
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
                                    <Link href={`/edit-project/${property.id}`} className="item">
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
                                  {/* <li className="delete">
                                    <a
                                      className="remove-file item"
                                      onClick={() => handleView(property.id)}
                                      style={{ border: 'none', background: 'transparent', padding: 0 }}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Image
                                        src={ViewIcon} // Imported image object or static path
                                        alt="View icon"
                                        width={25}
                                        height={25}
                                      />
                                    </a>
                                  </li> */}
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
