import { fetchNoteById } from "@/lib/api";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";
// import Modal from "@/components/Modal/Modal";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const noteId = Number(id); // Перетворення id у число
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default NoteDetails;
