"use client";

import { useEffect } from "react";
import { Button } from "@heroui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Something went wrong…
      </h2>
      <p className="text-default-600 text-sm max-w-md">
        This page hit an unexpected error. Try again below, or refresh the page
        if it keeps happening.
      </p>
      <Button
        color="primary"
        radius="full"
        variant="shadow"
        onPress={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
