import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import advertiserSDK from "@/services"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Alter Office - TODO APP",
	description: "TODO APP",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script
					async
					src="https://cdn-beta.adgeist.ai/publisher/v1-beta/publisher.min.js"
					data-publisher-id="6ac638953741c8e66ba98828"
				></script>

				<script
					async
					data-advertiser-id="6ac638953741c8e66ba98828"
					src="https://cdn-beta.adgeist.ai/advertiser/v1-beta/advertiser.min.js"
				></script>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
