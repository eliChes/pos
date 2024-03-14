import React, {useEffect, useState} from 'react';
import '../../assets/global/style.css';
import '../styles/react-style.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import axios from "axios";
import BASE_URL from "../../assets/global/url";

import {
    MagnifyingGlass,
    Gear, 
    Bell,
    UserCircle,
    Plus,
    Trash,
    NotePencil,
    DotsThreeCircle
  } from "@phosphor-icons/react";

function ExtraOptionList() {
    const [ExtraOption, setExtraOption] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleUpdateClose = () => setUpdateModalShow(false);
    const handleShow = () => setShow(true);
    const [updateModalShow, setUpdateModalShow] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [rotatedIcons, setRotatedIcons] = useState(
        Array(ExtraOption.length).fill(false)
      );
    const [validated, setValidated] = useState(false);

    const [updateFormData, setUpdateFormData] = useState({
        extraOptionId: "",
        name: "",
        limit_quantity: "",
      });

    const toggleDropdown = (event, index) => {
        // Check if the clicked icon is already open, close it
        if (index === openDropdownIndex) {
          setRotatedIcons((prevRotatedIcons) => {
            const newRotatedIcons = [...prevRotatedIcons];
            newRotatedIcons[index] = !newRotatedIcons[index];
            return newRotatedIcons;
          });
          setShowDropdown(false);
          setOpenDropdownIndex(null);
        } else {
          // If a different icon is clicked, close the currently open dropdown and open the new one
        //   setRotatedIcons(Array(Manufacturer.length).fill(false));
          const iconPosition = event.currentTarget.getBoundingClientRect();
          setDropdownPosition({
            top: iconPosition.bottom + window.scrollY,
            left: iconPosition.left + window.scrollX,
          });
          setRotatedIcons((prevRotatedIcons) => {
            const newRotatedIcons = [...prevRotatedIcons];
            newRotatedIcons[index] = true;
            return newRotatedIcons;
          });
          setShowDropdown(true);
          setOpenDropdownIndex(index);
        }
      };

      const [name, setName] = useState();
      const [limitQuantity, setLimitQuantity] = useState();
      const [chooseOneOption, setChooseOneOption] = useState(false);

      const handleRadioChange = (event) => {
        setChooseOneOption(event.target.value === 'yes');
      };

//--------------------------------Extra option list fetch---------------------------------//
useEffect(() => {
    axios
      .get(BASE_URL + "/extraOption/getExtraOption")
      .then((res) => setExtraOption(res.data))
      .catch((err) => console.log(err));
  }, []);

  const reload_table_membership_type = () =>  {
    axios.get(BASE_URL + "/extraOption/getExtraOption")
      .then(res => {
        setExtraOption(res.data);
      })
      .catch(err => console.log(err));
  }
//--------------------------------End Extra option list fetch---------------------------------//

//--------------------------------Valdidations---------------------------------//
const SuccessInserted = (res) => {
    swal({
      title: "Created New Extra option",
      text: "The Extra option has been added successfully",
      icon: "success",
      button: "OK",
    }).then(() => {
      const newId = res.data.id;
      // console.log(newId)
      setExtraOption((prev) => [
        ...prev,
        {
          membership_type_id: newId,
          name: res.data.name,
          limitQuantity: res.data.limitQuantity,
          createdAt: res.data.createdAt,
          updatedAt: res.data.updatedAt,
        },
      ]);

      setName(""); 
      setLimitQuantity("");
      setChooseOneOption("");

      setShow(false);
    });
  };
  const Duplicate_Message = () => {
    swal({
      title: "Extra option Name Already Exist",
      text: "Try other Extra option name",
      icon: "error",
      button: "OK",
    });
  };

  const ErrorInserted = () => {
    swal({
      title: "Something went wrong",
      text: "Please Contact our Support",
      icon: "error",
      button: "OK",
    });
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'chooseOneOption' && value === 'yes') {
      setChooseOneOption(true); // Set to true for "Yes"
    }
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
//--------------------------------End of Validations---------------------------------//

//--------------------------------Show Modal Update---------------------------------//
const handleModalToggle = (updateData = null) => {
    setUpdateModalShow(!updateModalShow);
    if (updateData) {
      setUpdateFormData({
        extraOptionId: updateData.extra_option_id,
        name: updateData.name,
        limit_quantity: updateData.limit_quantity,
      });
    } else {
      setUpdateFormData({
        name: "",
        description: "",
      });
    }
  };
//--------------------------------End Show Modal Update---------------------------------//

//--------------------------------Add Extra option---------------------------------//
const addExtraOption = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      swal({
        icon: "error",
        title: "Fields are required",
        text: "Please fill the red text fields",
      });
    } else {
      axios
        .post(`${BASE_URL}/extraOption/create`, {
          name: name,
          limitQuantity: limitQuantity,
          chooseOneOption: chooseOneOption,
        })
        .then((res) => {
          window.location.reload();
          console.log(res);
          if (res.status === 200) {
            SuccessInserted(res);
          } else if (res.status === 201) {
            Duplicate_Message();
          } else {
            ErrorInserted();
          }
        });
    }
    setValidated(true); //for validations
  };
//--------------------------------End Extra option---------------------------------//

//--------------------------------Update Extra option---------------------------------//
const updateExtraOption = async (e) => {
    e.preventDefault();

    if (!updateFormData.name) {
      swal({
        icon: "error",
        title: "Name is required",
        text: "Please enter a name before updating.",
      });
      return; // Prevent submission if the name is empty
    }

    try {
      const extraOptionId = updateFormData.extraOptionId;
      const response = await axios.put(
        BASE_URL + `/extraOption/update/${extraOptionId}`,
        {
            name: updateFormData.name,
            limitQuantity: updateFormData.limitQuantity,
        }
      );

      if (response.status === 200) {
        swal({
          title: "Update successful!",
          text: "The Extra option has been updated successfully.",
          icon: "success",
          button: "OK",
        }).then(() => {
          handleModalToggle();
          setExtraOption((prev) =>
            prev.map((data) =>
              data.membership_type_id === updateFormData.membership_type_id
                ? {
                    ...data,
                    name: updateFormData.name,
                    description: updateFormData.description,
                  }
                : data
            )
          );

          setUpdateFormData({
            name: "",
            description: "",
          });

          reload_table_membership_type();
        });
      } else if (response.status === 202) {
        swal({
          icon: "error",
          title: "Extra option has been already exists",
          text: "Please input another Extra option Name",
        });
      } else {
        swal({
          icon: "error",
          title: "Something went wrong",
          text: "Please contact our support",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
//--------------------------------End Update Extra option---------------------------------//

//--------------------------------Delete Extra option---------------------------------//
const handleDelete = async (extraOptionId) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this record file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        const response = await axios.delete(
          BASE_URL + `/extraOption/delete/${extraOptionId}`
        );

        if (response.status === 200) {
          swal({
            title: "Deleted Successful!",
            text: "The Extra option has been Deleted Successfully.",
            icon: "success",
            button: "OK",
          }).then(() => {
            setExtraOption((prev) => prev.filter((data) => data.id !== extraOptionId));
            setUpdateModalShow(false);
            reload_table_membership_type();
          });
        } else if (response.status === 202) {
          swal({
            icon: "error",
            title: "Delete Prohibited",
            text: "You cannot delete Extra option that is used",
          });
        } else {
          swal({
            icon: "error",
            title: "Something went wrong",
            text: "Please contact our support",
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      swal({
        title: "Cancelled",
        text: "Extra option not Deleted!",
        icon: "warning",
      });
    }
  });
};
//--------------------------------End Delete Extra option---------------------------------//


//--------------------------------Date Format---------------------------------//
    function formatDate(isoDate) {
    const date = new Date(isoDate);
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(
        date.getDate()
    )} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(
        date.getSeconds()
    )}`;
    }

    function padZero(num) {
    return num.toString().padStart(2, "0");
    }
//--------------------------------End Date Format---------------------------------//
  return (
    <div className="main-of-containers">
        <div className="right-of-main-containers">
            <div className="right-body-contents">
                <div className="settings-search-master">

                <div className="dropdown-and-iconics">
                    <div className="dropdown-side">

                    </div>
                    <div className="iconic-side">
                        <div className="gearsides">
                            <Gear size={35}/>
                        </div>
                        <div className="bellsides">
                            <Bell size={35}/>
                        </div>
                        <div className="usersides">
                            <UserCircle size={35}/>
                        </div>
                        <div className="username">
                          <h3>User Name</h3>
                        </div>
                    </div>
                </div>

                </div>
                <div className="Employeetext-button">
                    <div className="employee-and-button">
                        <div className="emp-text-side">
                            <p>Extra Options</p>
                        </div>

                        <div className="button-create-side">
                        <div className="Buttonmodal-new">
                        <button onClick={handleShow}>
                            <span style={{}}>
                            <Plus size={15} />
                            </span>
                            Add  New
                        </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="table-containss">
                    <div className="main-of-all-tables">
                        <table className='table-hover' id='order-listing'>
                                <thead>
                                <tr>
                                    <th className='tableh'>ID</th>
                                    <th className='tableh'>Name</th>
                                    <th className='tableh'>Limit Quantity</th>
                                    <th className='tableh'>Sub-Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                {ExtraOption.map((data, i) => (
                                    <tr key={i}>
                                    <td onClick={() => handleModalToggle(data)}>{data.extra_option_id}</td>
                                    <td onClick={() => handleModalToggle(data)}>{data.name}</td>
                                    <td onClick={() => handleModalToggle(data)}>{data.limit_quantity}</td>
                                    <td onClick={() => handleModalToggle(data)}>{formatDate(data.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

{/* ----------------------------------MODAL FOR CREATE---------------------------------------------------- */}
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg">
        <Form
          noValidate
          validated={validated}
          onSubmit={addExtraOption}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "24px" }}>
              Add New Extra Options
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: "18px" }}>Name: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    required
                    onChange={(e) => setName(e.target.value)}
                    style={{ height: "40px", fontSize: "15px" }}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: "18px" }}>Limit Quantity: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    required
                    onChange={(e) => setLimitQuantity(e.target.value)}
                    style={{ height: "40px", fontSize: "15px" }}
                  />
                </Form.Group>
              

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label style={{ fontSize: '18px' }}>Choose at least one option</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Yes"
                      type="radio"
                      id="yes"
                      name="chooseOneOptionYes"
                      value="yes"
                      checked={chooseOneOption}
                      onChange={handleRadioChange}
                    />
                    <Form.Check
                      inline
                      label="No"
                      type="radio"
                      id="no"
                      name="chooseOneOptionNo"
                      value="no"
                      checked={!chooseOneOption}
                      onChange={handleRadioChange}
                    />
                  </div>
                </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="warning"
              size="md"
              style={{ fontSize: "20px" }}>
              Save
            </Button>
            <Button
              variant="secondary"
              size="md"
              style={{ fontSize: "20px" }}
              onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* ---------------------------------- END MODAL FOR CREATE---------------------------------------------------- */}

      {/* ---------------------------------- MODAL FOR UPDATE---------------------------------------------------- */}
      <Modal
        show={updateModalShow}
        onHide={() => handleModalToggle()}
        backdrop="static"
        keyboard={false}
        size="lg">
        <Form
          noValidate
          validated={validated}
          onSubmit={updateExtraOption}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "24px" }}>
              Update Extra options 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: "18px" }}>Name: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="name"
                    required
                    value={updateFormData.name}
                    onChange={handleUpdateFormChange}
                    style={{ height: "40px", fontSize: "15px" }}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: "18px" }}>Limit Quantity: </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={updateFormData.limit_quantity}
                    style={{ height: "40px", fontSize: "15px" }}
                  />
                </Form.Group>              

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label style={{ fontSize: '18px' }}>Choose at least one option</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Yes"
                      type="radio"
                      id="yes"
                      name="chooseOneOptionYes"
                      value="yes"
                      checked={chooseOneOption}
                      onChange={handleRadioChange}
                    />
                    <Form.Check
                      inline
                      label="No"
                      type="radio"
                      id="no"
                      name="chooseOneOptionNo"
                      value="no"
                      checked={!chooseOneOption}
                      onChange={handleRadioChange}
                    />
                  </div>
                </Form.Group>
              
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="warning"
              size="md"
              style={{ fontSize: "20px" }}>
              Save
            </Button>
            <Button
              variant="secondary"
              size="md"
              style={{ fontSize: "20px" }}
              onClick={handleUpdateClose}>
              Close
            </Button>
            <Button
              variant="secondary"
              size="md"
              style={{ fontSize: "20px" }}
              onClick={() => handleDelete(updateFormData.extraOptionId)}>
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* ---------------------------------- END MODAL FOR UPDATE---------------------------------------------------- */}
    </div>
    
  )
}

export default ExtraOptionList
