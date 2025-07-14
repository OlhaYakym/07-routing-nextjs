import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
type Params = { params: Promise<{ slug: string[] }> };

export default async function NotesPage({ params }: Params) {
  const { slug } = await params;
  const tag = slug[0];
  const initialData = await fetchNotes({
    page: 1,
    search: "",
    ...(tag && tag !== "All" && { tag }),
  });
  // console.log(slug);
  // console.log(initialData);
  return <NotesClient initialData={initialData} tag={tag} />;
}
