import React, { createContext, useEffect, useState } from 'react';
import ShowBlock from '../components/Admin/ShowBlock/ShowBlock';
import AddBlock from '../components/Admin/AddBlock/AddBlock';
import EditBlock from '../components/Admin/EditBlock/EditBlock';
import DeleteBlock from '../components/Admin/DeleteBlock/DeleteBlock';
import { fetchPublishers } from '../Redux/slices/publishersSlice';
import { fetchAuthors } from '../Redux/slices/authorsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBooks } from '../Redux/slices/booksSlice';
import { fetchTransactions } from '../Redux/slices/transactionsSlice';
import { fetchOrders } from '../Redux/slices/ordersSlice';
import ShowOrders from '../components/ShowOrders/ShowOrders';
import ShowTransactions from '../components/Admin/ShowTransactions/ShowTransactions';
import Report from '../components/Admin/Report/Report';
import Diagram from '../components/Admin/Diagram/Diagram';
import CalculateProfit from '../components/Admin/CalculateProfit/CalculateProfit';
export const AdminContext = createContext();

export default function Admin() {
  const [selectedAction, setSelectedAction] = useState('show');
  const [orderId, setOrderId] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    getBooks();
    getAuthors();
    getPublishers();
    getOrders();
    getTransactions();
  }, [selectedAction]);

  const getBooks = async () => {
    dispatch(fetchAllBooks());
  };
  const getAuthors = async () => {
    dispatch(fetchAuthors());
  };
  const getPublishers = async () => {
    dispatch(fetchPublishers());
  };
  const getTransactions = async () => {
    dispatch(fetchTransactions());
  };
  const getOrders = async () => {
    dispatch(fetchOrders());
  };
  const { books, booksStatus } = useSelector((state) => state.books);
  const { authors, authorsStatus } = useSelector((state) => state.authors);
  const { publishers, publishersStatus } = useSelector((state) => state.publishers);
  const { orders, ordersStatus } = useSelector((state) => state.orders);
  const { transactions, transactionsStatus } = useSelector((state) => state.transactions);
  useEffect(() => {}, [selectedAction]);
  function selectActionHandler(event) {
    setSelectedAction(event.target.value);
  }

  return (
    <AdminContext.Provider
      value={{
        selectedAction,
        setSelectedAction,
        books,
        booksStatus,
        authors,
        authorsStatus,
        publishers,
        publishersStatus,
        transactions,
        transactionsStatus,
        orders,
        ordersStatus,
        orderId,
        setOrderId,
      }}>
      {authorsStatus === 'success' && publishersStatus === 'success' ? (
        <div className="admin-container">
          <div>
            <select
              className="selectAdminAction"
              name="selectAction"
              id="selectAction"
              onChange={selectActionHandler}
              value={selectedAction}>
              <option value="show">Просмотреть книги</option>
              <option value="add">Добавить книгу</option>
              <option value="edit">Править книгу</option>
              <option value="delete">Удалить книгу</option>
              <option value="orders">Просмотреть заказы</option>
              <option value="transactions">Просмотреть транзакции</option>
              <option value="calc">Рассчитать прибыль</option>
              <option value="report">Отчёт продаж</option>
              <option value="diagram">Диаграмма заказов</option>
            </select>
          </div>
          <div>
            {selectedAction === 'add' ? (
              <AddBlock />
            ) : selectedAction === 'edit' ? (
              <EditBlock />
            ) : selectedAction === 'delete' ? (
              <DeleteBlock />
            ) : selectedAction === 'orders' ? (
              <ShowOrders context={AdminContext} />
            ) : selectedAction === 'transactions' ? (
              <ShowTransactions />
            ) : selectedAction === 'diagram' ? (
              <Diagram />
            ) : selectedAction === 'calc' ? (
              <CalculateProfit />
            ) : selectedAction === 'report' ? (
              <Report />
            ) : (
              <ShowBlock />
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </AdminContext.Provider>
  );
}
