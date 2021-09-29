import { useCallback, useEffect, useRef, useState } from "react";
import { defaultParameters } from "./defaultParameters";

export const useParameters = (func) => {
  const prevParameters = useRef({});
  const [parameters, setParameters] = useState(null);
  const [error, setError] = useState(false);
  const onUpdateParameters = useCallback(
    (newParameters, defaultPar = false) => {
      setParameters((prev) => {
        if (prev) prevParameters.current = { ...prev };
        return { ...newParameters, defaultPar, id: Date.now() };
      });
    },
    []
  );

  const onResetParameters = useCallback(() => {
    onUpdateParameters(defaultParameters[func], true);
  }, [onUpdateParameters, func]);

  const onError = useCallback(() => {
    setError(true);
  }, []);

  const onClearError = useCallback(() => {
    setError(false);
    setParameters(prevParameters.current);
  }, []);

  useEffect(() => {
    onResetParameters();
  }, [onResetParameters, func]);

  return [
    parameters,
    error,
    onUpdateParameters,
    onResetParameters,
    onError,
    onClearError,
  ];
};
