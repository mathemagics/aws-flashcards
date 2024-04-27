import { type PropsWithChildren } from "react";
import { Breadcrumbs } from "~/component/base/breadcrumbs";
import { getCerts } from "~/service/aws/aws";
import { widthClass } from "./config";
import { cn } from "~/lib/utils";
import { SelectCard } from "~/component/partial/select-card";

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
      {cert && section ? (
        children
      ) : (
        <div
          className={cn(
            "flex items-center justify-center ",
            widthClass,
            "h-[364px] md:h-[464px] lg:h-[564px]",
          )}
        >
          <SelectCard certs={certs} cert={cert} />
        </div>
      )}
    </div>
  );
}
