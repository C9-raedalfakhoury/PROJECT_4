/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../admin/AdminDashBoard.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
const AdminDashboard = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [addProduct, setAddProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [categoryDetail, setCategoryDetail] = useState({});
  const [updateDetail, setUpdateDetail] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [allUser, setAllUser] = useState([]);
  console.log(productDetail);
  const getAllProduct = async () => {
    try {
      const result = await axios.get(`https://smart-shopper-19vo.onrender.com/products`);
      const data = await result.data;
      console.log(data.products);
      setAllProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  const handlUpdate = async (itemId) => {
    try {
      const result = await axios.put(
        `https://smart-shopper-19vo.onrender.com/products/${itemId}/update`,
        updateDetail
      );
      console.log(result.data);

      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (itemId) => {
    try {
      const result = await axios.delete(
        `https://smart-shopper-19vo.onrender.com/admin/${itemId}/products/delete`
      );
      console.log(result.data);

      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const result = await axios.get("https://smart-shopper-19vo.onrender.com/category/all");
      const data = await result.data;
      setAllCategory(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllUser = async () => {
    try {
      const result = await axios.get("https://smart-shopper-19vo.onrender.com/users/");
      const data = await result.data;
      setAllUser(data.user);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Smart_Shopper");
    data.append("cloud_name", "dv4vcdrz3");
    fetch("  https://api.cloudinary.com/v1_1/dv4vcdrz3/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCategory = async (itemId) => {
    try {
      const result = await axios.delete(
        `https://smart-shopper-19vo.onrender.com/category/${itemId}/delete`
      );
      console.log(result.data);

      getAllCategory();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = async (itemId) => {
    try {
      const result = await axios.delete(
        `https://smart-shopper-19vo.onrender.com/admin/${itemId}/delete`
      );

      getAllUser();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    getAllUser();
  }, []);
  return (
    // {edit style}
    <div className="mainAdmin">
      <div className="adminNavBar">
        <input
          type="button"
          value="Add Product"
          onClick={() => {
            setAddProduct(!addProduct);
            setUpdateProduct(false);
            setDeleteProduct(false);
            setAddCategory(false);
            setDeleteCategory(false);
            setDeleteUser(false);
          }}
        ></input>
        <input
          type="button"
          value="Update Product"
          onClick={() => {
            setUpdateProduct(!updateProduct);
            setAddProduct(false);
            setDeleteProduct(false);
            setAddCategory(false);
            setDeleteCategory(false);
            setDeleteUser(false);
          }}
        ></input>

        <input
          onClick={() => {
            setDeleteProduct(!deleteProduct);
            setAddProduct(false);
            setAddCategory(false);
            setDeleteCategory(false);
            setDeleteUser(false);
            setUpdateProduct(false);
          }}
          type="button"
          value="Delete Product"
        ></input>
        <input
          onClick={() => {
            setAddCategory(!addCategory);
            setDeleteProduct(false);
            setAddProduct(false);
            setDeleteCategory(false);
            setDeleteUser(false);
            setUpdateProduct(false);
          }}
          type="button"
          value="Add Category"
        ></input>
        <input
          type="button"
          value="Delete Category"
          onClick={() => {
            setDeleteCategory(!deleteCategory);
            setAddCategory(false);
            setDeleteProduct(false);
            setAddProduct(false);
            setDeleteUser(false);
            setUpdateProduct(false);
          }}
        ></input>
        <input
          type="button"
          value="Delete User"
          onClick={() => {
            setDeleteUser(!deleteUser);
            setDeleteCategory(false);
            setAddCategory(false);
            setDeleteProduct(false);
            setAddProduct(false);
            setUpdateProduct(false);
          }}
        ></input>
      </div>

      {addProduct ? (
        <form className="addProductDiv">
          <input
            onChange={(e) => {
              setProductDetail((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
            className="input"
            placeholder="Product Name"
          ></input>
          <input
            onChange={(e) => {
              setProductDetail((prev) => {
                return {
                  ...prev,
                  rate: e.target.value,
                };
              });
            }}
            className="input"
            placeholder="rate ⭐"
          ></input>
          <input
            onChange={(e) => {
              setProductDetail((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
            className="input"
            placeholder="description"
          ></input>
          <input
            onChange={(e) => {
              setProductDetail((prev) => {
                return {
                  ...prev,
                  price: e.target.value,
                };
              });
            }}
            className="input"
            placeholder="price"
          ></input>

          <input
            onChange={(e) => {
              setProductDetail((prev) => {
                return {
                  ...prev,
                  imageUrl: e.target.value,
                };
              });
            }}
            className="input"
            placeholder="imageUrl"
          ></input>
          <div>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            <button onClick={uploadImage()}>Upload</button>
          </div>
          <input
            onChange={(e) => {
              setProductDetail((prev) => {
                return {
                  ...prev,
                  category: e.target.value,
                };
              });
            }}
            className="input"
            placeholder="Category Id"
          ></input>
          <button
            className="Btn"
            onClick={async (e) => {
              try {
                const result = await axios.post(
                  "https://smart-shopper-19vo.onrender.com/products/addProduct",
                  productDetail
                );
                console.log(result);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "add product succesfully",
                  showConfirmButton: false,
                  timer: 1000,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Add Product
          </button>
        </form>
      ) : null}
      {deleteProduct ? (
        <div className="allProduct">
          {allProduct?.map((item, i) => {
            console.log(item);
            return (
              <div className="oneProductCardAdmin" key={i}>
                <img id="imgAdmin" alt="" src={item?.imageUrl}></img>
                <p className="itemNameAdmin">{item?.name}</p>
                <div className="iconPrice">
                  <MdDeleteForever
                    className="iconRabesh"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDelete(item._id);
                          Swal.fire({
                            title: "Deleted!",
                            text: "Product has been deleted.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000,
                          });
                        }
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {updateProduct ? (
        <div className="allProduct">
          {allProduct?.map((item, i) => {
            console.log(item);
            return (
              <div className="oneProductCardAdmin" key={i}>
                <img id="imgAdmin" alt="" src={item?.imageUrl}></img>
                <div className="edit">
                  <p className="itemNameAdmin">{item?.name}</p>
                  <input
                    style={{
                      display: toggleEdit ? "block" : "none",
                    }}
                    placeholder="EditName"
                    onChange={(e) => {
                      setUpdateDetail((prev) => {
                        return {
                          ...prev,
                          name: e.target.value,
                        };
                      });
                    }}
                  ></input>
                </div>
                <div className="edit">
                  <p className="itemNameAdmin">{item?.price} $</p>

                  <input
                    style={{
                      display: toggleEdit ? "block" : "none",
                    }}
                    placeholder="EditPrice"
                    onChange={(e) => {
                      setUpdateDetail((prev) => {
                        return {
                          ...prev,
                          price: e.target.value,
                        };
                      });
                    }}
                  ></input>
                </div>
                <div className="iconPrice">
                  <MdEdit
                    className="iconRabesh"
                    onClick={() => {
                      setToggleEdit(!toggleEdit);
                    }}
                    onDoubleClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, update it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handlUpdate(item._id);
                          Swal.fire({
                            title: "Edit!",
                            text: "Product has been updated.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000,
                          });
                        }
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {addCategory ? (
        <form className="addProductDiv">
          <input
            onChange={(e) => {
              setCategoryDetail((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
            className="input"
            placeholder="Category Name"
          ></input>
          <input
            onChange={(e) => {
              setCategoryDetail((prev) => {
                return {
                  ...prev,
                  imageUrl: e.target.value,
                };
              });
            }}
            className="input"
            placeholder="imageUrl"
          ></input>
          <button
            className="Btn"
            onClick={async () => {
              try {
                const result = await axios.post(
                  "https://smart-shopper-19vo.onrender.com/category",
                  categoryDetail
                );
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "add Category succesfully",
                  showConfirmButton: false,
                  timer: 1000,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Add Category
          </button>
        </form>
      ) : null}
      {deleteCategory ? (
        <div className="allProduct">
          <div id="navcategory">
            <h5>Image</h5>
            <h5>Category Name</h5>
            <h5>Category Id</h5>
            <h5>Remove</h5>
          </div>
          {allCategory?.map((item, i) => {
            console.log(item);
            return (
              <div className="oneProductCardAdmin" key={i}>
                <img id="imgAdmin" alt="" src={item?.imageUrl}></img>
                <p className="itemName">{item?.name}</p>
                <p className="itemPrice">{item?._id}</p>
                <div className="iconPrice">
                  <p className="itemRate">{item?.rate}</p>
                  <MdDeleteForever
                    className="iconRabesh"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDeleteCategory(item._id);
                          Swal.fire({
                            title: "Deleted!",
                            text: "Product has been deleted.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000,
                          });
                        }
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {deleteUser ? (
        <div className="allProduct">
          {allUser?.map((item, i) => {
            console.log(item);
            return (
              <div className="deleteUser" key={i}>
                <p className="itemName">User Name : {item?.userName}</p>
                <p className="itemPrice">Email : {item?.email}</p>
                <div className="iconPrice">
                  <p className="itemRate">{item?.rate}</p>
                  <MdDeleteForever
                    className="iconRabesh"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDeleteUser(item._id);
                          Swal.fire({
                            title: "Deleted!",
                            text: "user has been deleted.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000,
                          });
                        }
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default AdminDashboard;
