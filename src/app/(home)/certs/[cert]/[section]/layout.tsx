import { type PropsWithChildren } from "react";
import { Breadcrumbs } from "~/component/base/breadcrumbs";
import { AwsService } from "~/service/aws/aws";

export default async function CertLayout({
  children,
  params,
}: PropsWithChildren<{
  params: {
    cert: string;
    section: string;
  };
}>) {
  const { cert, section } = params;
  const awsService = new AwsService();
  const sections = await awsService.getCertSections({ cert });
  const certName = cert.replace(/-/g, " ");
  return (
    <div className="container relative max-w-screen-lg">
      <Breadcrumbs
        section={section}
        cert={{ name: certName, url: cert }}
        sections={sections}
      />
      <div className="pt-20">{children}</div>
    </div>
  );
}
