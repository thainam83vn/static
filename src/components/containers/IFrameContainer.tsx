import React from "react";
import "./IFrameContainer.css";

interface IFrameContainerProps {
  name: string;
  options: any;
}

const IFrameContainer: React.FC<IFrameContainerProps> = ({ name, options }) => {
  return (
    <div className="container">
      <iframe
        width="100%"
        height="100%"
        src={options.targetUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default IFrameContainer;
