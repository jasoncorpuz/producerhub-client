import React from "react";
import { css } from "@emotion/core";
// First way to import
import { HashLoader } from "react-spinners";
// Another way to import. This is recommended to reduce bundle size

 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
class Loader extends React.Component {
 
  render() {
    return (
      <div className="sweet-loading">
        <HashLoader
          css={override}
          size={50}
          //size={"150px"} this also works
          color={"gray"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export default Loader;