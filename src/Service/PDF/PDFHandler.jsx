import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { useState } from 'react';
import { useEffect } from 'react';
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    margin: 12,
    fontFamily: 'Roboto',
  },
  text: {
    fontFamily: 'Roboto',
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    fontFamily: 'Roboto',
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
export default function PDFHandler({ orders, dateFrom, dateTo }) {
  const [profit, setProfit] = useState(0);
  const calcTotal = () => {
    let profitTemp = 0;
    orders.forEach((order) => {
      profitTemp += order.total;
    });
    setProfit(profitTemp.toFixed(2));
  };
  useEffect(() => {
    calcTotal();
  }, []);
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ Отчёт ~
        </Text>
        <Text style={styles.title}>Заказы онлайн-платформы</Text>
        <Text style={styles.author}>Stanislav Kozachenko</Text>
        <Text style={styles.subtitle}>
          на {dateFrom} / {dateTo}
        </Text>
        {orders.map((item, index) => (
          <Text style={styles.text}>
            ID: {item.id} | ID пользователя: {item.userId} | Дата заказа: {item.orderDate} | Общая
            стоимость: {item.total} | Статус: {item.code === 200 ? 'Оплачено' : 'Не оплачено'}
          </Text>
        ))}
        <Text style={styles.text}>Общая сумма выручки: {profit}</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
