import "~/styles/globals.css";

import { Manrope } from "next/font/google";
import { Page } from "~/component/layout/page";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "AWS Flash Cards",
  description: "AWS Certification Flash Cards",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <Page>{children}</Page>
      </body>
    </html>
  );
}
