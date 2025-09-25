import { useState } from "react";

// В качестве решения решил использовать обёртку

const RawBlock1 = ({ imgSrc, imgAlt }) => <img src={imgSrc} alt={imgAlt} />;

const RawBlock2 = ({ content }) => <p>{content}</p>;

const RawBlock3 = ({ userData }) =>
    <address>
      country: {userData.country}, street: {userData.street}
    </address>;

const BlockWrapper = ({ mouseEnterCallback, children }) => {
  const [isActive, setActive] = useState(false);

  const mouseEnterHandler = () => {
    setActive(true);
    mouseEnterCallback();
  };

  return (
    <div onMouseEnter={mouseEnterHandler} className={isActive ? "active" : ""}>
      {children}
    </div>
  );
};

export const Block1 = (props) => (
  <BlockWrapper {...props}>
    <RawBlock1 {...props} />
  </BlockWrapper>
);

export const Block2 = (props) => (
  <BlockWrapper {...props}>
    <RawBlock2 {...props} />
  </BlockWrapper>
);
export const Block3 = (props) => (
  <BlockWrapper {...props}>
    <RawBlock3 {...props} />
  </BlockWrapper>
);