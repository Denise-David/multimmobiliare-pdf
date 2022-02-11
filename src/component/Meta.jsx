/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch, useSelector } from 'react-redux';
import { setSize, size } from '../store/slice/FormSlice';

const Meta = (orderedImage) => {
  const size1 = useSelector(size);

  const ciao = orderedImage?.map((immagine) => {
    const img = new Image();
    const dispatch = useDispatch();
    img.onload = function () {
      if (size1[immagine.id] === undefined && Object.keys(size1).length < orderedImage.length) {
        dispatch(setSize({ id: immagine.id, wh: { height: this.height, width: this.width } }));
      }
    };

    img.src = `https://api.multimmobiliare.com/img/immobili/${immagine.fileName}`;
  });
};

export default Meta;
