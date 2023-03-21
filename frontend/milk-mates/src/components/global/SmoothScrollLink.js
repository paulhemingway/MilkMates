import React from 'react';
import { Link } from 'react-scroll';

const SmoothScrollLink = ({ to, spy, smooth, offset, duration, children }) => {

  const handleClick = (event) => {
    console.log(event.key)
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.click();
    }
  }

  return (
    <Link
      role="link"
      tabIndex={0}
      activeClass="active"
      to={to}
      spy={spy}
      smooth={smooth}
      offset={offset}
      duration={duration}
      onKeyDown={handleClick}
    >
      {children}
    </Link>
  );
};

export default SmoothScrollLink;
