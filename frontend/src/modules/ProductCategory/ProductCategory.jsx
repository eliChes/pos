import React, { useState } from "react";
import _Sidebar from "../Sidebar/_Sidebar";
import "../styles/product-category.css";
import noData from "../../assets/icon/no-data.png";
import sample from "../../assets/image/posImg.jpg";
import { Button, Modal } from "react-bootstrap";
import swal from "sweetalert";
const ProductCategory = () => {
  // For Side Bar
  const menuLinks = [
    { to: "/Menu", icon: "bx-arrow-back", label: "Menu" },
    { to: "/ProductsData", icon: "bx-package", label: "Products Data" },
    {
      to: "/ArchiveProducts",
      icon: "bx-archive-in",
      label: "Archive Products",
    },
    {
      to: "/ApplyPromotion",
      icon: "bx-purchase-tag",
      label: "Apply Promotion",
    },
  ];

  const categories = ["Beer", "Shampoo"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  //   Add Category Modal
  const handleCloseCategoryModal = () => setShowAddCategoryModal(false);
  const [addCategory, setAddCategory] = useState("");
  const handleShowCategoryModal = () => setShowAddCategoryModal(true);

  //   Edit Category Modal
  const handleCloseEditCategoryModal = () => setShowEditCategoryModal(false);
  const [editCategory, setEditCategory] = useState("");
  const handleShowEditCategoryModal = (category) => {
    setShowEditCategoryModal(true);
    setEditCategory(category);
  };

  //   Show error
  const [errorCategoryExists, setErrorCategoryExists] = useState(true); //Tinrue ko muna to sir para kita

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);

  //   Edit Products
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [editProducts, setEditProducts] = useState(null);

  const handleEditProducts = (product) => {
    setShowEditProduct(true);
    setShowAddProduct(false);
    setEditProducts(product);
  };

  //Function for Adding Category
  const handleAddCategory = () => {
    swal({
      text: "The category has been saved!",
      icon: "success",
      button: "OK",
    });
    handleCloseCategoryModal();
  };
  // Function for Editing Category
  const handleEditCategory = () => {
    swal({
      text: "Updated!",
      icon: "success",
      button: "OK",
    });
    handleCloseEditCategoryModal();
  };

  //   Function for Deleting Category

  const handleDeleteCategory = () => {
    swal({
      text: "Are your sure you want to delete this category?",
      icon: "warning",
      buttons: {
        cancel: "No",
        confirm: "Yes",
      },
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        swal({
          title: "Deleted",
          text: "The category has been deleted",
          icon: "success",
        }).then(() => {
          handleCloseEditCategoryModal();
        });
      } else {
        swal.close();
      }
    });
  };

  const handleCategoryChange = (selectedCategory) => {
    setEditProducts({
      ...editProducts,
      category: selectedCategory,
    });
  };
  const products = [
    {
      img: sample,
      productName: "Palmolive Cream Silk",
      sku: "100013",
      price: 50.25,
      category: "Shampoo",
      quantity: 10,
      description: "Pang ligo",
    },
    {
      img: sample,
      productName: "Kopiko Blanca",
      sku: "100014",
      price: 50.75,
      category: "Coffee",
    },
  ];
  const filteredProducts = products.filter(
    (product) => product.category == selectedCategory
  );
  return (
    <>
      <_Sidebar links={menuLinks} />

      <div
        className="product-container"
        style={showAddProduct ? {} : { height: "100vh" }}
      >
        {/* Category Container */}
        <div className="category-container">
          <div className="title-container">
            <h4>Category</h4>
            <div className="add-container">
              <button
                className="btn btn-outline-primary"
                onClick={handleShowCategoryModal}
              >
                Add
              </button>
            </div>
          </div>
          {categories.length === 0 ? (
            <div className="category-list-container d-flex justify-content-center">
              <div className="no-data-container">
                <img src={noData} />
                <h2>No Data</h2>
              </div>
            </div>
          ) : (
            categories.map((category) => (
              <>
                <div
                  className={`category-list-container ${
                    category === selectedCategory ? "selected" : ""
                  }`}
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="category-list">
                    <h3>{category}</h3>
                    <i
                      className="bx bx-edit-alt"
                      onClick={() => handleShowEditCategoryModal(category)}
                    ></i>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
        {/* End of Category Container */}
        {/* Products container */}
        <div className="products-container">
          <div className="product-title-container">
            <h4>Products</h4>
            <div className="product-search">
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control search"
                  placeholder="Search"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
            <div className="add-container">
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  setShowAddProduct(true);
                  setShowEditProduct(false);
                }}
              >
                Add
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-product-data-container d-grid justify-content-center">
              <img src={noData} alt="No Data" />
              <h2>No Products Found</h2>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div
                className="product-list-container"
                key={index}
                onClick={() => handleEditProducts(product)}
              >
                <div className="product-list">
                  <div className="product-details-container">
                    <img src={product.img} alt={product.productName} />
                    <div className="product-details">
                      <h2>{product.productName}</h2>
                      <span>{product.sku}</span>
                    </div>
                  </div>
                  <div className="product-price">₱{product.price}</div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* End of Producs container */}
        {/* Add Product Container */}
        {showAddProduct && !showEditProduct ? (
          <div className="add-product-container">
            <div className="title-container">
              <h4>Add Product</h4>
            </div>
            <hr />
            <div className="add-input-container">
              {/* Category */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Category:
                </p>
                <select class="form-select" aria-label="Default select example">
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {/* SKU */}
              <div className="product-input-container">
                <p>
                  <span>*</span> SKU:
                </p>

                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    required
                  />
                </div>
              </div>
              {/* Name */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Name:
                </p>

                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    required
                  />
                </div>
              </div>
              {/* Price */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Price:
                </p>

                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    required
                  />
                </div>
              </div>
              {/* Quantity */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Quantity:
                </p>

                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
              {/* Description */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Description:
                </p>

                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "80px" }}
                    required
                  ></textarea>
                  <label for="floatingTextarea2">Comments</label>
                </div>
              </div>
            </div>
            <hr />
            <div className="upload-product-img">
              <h5>Upload Product Image:</h5>
              <div className="upload-btn">
                <i className="bx bx-image-add"></i>
                <div className="upload-btn-container">
                  <input type="file" id="upload-btn" />
                  <button
                    id="custom-btn"
                    onClick={() =>
                      document.getElementById("upload-btn").click()
                    }
                  >
                    Upload Files
                  </button>
                </div>
              </div>
            </div>

            <div className="save-btn-container">
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowAddProduct(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        ) : null}

        {showEditProduct && !showAddProduct ? (
          <div className="add-product-container">
            <div className="title-container">
              <h4>Edit Product</h4>
            </div>
            <hr />
            <div className="add-input-container">
              {/* Category */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Category:
                </p>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={editProducts ? editProducts.category : ""}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {/* SKU */}
              <div className="product-input-container">
                <p>
                  <span>*</span> SKU:
                </p>

                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    required
                    value={editProducts ? editProducts.sku : ""}
                  />
                </div>
              </div>
              {/* Name */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Name:
                </p>

                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    required
                    value={editProducts ? editProducts.productName : ""}
                  />
                </div>
              </div>
              {/* Price */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Price:
                </p>

                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    required
                    value={editProducts ? editProducts.price : ""}
                  />
                </div>
              </div>
              {/* Quantity */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Quantity:
                </p>

                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={editProducts ? editProducts.quantity : ""}
                  />
                </div>
              </div>
              {/* Description */}
              <div className="product-input-container">
                <p>
                  <span>*</span> Description:
                </p>

                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "80px" }}
                    required
                    value={editProducts ? editProducts.description : ""}
                  ></textarea>
                  <label for="floatingTextarea2">Comments</label>
                </div>
              </div>
            </div>
            <hr />
            <div className="upload-product-img">
              <h5>Upload Product Image:</h5>
              <div className="upload-btn">
                <i className="bx bx-image-add"></i>
                <div className="upload-btn-container">
                  <input type="file" id="upload-btn" />
                  <button
                    id="custom-btn"
                    onClick={() =>
                      document.getElementById("upload-btn").click()
                    }
                  >
                    Upload Files
                  </button>
                </div>
              </div>
            </div>

            <div className="save-btn-container">
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowAddProduct(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        ) : null}

        {/* End of Add Product Container */}
      </div>

      {/* Modal for Add Category */}
      <Modal
        show={showAddCategoryModal}
        onHide={handleCloseCategoryModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Add Category</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-category d-flex align-items-center justify-content-center">
            <p>Category Name:</p>
            <div class="input-group mb-3 w-50 ms-5">
              <input
                type="text"
                className="form-control"
                placeholder="Soda"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={addCategory}
                onChange={(e) => setAddCategory(e.target.value)}
              />
            </div>
          </div>
          {errorCategoryExists ? (
            <span className="category-error error">
              The category already exists
            </span>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleCloseCategoryModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Edit Category */}
      <Modal
        show={showEditCategoryModal}
        onHide={handleCloseEditCategoryModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Edit Category</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-category d-flex align-items-center justify-content-center">
            <p>Category Name:</p>
            <div class="input-group mb-3 w-50 ms-5">
              <input
                type="text"
                className="form-control"
                placeholder="Soda"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
            </div>
          </div>
          {errorCategoryExists ? (
            <span className="category-error error">
              The category already exists
            </span>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteCategory}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleEditCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCategory;
