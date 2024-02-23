import React, { DetailedHTMLProps } from "react";
import classNames from "classnames";

type WrapperProps = DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
>;
export const Wrapper = ({ className, ...rest }: WrapperProps) => {
	return <section className={classNames("mx-auto", className)} {...rest} />;
};
