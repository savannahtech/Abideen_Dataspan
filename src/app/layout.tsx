import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { Wrapper } from "../components/common";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dataspan.ai",
	description:
		"dataspan.ai makes it possible to automate the creation of countless variations from your images and videos, adding aspects that your data lacks.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head></head>
			<body className={montserrat.className}>
				<Wrapper className="bg-white p-6 h-screen">{children}</Wrapper>
			</body>
		</html>
	);
}
