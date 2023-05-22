import React, { useEffect, useState } from "react";
import Notiflix from 'notiflix';
import Searchbar from "./SearchBar/Searchbar";
import { fetchImages } from "Source/Api";
import Loader from "./Loader/Loader";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import css from './ImageGallery.module.css';

const scroll=() =>{
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}

export default function App() {
  const [query, setQuery] = useState('');
  const [loader, setLoader] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [button, setButton] = useState(false);
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await fetchImages(query, page);
      const hits = response || [];
      setPictures((prevPictures) =>
        page === 1 ? hits : [...prevPictures, ...hits]
      );
      setButton(hits.length >= 12);
      if (hits.length === 0) {
        Notiflix.Notify.failure(`No images for ${query}`);
      }
      scroll();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  if (query !== '') {
    fetchData();
  }
}, [query, page]);
const handlePagination = () => {
  setPage(prevPage => prevPage + 1);
};
const handleFormSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setPictures([]);
  };
  const toggleImage = () => {
    setOpenModal(prevOpenModal => !prevOpenModal);
  };
 const handleOpenModal = (e) => {
     if (e.target.nodeName !== 'IMG') {
      return;
    }
    setModalImg(e.target.dataset.img);
    toggleImage();
};
    return (
      <div className={css.app}>
        {openModal && (
          <Modal onClose={() => toggleImage()}>
              <img src={modalImg} alt={"#"} />
          </Modal>
        )}
        <Searchbar onFormSubmit={handleFormSubmit} />
        {pictures.length > 0 && (
          <ImageGallery items={pictures} handleOpenModal={handleOpenModal} />
        )}
        {button && (
          <Button handleLoadMore={handlePagination} />
        )}
        {loader && (
         <div className={css.pos_center}>
      <Loader />
    </div>
        )}

      </div>
    );
  }
