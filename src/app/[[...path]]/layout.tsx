import { type PropsWithChildren } from "react";
import { Breadcrumbs } from "~/component/base/breadcrumbs";
import { getCerts } from "~/service/aws/aws";
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

  const certs = await getCerts();
  const activeCert = certs.find((item) => item.cert_id === cert);

  return (
    <div className="container relative flex max-w-screen-lg flex-col items-center justify-center">
      <Breadcrumbs
        certs={certs}
        section={section}
        cert={activeCert}
        className={cn("mb-8", widthClass)}
      />
      {children}
    </div>
  );
}
