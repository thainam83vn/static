import React, { useState, useEffect } from "react";

interface PromiseContainerProps {
  requestDataFunc: any;
  generateComponentFunc: (data: any) => any;
}

const PromiseContainer: React.FC<PromiseContainerProps> = ({
  requestDataFunc,
  generateComponentFunc,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [response, setRespone] = useState();
  useEffect(() => {
    requestDataFunc().then((response: any) => {
      setRespone(response);
      setLoaded(true);
    });
  }, []);
  return <div>{loaded ? generateComponentFunc(response) : "Loading..."}</div>;
};

export default PromiseContainer;
