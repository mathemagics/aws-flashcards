import { Carousel } from "~/component/base/carousel";
import {
  CarouselContainer,
  CarouselSlide,
} from "~/component/base/carousel/Carousel";
import { Flashcard, Card } from "~/component/base/flashcard";
import { cn } from "~/lib/style";
import { getCerts, getFlashcards, type FlashcardType } from "~/service/aws/aws";
import { widthClass, heightClass } from "./config";
import { SelectCard } from "~/component/partial/select-card";

export default async function FlashCardPage({
  params: { path },
}: {
  params: {
    path: [cert: string, section: string];
  };
}) {
  const [cert, section] = path ?? [];
  const certs = await getCerts();

  let flashcards: FlashcardType[] = [];
  if (cert) {
    flashcards = await getFlashcards({ cert, section });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {flashcards.length ? (
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
      ) : (
        <div
          className={cn(
            "flex items-center justify-center",
            widthClass,
            heightClass,
          )}
        >
          <SelectCard certs={certs} />
        </div>
      )}
    </div>
  );
}
