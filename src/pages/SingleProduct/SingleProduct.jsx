import { useParams } from "react-router-dom";
import "./SingleProduct.scss";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleProduct = ({ products, addToCartQty, categories, brands }) => {
  const [quantity, setQuantity] = useState(1);
  const [productName, setProductName] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    product &&
      setTimeout(() => {
        setProductName(product.data.title);
        setProductImg(product.data.image);
        setProductPrice(product.data.price);
        setProductCategory(category.data.name);
        setProductBrand(brand.data.name);
      }, 0);
  });
  // change quantity
  const increaseQty = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQty = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    }
  };
  // get product id from url
  const { productId } = useParams();
  // get product
  const product = products.find((product) => product.id === productId);
  // get category
  const category =
    product &&
    categories.find((category) => category.id === product.data.category_id);
  // get brand
  const brand =
    product && brands.find((brand) => brand.id === product.data.brand_id);

  return (
    <>
      <section className="single-product-section" style={{ paddingTop: 140 }}>
        <div className="single-product-container">
          <div className="single-product-left">
            <div className="img">
              {productImg ? (
                <img src={productImg} alt="" />
              ) : (
                <Skeleton height={390} />
              )}
            </div>
          </div>
          <div className="single-product-right">
            <h3>{productName || <Skeleton count={2} height={23} />}</h3>
            <div className="detail-box">
              <p>
                Th????ng hi???u:{" "}
                <span>
                  {productBrand || <Skeleton height={17} width={100} />}
                </span>
              </p>

              <p>
                Lo???i{" "}
                <span>
                  {productCategory || <Skeleton height={18} width={100} />}
                </span>
              </p>
              <div className="rate">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i> (0 ????nh gi??)
              </div>
              <h5 className="price">
                {productPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }) || <Skeleton height={34} width={200} />}
              </h5>
            </div>
            <div className="quantity-box">
              <button
                className="descrease-value-btn btn"
                onClick={() => decreaseQty()}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <div className="quantity-value">{quantity}</div>
              <button
                className="increase-value-btn btn"
                onClick={() => increaseQty()}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <button
              className="add-to-cart-btn btn"
              onClick={() => addToCartQty(product, quantity)}
            >
              Ch???n mua
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
