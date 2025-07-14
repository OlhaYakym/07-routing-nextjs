"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Note.client.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

type Props = {
  initialData: Awaited<ReturnType<typeof fetchNotes>>;
  tag: string;
};

export default function NotesClient({ initialData, tag }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  // console.log("initialData", initialData);
  const { data } = useQuery({
    queryKey: ["notes", currentPage, debouncedQuery, tag],
    queryFn: () =>
      fetchNotes({
        search: debouncedQuery,
        page: currentPage,
        ...(tag !== "All" && { tag }),
      }),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === 1 && debouncedQuery === "" ? initialData : undefined,
  });
  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  };
  const notes = data?.notes;
  const totalPages = data?.totalPages;
  const togleModal = () => setIsModalOpen(!isModalOpen);
  // console.log(togleModal);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onSearch={handleSearch}
          // setPage={setCurrentPage}
        />
        {totalPages && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={togleModal}>
          Create note +
        </button>
      </header>
      {notes && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={togleModal}>
          <NoteForm onClose={togleModal} />
        </Modal>
      )}
    </div>
  );
}
