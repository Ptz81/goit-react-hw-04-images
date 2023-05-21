import css from '../ImageGallery.module.css'

export const ImageGalleryItem = (({tags, webformatURL, largeImageURL}) => {
  return (
   <li className={css.imageGalleryItem}>
            <img
              src={webformatURL}
              alt={tags}
              data-img={largeImageURL}
              className={css.imageGalleryItem_image}
              />
      </li>
)
    }
    )


