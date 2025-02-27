import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  return (
    <div className="max-w-prose">
      <PrismicRichText field={slice.primary.text} />
    </div>

  );
};

export default TextBlock;
