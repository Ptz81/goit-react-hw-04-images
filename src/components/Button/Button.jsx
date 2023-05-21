import css from './Button.module.css'
import PropTypes from 'prop-types'

export const Button = ({ handleLoadMore }) => {
  return (
          <button
            type="button"
            onClick={handleLoadMore}
            className={css.button}
          >Load more</button>
  );
}
Button.propTypes = {
handleLoadMore: PropTypes.func.isRequired,
}
