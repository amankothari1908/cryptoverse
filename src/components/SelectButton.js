import React from "react";
import styles from "./SelectButton.module.css";

const SelectButton = (props) => {
  return (
    <span onClick={props.onClick} className={styles.selectbutton}>
      {props.children}
    </span>
  );
};

export default SelectButton;
