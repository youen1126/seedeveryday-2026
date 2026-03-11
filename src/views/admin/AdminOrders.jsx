import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  //取得遠端order data
  const getAdminOrder = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/orders?page=${page}`,
      );
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("catch失敗", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminOrder();
  }, []);

  return (
    <div className="container p-0 my-3">
      <div className="row mt-5 ">
        <div className="col">
          <h2 className="text-black"> 管理訂單頁面 </h2>
          <br />
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>付款狀況</th>
                  <th>訂單編號</th>
                  <th>客戶名</th>
                  <th>客戶地址</th>
                  <th>客戶信箱</th>
                  <th>客戶電話</th>
                  <th>備註留言</th>
                  <th>編輯</th>
                </tr>
                {orders.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.is_paid ? "已付款" : "未付款"}</td>
                      <td scope="row">{item.id}</td>
                      <td>{item.user.name}</td>
                      <td>{item.user.address}</td>
                      <td>{item.user.email}</td>
                      <td>{item.user.tel}</td>
                      <td>{item.message}</td>
                      <td>
                        <div
                          className="btn-group btn-group-sm"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button
                            type="button"
                            className="btn btn-outline-info"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            刪除
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </thead>
            </table>
            {loading && (
              <div className="login-loading">
                <Oval
                  height={50}
                  width={50}
                  color="#ff7a15ff"
                  secondaryColor="#ccc"
                  strokeWidth={4}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
