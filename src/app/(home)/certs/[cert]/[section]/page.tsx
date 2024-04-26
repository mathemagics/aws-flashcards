import { Carousel } from "~/component/base/carousel";
import {
  CarouselContainer,
  CarouselSlide,
} from "~/component/base/carousel/Carousel";
import { Flashcard, Card } from "~/component/base/flashcard";
import { cn } from "~/lib/style";
import { AwsService } from "~/service/aws/aws";

const widthClass = "w-[360px] md:w-[480px] lg:w-[800px]";
const heightClass = "h-[300px] md:h-[400px] lg:h-[500px]";

export default async function FlashCardPage({
  params: { cert, section },
}: {
  params: { cert: string; section: string };
}) {
  const awsService = new AwsService();
  const flashcards = await awsService.getFlashcards({ cert, section });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={cn("mb-6 text-4xl font-bold", widthClass)}>{section}</h1>
      <Carousel showProgress showControls options={{ duration: 10 }}>
        <CarouselContainer className={cn(widthClass, heightClass)}>
          {flashcards.map(({ id, question, answer }) => (
            <CarouselSlide key={id}>
              <Flashcard>
                <Card className={cn(widthClass, heightClass)}>
                  <h2>{question}</h2>
                </Card>
                <Card className={cn(widthClass, heightClass)}>
                  <p>{answer}</p>
                </Card>
              </Flashcard>
            </CarouselSlide>
          ))}
        </CarouselContainer>
      </Carousel>
    </div>
  );
}
