import React from "react";
import { StyledLoader } from "./index.styled";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loader = () => {
  return (
    <StyledLoader>
      <ClimbingBoxLoader
        color="blue"
        loading={true}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </StyledLoader>
  );
};

export default Loader;
