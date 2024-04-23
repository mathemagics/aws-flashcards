import Link from "next/link";
import { AwsService } from "~/service/aws/aws";

export default async function CertPage(
  {params: {slug}}: {params: {slug: string}},
) {
  const awsService =  new AwsService();
  const sections = await awsService.getCertSections({key: slug});
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#196f9a] to-[#05060c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] text-center">
          Flash Card Page
        </h1>
        {sections.map((section) => {
            return (
              <Link key={section} href={`/flashcards/${section}`}>
                <h1>{section}</h1>
              </Link>
            );
          })}
      </div>
    </main>
  );
}
