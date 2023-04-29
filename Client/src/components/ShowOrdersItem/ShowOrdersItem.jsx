import React from 'react';
import styles from './ShowOrdersItem.module.scss';
import { UserContext } from '../../pages/User';
import { AdminContext } from '../../pages/Admin';
import { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFHandler from '../../Service/PDF/PDFHandler';
import QRCode from 'react-qr-code';
export default function ShowOrdersItem({
  id,
  total,
  code,
  orderDate,
  userId,
  context,
  setOrderId,
}) {
  const reportOrder = [
    {
      id: id,
      total: total,
      code: code,
      orderDate: orderDate,
      userId: userId,
    },
  ];
  const [isSaveable, setIsSaveable] = useState(false);
  function onBuyHandler(id) {
    setOrderId(id);
  }
  function onSaveHandler() {
    setIsSaveable(true);
  }
  orderDate = orderDate.split('T')[0];
  return (
    <>
      <tr className={styles.order}>
        <td>
          <input className={styles.input} name="value" value={id}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={total.toFixed(2)}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="value"
            value={code === 203 ? 'Не оплачено, код: ' + code : 'Оплачено, код: ' + code}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={orderDate}></input>
        </td>
        {context === UserContext && code === 203 ? (
          <button
            type="submit"
            className={styles.saveBtn}
            id={'buy-' + id}
            onClick={() => onBuyHandler(id)}>
            Оплатить
          </button>
        ) : context === AdminContext ? (
          <td>
            <input className={styles.input} name="value" value={userId}></input>
          </td>
        ) : (
          <button
            type="submit"
            className={styles.saveBtn}
            id={'save-' + id}
            onClick={() => onSaveHandler(id)}>
            Сохранить
          </button>
        )}
      </tr>
      {isSaveable ? (
        <div className={styles.info}>
          <PDFViewer className={styles.report}>
            <PDFHandler
              orders={reportOrder}
              isSave={true}
              dateFrom={orderDate}
              dateTo={orderDate}
            />
          </PDFViewer>
          <QRCode
            className={styles.QR}
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={`
            Order ID:
            ${reportOrder[0].id}\n
            User ID:
            ${reportOrder[0].userId}\n
            Order date: 
            ${reportOrder[0].orderDate.split('T')[0]}\n
            Total cost:
            ${reportOrder[0].total}\n
            Status:
            ${reportOrder[0].code === 200 ? 'Paid' : 'Awaiting payment'}`}
            viewBox={`0 0 256 256`}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
