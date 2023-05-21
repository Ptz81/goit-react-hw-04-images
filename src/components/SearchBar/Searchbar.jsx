import { useState } from "react";
import css from './SearchBar.module.css'
import Notiflix from 'notiflix';



export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('')

  const handleInput = (e) => {
      setQuery(e.currentTarget.value.toLowerCase());
  }

  const handleSubmit=(e) => {
    e.preventDefault();
    if (query.trim() === '') {
      return Notiflix.Notify.failure(
      'Please, enter your request.'
    );
    }
    onSubmit(query.trim().toLowerCase());
    reset();
  };

  const reset = () => {
    setQuery('');
  };


    return (
      <header
        className={css.searchbar} >
        <form
          className={css.searchForm}
          onSubmit={handleSubmit}>
          <button
            type="submit"
            className={css.searchForm_button}>

Search
    </button>

    <input
      className={css.searchForm_input}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={handleInput}
      value={query}
    />
  </form>
</header>
  )
  }

