import { type PropsWithChildren } from "react";
import { Breadcrumbs } from "~/component/base/breadcrumbs";
import { AwsService } from "~/service/aws/aws";
import { widthClass } from "./config";

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
    const awsService = new AwsService();
    sections = await awsService.getCertSections({ cert });
  }

  return (
    <div className="container relative flex max-w-screen-lg flex-col items-center justify-center">
      <div className={widthClass}>
        <Breadcrumbs section={section} cert={certItem} sections={sections} />
      </div>
      <div className="pt-10">{children}</div>
    </div>
  );
}
