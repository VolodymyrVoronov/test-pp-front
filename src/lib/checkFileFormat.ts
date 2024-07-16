export const checkFileFormat = (file: File, extension: string): boolean => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (!extension) {
    throw new Error("No extension provided");
  }

  return file.name.split(".")[1].toLocaleLowerCase() === extension;
};
