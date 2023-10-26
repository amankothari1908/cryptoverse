import React from "react";
import styles from "./Banner.module.css";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <Container className={styles["banner-content"]}>
        <div className={styles["banner-tagline"]}>
          <Typography variant="h2" className={styles["banner-text"]}>
            Crypto Verse
          </Typography>
          <Typography variant="subtitle2" className={styles["banner-subtext"]}>
            Get all the Info regarding your favourite crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
