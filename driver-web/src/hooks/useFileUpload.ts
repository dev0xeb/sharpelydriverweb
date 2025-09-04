import { useState } from 'react';

export interface FileUploadState {
  [key: string]: File | null;
}

export const useFileUpload = <T extends Record<string, File | null>>(initialState: T) => {
  const [files, setFiles] = useState<T>(initialState);

  const uploadFile = (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [field]: file }));
    }
  };

  const removeFile = (field: keyof T) => {
    setFiles(prev => ({ ...prev, [field]: null }));
  };

  const clearAllFiles = () => {
    const clearedState = Object.keys(files).reduce((acc, key) => {
      (acc as any)[key] = null;
      return acc;
    }, {} as T);
    setFiles(clearedState);
  };

  const hasFile = (field: keyof T): boolean => {
    return files[field] !== null;
  };

  const getAllFiles = (): File[] => {
    return Object.values(files).filter((file): file is File => file !== null);
  };

  return {
    files,
    uploadFile,
    removeFile,
    clearAllFiles,
    hasFile,
    getAllFiles
  };
};
