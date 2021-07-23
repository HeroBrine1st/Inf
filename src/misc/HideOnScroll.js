import Slide from "@material-ui/core/Slide";
import {useScrollTrigger} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const HideOnScroll = ({children}) => {
  return <Slide appear={false} direction="down" in={!useScrollTrigger()}>
    {children}
  </Slide>;
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HideOnScroll