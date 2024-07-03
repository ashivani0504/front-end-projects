import { FaStar } from "react-icons/fa";
import styles from "../Styles/StarRating.module.css";
import { useState } from "react";

function StarRating({ starsNum }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(index) {
    setRating(index);
  }
  function mouseEnter(index) {
    setHover(index);
  }
  function mouseOver() {
    setHover(rating);
  }
  return (
    <div className={styles.starRating}>
      <h1>STAR RATING</h1>
      <div className={styles.stars}>
        {[...Array(starsNum)].map((_, index) => {
          index += 1;
          return (
            <FaStar
              key={index}
              className={`${styles.star}  ${
                index <= (hover || rating) ? styles.active : styles.inactive
              }`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => mouseEnter(index)}
              onMouseLeave={() => mouseOver(index)}
              size={50}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StarRating;
