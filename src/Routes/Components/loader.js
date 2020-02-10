import React from "react";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";


const override = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px
  border-color: red;
`;
 
class Loader extends React.Component {
 
  render() {
    return (
      <>
      <div className="sweet-loading">
        <ClipLoader
          css={override}
          size={40}
          //size={"150px"} this also works
          color={"purple"}
          loading={this.props.loading}
        />
      </div>
      </>
    );
  }
}

export default Loader;