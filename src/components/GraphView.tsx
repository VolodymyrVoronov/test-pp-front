import { ComponentProps, useEffect, useRef } from "react";

interface IGraphViewProps extends ComponentProps<"div"> {
  htmlContent: string;
}

const GraphView = ({
  htmlContent,
  className,
  ...props
}: IGraphViewProps): JSX.Element => {
  const graphRef = useRef<HTMLDivElement | null>(null);

  console.log(htmlContent);

  useEffect(() => {
    if (graphRef.current) {
      let shadowRoot = graphRef.current.shadowRoot;

      if (!shadowRoot) {
        shadowRoot = graphRef.current.attachShadow({ mode: "open" });
      }

      shadowRoot.innerHTML = htmlContent;
    }
  }, [htmlContent]);

  return <div ref={graphRef} className={className} {...props} />;
};

export default GraphView;
