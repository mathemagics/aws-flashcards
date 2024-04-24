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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#196f9a] to-[#05060c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Flash Card Page
        </h1>
        {sections.map((section) => {
          return (
            <Link key={section} href={`/certs/${cert}/${section}`}>
              <h1>{section}</h1>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
