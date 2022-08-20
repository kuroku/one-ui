import { useMemo } from "react";
import useReisze from "../../hooks/useResize";
import style from "./aside.module.css";

export interface AsideProps {
  children: JSX.Element | JSX.Element[];
  direction: "left" | "right";
}
export default function Aside(props: AsideProps) {
  const { children, direction } = props;
  const { overflow } = useReisze();

  const className = useMemo(() => {
    return `
      ${direction ? style[direction] : ""}
      ${overflow ? style["overflow"] : ""}
    `;
  }, [direction, overflow]);

  return (
    <>
      <aside id={style["drawer"]} className={className}>
        {children}
      </aside>
    </>
  );
}
