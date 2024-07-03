import { useState, useEffect } from "react";
import styles from "../Styles/ImageSlider.module.css";

function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://dummyjson.com/products?limit=20&skip=${
            count === 0 ? 0 : count * 20
          }`
        );
        const data = await res.json();
        console.log(data);
        if (data && data.products && data.products.length) {
          setProducts((prevData) => [...prevData, ...data.products]);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchProducts();
  }, [count]);

  useEffect(function () {
    if (products && products.length === 150) {
      setDisableButton(true);
    }
  });

  return (
    <div className={styles.loadMore}>
      <h1>SHOPPING CART WITH LOAD MORE</h1>
      {loading && <div>loading...</div>}
      <div className={styles.shoppingCart}>
        {products && products.length
          ? products.map((item) => (
              <div className={styles.products} key={item.id}>
                <img
                  className={styles.img}
                  src={item.thumbnail}
                  alt={item.title}
                />
                <h4>{item.title}</h4>
                <p>{item.price}</p>
              </div>
            ))
          : null}
      </div>
      <div className={styles.btn}>
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          load more data
        </button>
        {disableButton ? <p> you have reached 150 products</p> : null}
      </div>
    </div>
  );
}

export default LoadMoreData;
