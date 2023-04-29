import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import ShowOrders from '../components/ShowOrders/ShowOrders';
import { fetchPartOrders } from '../Redux/slices/ordersSlice';

export const UserContext = createContext();
export default function User() {
  const [selectedAction, setSelectedAction] = useState('orders');
  const [userId, setUserId] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const { orders, ordersStatus } = useSelector((state) => state.orders);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  useEffect(() => {
    setUserId(parseInt(cookies.get('user').split(' ')[4]));
  }, [selectedAction, orderId]);
  console.log(userId);
  useEffect(() => {
    getOrders(userId);
  }, [userId, selectedAction, orderId]);
  const getOrders = async (userId) => {
    dispatch(fetchPartOrders({ userId }));
  };
  function selectActionHandler(event) {
    setSelectedAction(event.target.value);
  }
  return (
    <UserContext.Provider
      value={{
        orders,
        ordersStatus,
        orderId,
        setOrderId,
      }}>
      {ordersStatus === 'success' ? (
        <div className="admin-container">
          <div>
            <select
              name="selectAction"
              id="selectAction"
              onChange={selectActionHandler}
              value={selectedAction}>
              <option value="transactions">Мои заказы</option>
            </select>
          </div>
          <div>
            <ShowOrders context={UserContext} />
            {/* {selectedAction === 'orders' ? (
            
            ) : selectedAction === 'edit' ? (
              <EditBlock />
            ) : selectedAction === 'delete' ? (
              <DeleteBlock />
            ) : selectedAction === 'transactions' ? (
              <ShowOrders />
            ) : (
              <ShowBlock />
            )} */}
          </div>
        </div>
      ) : (
        <div>Заказов нет...</div>
      )}
    </UserContext.Provider>
  );
}
