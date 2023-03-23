import { useCallback, useEffect, useRef, useState } from "react";

interface Options {
  accept?: string;
  isMultiple?: boolean;
  isSingleFile?: boolean;
}

function useFileDrop(options?: Options) {
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onDragFile = useCallback(
    (event: DragEvent) => {
      if (!event?.dataTransfer?.files) return;
      const selectFiles = event.dataTransfer.files;
      const uploadFiles = Array.from(selectFiles);

      if (options?.isSingleFile) {
        setFiles(uploadFiles);
        return;
      }
      setFiles((prevFiles) => [...prevFiles, ...uploadFiles]);
    },
    [options?.isSingleFile],
  );

  const onDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragActive(false);
  }, []);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onDragFile(e);
      setIsDragActive(false);
    },
    [onDragFile],
  );

  useEffect(() => {
    if (!labelRef.current) return;

    labelRef.current.addEventListener("dragenter", onDragEnter);
    labelRef.current.addEventListener("dragleave", onDragLeave);
    labelRef.current.addEventListener("dragover", onDragOver);
    labelRef.current.addEventListener("drop", onDrop);

    return () => {
      labelRef.current?.removeEventListener("dragenter", onDragEnter);
      labelRef.current?.removeEventListener("dragleave", onDragLeave);
      labelRef.current?.removeEventListener("dragover", onDragOver);
      labelRef.current?.removeEventListener("drop", onDrop);
    };
  }, [labelRef, onDragEnter, onDragLeave, onDragOver, onDrop]);

  useEffect(() => {
    if (!inputRef.current || !options) return;
    if (options.accept) inputRef.current.setAttribute("accept", options.accept);
    if (options.isMultiple)
      inputRef.current.setAttribute("multiple", "multiple");
  }, [inputRef, options]);

  return {
    inputRef,
    labelRef,
    files,
    isDragActive,
  };
}

export default useFileDrop;
