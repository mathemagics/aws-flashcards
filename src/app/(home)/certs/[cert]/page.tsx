import Link from "next/link";
import { AwsService } from "~/service/aws/aws";

export default async function CertPage({
  params: { cert },
}: {
  params: { cert: string };
}) {
  const awsService = new AwsService();
  const sections = await awsService.getCertSections({ cert });
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      {sections.map((section) => {
        return (
          <Link key={section} href={`/certs/${cert}/${section}`}>
            <h1>{section}</h1>
          </Link>
        );
      })}
    </div>
  );
}
