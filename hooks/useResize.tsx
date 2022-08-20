import { useCallback, useEffect, useState } from "react";

export default function useReisze() {
  const [width, setWidth] = useState<number>(innerWidth);
  const [height, setHeight] = useState<number>(innerHeight);
  const [overflow, setOverflow] = useState<boolean>(innerWidth < 1280);

  const onResize = useCallback(() => {
    setWidth(innerWidth);
    setHeight(innerHeight);
    setOverflow(innerWidth < 1280);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return {
    width,
    height,
    overflow,
  };
}
