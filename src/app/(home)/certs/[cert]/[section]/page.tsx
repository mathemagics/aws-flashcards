import { Carousel } from "~/component/base/carousel";
import {
  CarouselContainer,
  CarouselSlide,
} from "~/component/base/carousel/Carousel";
import { Flashcard, Card } from "~/component/base/flashcard";
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
      <div className="container flex flex-col items-center justify-center py-16 ">
        <h1 className="mb-6 w-[400px] text-4xl font-bold">{section}</h1>
        <Carousel showProgress showControls options={{ duration: 10 }}>
          <CarouselContainer className="h-[300px] w-[400px]">
            {flashcards.map(({ id, question, answer }) => (
              <CarouselSlide key={id} className="h-[300px] w-[400px]">
                <Flashcard>
                  <Card className="h-[300px] w-[400px]">
                    <h2>{question}</h2>
                  </Card>
                  <Card className="h-[300px] w-[400px]">
                    <p>{answer}</p>
                  </Card>
                </Flashcard>
              </CarouselSlide>
            ))}
          </CarouselContainer>
        </Carousel>
      </div>
    </main>
  );
}
