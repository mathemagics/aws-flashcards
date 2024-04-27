export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type GetCertsType = {
  cert_id: string;
  cert_name: string;
  sections: { section_name: string }[];
};

export type FlashcardType = {
  id: string;
  question: string;
  answer: string;
};

export type GetCertType = {
  cert_name: string;
  cert_id: string;
  section_name: string;
  flashcards: FlashcardType[];
};
