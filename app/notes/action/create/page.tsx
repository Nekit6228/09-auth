import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Creating a new note form",
  openGraph: {
    title: "Create Note",
    description: "Creating a new note form",
    url: "https://08-zustand-psi.vercel.app/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Note",
    description: "Creating a new note form",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNote() {
  return <NoteForm />;
}
