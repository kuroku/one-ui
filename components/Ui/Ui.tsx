import "./ui.css";

export interface UiProps {
  theme?: "light" | "dark";
  children: JSX.Element | JSX.Element[];
}

export default function Ui(props: UiProps) {
  const { theme = "light", children } = props;
  return (
    <div id='ui' className={`${theme}`}>
      {children}
    </div>
  );
}
