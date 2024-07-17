import { ComponentProps } from "react";

interface IGraphViewProps extends ComponentProps<"iframe"> {
  htmlContent: string;
}

const GraphView = ({
  htmlContent,
  className,
  ...props
}: IGraphViewProps): JSX.Element => {
  return (
    <iframe
      title="graph"
      srcDoc={htmlContent}
      className={className}
      {...props}
    />
  );
};

export default GraphView;
