import React, { Component, useEffect, useState } from "react";
import Notiflix from 'notiflix';
import { Searchbar } from "./SearchBar/Searchbar";
import { fetchImages } from "Source/Api";
import Loader from "./Loader/Loader";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import css from './ImageGallery.module.css';

function scroll() {
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
  const [modalAlt, setModalElt] = useState('');

  useEffect(()=>{getImages()}, [query])

  // componentDidUpdate(prevProps, prevState) {
  //   const prevQuery = prevState.query;
  //   const nextQuery = this.state.query;
  //   if (prevQuery !== nextQuery) {
  //     this.getImages();
  //   }
  // }

  getImages = () => {
    fetchImages(query, page)
      .then((response) => {
        setLoader(true)
        const hits = response || [];
        this.setState((prevState) => ({
          loader: true,
          pictures:
            prevState.page === 1 ? hits : [...prevState.pictures, ...hits],
          button: hits.length >= 12,
        }));
        if (hits.length === 0) {
          Notiflix.Notify.failure(`No images for ${this.state.query}`);
        }
        scroll();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        loader(false) });
      // });
  };

const handleFormSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setPictures([]);
  };

  const handlePagination = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.getImages);
  };

  const toggleImage = () => {
    this.setState((prevState) => ({ openModal: !prevState.openModal }));
  };


 const handleOpenModal = (e) => {
     if (e.target.nodeName !== 'IMG') {
      return;
    }
   setModalImg(e.target.dataset.img);
  toggleImage();
};



    // const { loader, pictures, openModal, button, modalImg } = this.state;

    return (
      <div className={css.app}>
        {openModal && (
          <Modal onClose={toggleImage}>
              <img src={modalImg} alt="#" />
          </Modal>
        )}
        <Searchbar onSubmit={handleFormSubmit} />
        {pictures.length >= 1 && (
          <ImageGallery items={pictures} handleOpenModal={handleOpenModal} />
        )}
        {button && (
          <Button handleLoadMore={handlePagination} />
        )}
        {loader && (
          <Loader className={css.loader} />
        )}

      </div>
    );
  }
