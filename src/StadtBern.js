import * as React from 'react';
import BernIcon from './WappenBern.png';

function Bern({ flip }) {
  const styles = flip ? { transform: 'scaleX(-1)' } : {};
  return (
    <img src={BernIcon} alt="Bern Icon" style={styles} />
  );
}

export default Bern;
