export type ZouProps = {
  height?: string;
  width?: string;
};

export const Zou = ({ height, width }: ZouProps) => {
  return (
    <img
      src={"/zou.svg"}
      alt={"Zou"}
      style={{
        height: height ?? "24px",
        width: width ?? "24px",
        display: "inline",
        verticalAlign: "text-bottom",
      }}
    />
  );
};
