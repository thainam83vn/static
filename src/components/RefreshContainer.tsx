import React, { useState, useEffect } from "react";

interface RefreshContainerProps {
  refreshTime: string;
  children: any;
}

const RefreshContainer: React.FC<RefreshContainerProps> = ({
  refreshTime,
  children,
}) => {
  useEffect(() => {}, [refreshTime]);
  return children;
};

export default RefreshContainer;
