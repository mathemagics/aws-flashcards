import { type PropsWithChildren } from "react";
import { Breadcrumbs } from "~/component/base/breadcrumbs";
import { getCertSections } from "~/service/aws/aws";
import { widthClass } from "./config";
import { cn } from "~/lib/utils";

export default async function CertLayout({
  children,
  params: { path },
}: PropsWithChildren<{
  params: {
    path?: [cert?: string, section?: string];
  };
}>) {
  const [cert, section] = path ?? [];

  const certItem = cert
    ? { name: cert.replace(/-/g, " "), url: cert }
    : undefined;

  let sections: string[] = [];

  if (cert) {
    sections = await getCertSections({ cert });
  }

  return (
    <div className="container relative flex max-w-screen-lg flex-col items-center justify-center">
      <Breadcrumbs
        section={section}
        cert={certItem}
        sections={sections}
        className={cn("mb-8", widthClass)}
      />
      {children}
    </div>
  );
}
