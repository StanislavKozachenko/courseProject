import React from 'react';
import styles from './Map.module.scss';
export default function Map() {
  return (
    <>
      <iframe
        className={styles.map}
        src="https://yandex.com/map-widget/v1/?um=constructor%3A7033af7e24634ffb3ba559bcbc41a85c295c28323623efda16ab35e4c779f4e6&amp;source=constructor"
        width="100%"
        height="401"
        frameborder="0"></iframe>
    </>
  );
}
