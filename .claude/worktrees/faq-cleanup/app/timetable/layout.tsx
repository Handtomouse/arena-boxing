import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class Timetable",
  description: "View our weekly class schedule. From early morning bootcamps to evening sparring sessions. Find your perfect training time.",
};

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
