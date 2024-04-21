import {AwsService} from "~/service/aws/aws";

export default async function HomePage() {
  const awsService =  new AwsService();
  const flashcardItem = await awsService.getFlashcardItem({key: "developer-associate"});
  console.log(flashcardItem);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#196f9a] to-[#05060c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] text-center">
          AWS Flash Cards
        </h1>
      </div>
    </main>
  );
}
