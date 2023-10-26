import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../store/CryptoContext";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { Typography, LinearProgress, Button } from "@mui/material";
import { numberWithCommas } from "../components/Banner/Carousel";
import HTMLReactParser from "html-react-parser";
import styles from "./CoinPage.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const inWatchlist = watchlist.includes(coin?.id);

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    fetchCoin();
  }, [id]);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin.id] : [coin.id],
      });
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist.`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
      setAlert({
        open: true,
        message: `${coin.name} Remove From The Watchlist.`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200px"
          style={{
            marginBottom: "20px",
          }}
        />
        <Typography variant="h3" className={styles.heading}>
          {coin?.name}
        </Typography>

        <Typography variant="subtitle1" className={styles.description}>
          {HTMLReactParser(coin?.description.en.split(". ")[0])}.
        </Typography>

        <div className={styles.marketdata}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={styles.heading}>
              Rank :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={styles.heading}>
              Current Price :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={styles.heading}>
              Market Cap :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                marginTop: 20,
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                color: inWatchlist ? "white" : "black",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "remove from watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
