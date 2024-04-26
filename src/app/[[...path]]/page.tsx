import { Carousel } from "~/component/base/carousel";
import {
  CarouselContainer,
  CarouselSlide,
} from "~/component/base/carousel/Carousel";
import { Flashcard, Card } from "~/component/base/flashcard";
import { cn } from "~/lib/style";
import { AwsService, type FlashcardType } from "~/service/aws/aws";
import { widthClass, heightClass } from "./config";

export default async function FlashCardPage({
  params: { path },
}: {
  params: {
    path: [cert: string, section: string];
  };
}) {
  const [cert, section] = path ?? [];

  let flashcards: FlashcardType[] = [];

  if (cert) {
    const awsService = new AwsService();
    flashcards = await awsService.getFlashcards({ cert, section });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={cn("mb-6 min-h-10 text-4xl font-bold", widthClass)}>
        {section}
      </h1>
      <Carousel showProgress showControls options={{ duration: 10 }}>
        <CarouselContainer className={cn(widthClass, heightClass)}>
          {flashcards.length ? (
            flashcards.map(({ id, question, answer }) => (
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
            ))
          ) : (
            <Card className={cn(widthClass, heightClass)}>
              {!cert ? "Select a Certification" : "Select a Section"}
            </Card>
          )}
        </CarouselContainer>
      </Carousel>
    </div>
  );
}