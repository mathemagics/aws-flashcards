import Image from "next/image";
import {AwsService} from "~/service/aws/aws";

export default async function HomePage() {
  const awsService =  new AwsService();
  let certs;

  try {
    certs = await awsService.getCerts();
  }
  catch (error) {
    console.error('error: ', error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#196f9a] to-[#05060c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] text-center">
          AWS Flash Cards
        </h1>
        {certs?.map((cert) => (
          <div key={cert.cert_id.S} className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold">{cert.cert_id.S}</h2>
            <div className="size-40 relative">
              <Image fill src={cert.image.S} alt={`${cert.cert_id.S} certification logo`}/>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
