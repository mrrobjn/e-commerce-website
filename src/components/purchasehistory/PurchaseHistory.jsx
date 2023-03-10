import "./PurchaseHistory.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";

const PurchaseHistory = ({ orders }) => {
  const [user, loading, error] = useAuthState(auth);
  const [orderWithUser, setOrderWithUser] = useState([]);
  const getOrderByUser = () => {
    // const orderRef = orders.filter((order) => order.data.user_id === user?.uid);
    // setOrderWithUser(orderRef);
    try {
      const q = query(
        collection(db, "orders"),
        where("user_id", "==", user ? user.uid : "")
      );
      onSnapshot(q, (querySnapshot) => {
        const orderRef = querySnapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id
        }));
        setOrderWithUser(orderRef)
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(orderWithUser)
  useEffect(() => {
    window.scrollTo(0, 0);
    getOrderByUser();
  }, []);
  return (
    <>
      <div className="order-history-section">
        <div className="order-container">
          <ul className="order-title">
            <li className="date">Ngày đặt</li>
            <li className="address">Địa chỉ</li>
            <li className="total">Tổng tiền</li>
            <li className="payment-method">Thanh toán</li>
            <li className="status">Trạng thái</li>
          </ul>
          <ul className="order-history">
            {orderWithUser &&
              orderWithUser.map((order) => {
                return (
                  <Link to={`/purchasehistory/${order.id}`} key={order.id}>
                    <li>
                      <p className="date">{order.data.date}</p>
                      <p className="address">{order.data.address}</p>
                      <p className="total">
                        {order.data.totalPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                      <p className="payment-method">
                        {order.data.paymentMethod}
                      </p>
                      <p
                        className={
                          order.data.status === false
                            ? "status not-confirm"
                            : "status confirm"
                        }
                      >
                        {order.data.status === false
                          ? "Chưa xác nhận"
                          : "Đã xác nhận"}
                      </p>
                    </li>
                  </Link>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PurchaseHistory;
