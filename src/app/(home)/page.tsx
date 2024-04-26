import Image from "next/image";
import Link from "next/link";
import { AwsService } from "~/service/aws/aws";

export default async function HomePage() {
  const awsService = new AwsService();
  let certs;

  try {
    certs = await awsService.getCerts();
  } catch (error) {
    console.error("error: ", error);
  }

  return (
    <div className="container flex flex-col items-center justify-center gap-12">
      <h1 className="text-center text-5xl tracking-tight text-white sm:text-[5rem]">
        AWS Flash Cards
      </h1>
      <div>
        {certs?.map(({ image, cert_name }) => {
          return (
            <Link key={cert_name} href={`/certs/${cert_name}`}>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative size-40">
                  <Image
                    fill
                    src={image}
                    alt={`${cert_name} certification logo`}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
