import { AwsService } from "~/service/aws/aws";

export default async function FlashCardPage({
  params: { cert, section },
}: {
  params: { cert: string; section: string };
}) {
  const awsService = new AwsService();
  const flashcards = await awsService.getFlashcards({ cert, section });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#196f9a] to-[#05060c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Flash Card Page
        </h1>
        {flashcards.map(({ id, question, answer }) => (
          <div key={id}>
            <h2>{question}</h2>
            <p>{answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
