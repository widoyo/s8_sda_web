import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  shadow?: boolean; // Controls whether the card has a shadow
  bg?: string; // Allows setting a custom background color
  rounded?: boolean; // Controls whether the card has rounded corners
  padding?: string; // Allows setting custom padding
  size?: string;
  className?: string;
}

const Card = ({
  children,
  shadow = false,
  bg = "white",
  rounded = false,
  padding = "",
  size = "",
  className = "",
  ...props
}: Props) => {
  const cardClasses = [
    "flex flex-col",
    shadow ? "shadow-md" : "",
    bg,
    rounded ? "rounded-md" : "",
    padding,
    size,
    className,
  ]
    .join(" ")
    .trim();

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
