"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTeamAPI } from "@/api/teamRequest";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  description: z.string(),
  //   imageUrl: z.string().min(1, {
  //     message: "Server image is required",
  //   }),
});

type FormData = z.infer<typeof formSchema>;

interface CreateServerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateServerModal({
  open,
  onOpenChange,
}: CreateServerModalProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      //   imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormData) => {
    try {
      await createTeamAPI(data.name, data.description);
      onOpenChange(false);
      form.reset();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-800 shadow-2xl text-white border-0">
        <DialogHeader>
          <DialogTitle>Details about your team</DialogTitle>
          <DialogDescription>
            Give your team a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel className="text-sm text-zinc-200 uppercase font-bold">
                    Server name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="focus-visible:ring-0 border-0 bg-zinc-900 text-white focus-visible:ring-offset-0"
                      placeholder="Name your team"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel className="text-sm text-zinc-200 uppercase font-bold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="focus-visible:ring-0 border-0 bg-zinc-900 text-white focus-visible:ring-offset-0"
                      placeholder="Inform others of the purpose of this team"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={isLoading}
                className="bg-indigo-500 hover:bg-indigo-600 ml-auto"
                type="submit"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
