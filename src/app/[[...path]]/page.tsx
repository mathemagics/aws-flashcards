import { Carousel } from "~/component/base/carousel";
import {
  CarouselContainer,
  CarouselSlide,
} from "~/component/base/carousel/Carousel";
import { Flashcard, Card } from "~/component/base/flashcard";
import { cn } from "~/lib/style";
import { getCert, getCerts } from "~/service/aws/aws";
import { widthClass, heightClass } from "./config";
import { type FlashcardType } from "~/service/aws/types";
import { SelectCard } from "~/component/partial/select-card";

export default async function FlashCardPage({
  params: { path },
}: {
  params: {
    path: [cert: string, section: string];
  };
}) {
  const [cert, section] = path ?? [];
  let flashcards: FlashcardType[] = [];

  const certs = await getCerts();

  if (cert) {
    const certification = await getCert({ cert, section });
    flashcards = certification?.flashcards ?? [];
  }

  if (flashcards.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center ",
          widthClass,
          "h-[364px] md:h-[464px] lg:h-[564px]",
        )}
      >
        <SelectCard certs={certs} cert={cert} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {flashcards?.length > 0 && (
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
      )}
    </div>
  );
}
