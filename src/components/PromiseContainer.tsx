import React, { useState, useEffect } from "react";

interface PromiseContainerProps {
  refreshTime: string;
  requestDataFunc: any;
  generateComponentFunc: (data: any) => any;
}

const PromiseContainer: React.FC<PromiseContainerProps> = ({
  refreshTime,
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
