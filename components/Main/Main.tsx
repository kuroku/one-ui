import style from "./main.module.css";
export interface MainProps {
  children: JSX.Element | JSX.Element[];
}
export default function Main(props: MainProps) {
  const { children } = props;
  return <main id={style["container"]}>{children}</main>;
}
