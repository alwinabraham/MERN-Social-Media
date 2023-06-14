import React from "react";
import { ProgressBar } from "react-loader-spinner";

function ColorRingLoader() {
  return (
    <div className="flex items-center justify-center h-screen ">
      {/* <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      /> */}
    <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor = '#F4442E'
        barColor = '#51E5FF'
    />
    </div>
  );
}

export default ColorRingLoader;