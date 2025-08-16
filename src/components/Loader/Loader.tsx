import { BounceLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderBackdrop}>
      <BounceLoader color="#71f489" />
    </div>
  );
};

export default Loader;
