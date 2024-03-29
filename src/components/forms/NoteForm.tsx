"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { addNotes } from "@/lib/actions/note.actions";

const notesFormSchema = z.object({
  notesTitle: z.string().min(2, {
    message: "notes title must be at least 2 characters.",
  }),
  notesLink: z.string().url(),
  notesDescription: z
    .string()
    .min(20, {
      message: "notes description must be at least 2 characters.",
    })
    .max(500, {
      message: "notes description must be at under 500 characters.",
    }),
});

const NotesForm = ({communityId, userId}:{communityId:string, userId: string}) => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof notesFormSchema>>({
    resolver: zodResolver(notesFormSchema),
    defaultValues: {
      notesTitle: "",
      notesLink: "",
      notesDescription: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof notesFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await addNotes({
      communityId,
      pdfLink:values.notesLink,
      title:values.notesTitle,
      description:values.notesDescription,
      author: userId,
      pathname
    });

    router.push(`/communities/${communityId}/notes`);
  }

  return (
    <>
      <div className="h-screen bg-secondary-3">
        <h1 className="mb-5 pt-16 text-center font-primary text-5xl font-bold">
          Upload Notes
        </h1>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="m-auto grid gap-4 w-3/5"
            >
              <FormField
                control={form.control}
                name="notesTitle"
                render={({ field }) => (
                  <FormItem className="gap-y-4">
                    <FormLabel className="font-secondary text-xl font-semibold">
                      Notes Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="notes Title" {...field} />
                    </FormControl>
                    <FormDescription>This is your notes Title.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notesLink"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="font-secondary text-xl font-semibold">
                      Notes link
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>paste a link (20mb max)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notesDescription"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="font-secondary text-xl font-semibold">
                      Notes Description
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Write the description about Notes</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-6 bg-secondary-6 hover:bg-secondary-5"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default NotesForm;
