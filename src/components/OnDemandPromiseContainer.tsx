import React, { useState, useEffect } from "react";

interface OnDemandPromiseContainerProps {
  requestDataFunc: any;
  generateComponentFunc: (data: any) => any;
}

const OnDemandPromiseContainer: React.FC<OnDemandPromiseContainerProps> = ({
  requestDataFunc,
  generateComponentFunc,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [response, setRespone] = useState();
  useEffect(() => {
    console.log("useEffect");
    requestDataFunc().then((response: any) => {
      setRespone(response);
      setLoaded(true);
    });
  });
  return <div>{loaded ? generateComponentFunc(response) : "Loading..."}</div>;
};

export default OnDemandPromiseContainer;
