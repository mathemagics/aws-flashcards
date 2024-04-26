import { type PropsWithChildren } from "react";
import { Page } from "~/component/layout/page";

export default async function CertLayout({ children }: PropsWithChildren) {
  return <Page>{children}</Page>;
}
