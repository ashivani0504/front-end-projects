import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import styles from "../Styles/ImageSlider.module.css";
import { useEffect, useState } from "react";

function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function fetchImages() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://picsum.photos/v2/list?page=2&limit=10"
        );
        const data = await res.json();
        setImages(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }
  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  return (
    <div className={styles.imageSlider}>
      <h1>IMAGE SLIDER</h1>
      <div className={styles.slider}>
        <BsArrowLeftCircleFill
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={handlePrevious}
        />

        {images && images.length
          ? images.map((img, index) => (
              <img
                key={img.id}
                alt={img.download_url}
                src={img.download_url}
                className={`${
                  currentSlide === index
                    ? styles.currentSlide
                    : styles.hideCurrentSlide
                }`}
              />
            ))
          : null}

        <BsArrowRightCircleFill
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={handleNext}
        />
        <span className={styles.indicators}>
          {images && images.length
            ? images.map((_, index) => (
                <button
                  className={` ${styles.currentIndicator} ${
                    currentSlide === index
                      ? styles.currentIndicator
                      : styles.hideCurrentIndicator
                  }`}
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))
            : null}
        </span>
      </div>
    </div>
  );
}

export default ImageSlider;
