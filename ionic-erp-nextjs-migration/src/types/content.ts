export interface ImageCard {
  readonly id?: string | number;
  readonly imgSrc: string;
  readonly title: string;
  readonly description?: string;
  readonly link?: string;
  readonly lineNo?: number;
}

export interface SectionTitleProps {
  readonly heading?: React.ReactNode;
  readonly subheading?: React.ReactNode;
}
