import { Oval } from "react-loader-spinner";

export default function LoadingSpinner({
  height = 50,
  width = 50,
  color = "#ab8c83",
  secondaryColor = "#ccc",
  strokeWidth = 4,
  wrapperClass = "",
}) {
  return (
    <div className={`login-loading ${wrapperClass}`}>
      <Oval
        height={height}
        width={width}
        color={color}
        secondaryColor={secondaryColor}
        strokeWidth={strokeWidth}
      />
    </div>
  );
}
