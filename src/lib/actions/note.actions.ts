"use server";

import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import { Note } from "../models/note.model";
import { User } from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function getNotes(communityId: string) {
  try {
    connectToDB();

    const notes = await Note.find({ communityId });
    if (!notes) {
      throw new Error("No notes found!");
    }
    return notes;
  } catch (error) {
    console.log("Error getting notes: ", error);
  }
}

interface Params {
  communityId: string;
  pdfLink: string;
  title: string;
  description: string;
  author: string;
  pathname: string;
}

export async function addNotes({
  communityId,
  pdfLink,
  title,
  description,
  author,
  pathname,
}: Params) {
  try {
    connectToDB();

    const community = await Community.findById(communityId);

    if(!community){
      throw new Error("Community not found");
    }
    const newNote = await Note.create({
      communityId,
      pdfLink,
      title,
      description,
      author,
    });

    await newNote.save();

    community.notes.push(newNote);
    await community.save();

    revalidatePath(pathname); // Revalidate the path after creating the note
  } catch (error) {
    console.log("Error in adding a note: ", error);
  }
}
