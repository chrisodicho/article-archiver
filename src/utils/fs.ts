// https://davidwells.io/snippets/node-file-utilities

import path from 'path';
import rimraf from 'rimraf';
import { promises, constants } from 'fs';

const fs = promises;

const deleteDir = (dir: string): Promise<void> => new Promise((resolve) => rimraf(dir, () => resolve()));

const deleteFile = (filePath: string) =>
  fs.unlink(filePath).catch((error) => {
    if (error.code === 'ENOENT') return; // ignore already deleted files
    throw error;
  });

const fileExists = (filePath: string) =>
  fs
    .access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);

// Recursive read dir
async function readDir(dir: string, recursive = true, allFiles: string[] = []) {
  const files: string[] = (await fs.readdir(dir)).map((file) => path.join(dir, file));
  if (!recursive) return files;
  allFiles.push(...files);
  await Promise.all(
    files.map(async (file) => {
      return (await fs.stat(file)).isDirectory() && readDir(file, recursive, allFiles);
    }),
  );
  return allFiles;
}

async function createDir(directoryPath: string, recursive = true) {
  // ignore errors - throws if the path already exists
  return fs.mkdir(directoryPath, { recursive: recursive }).catch((error) => {
    console.error('createDir error');
    console.error(error);
  });
}

async function copyDir(src: string, dest: string, recursive = true) {
  await createDir(dest, recursive); // Ensure directory exists

  const filePaths = await fs.readdir(src);
  await Promise.all(
    filePaths.map(async (item) => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const itemStat = await fs.lstat(srcPath);

      if (itemStat.isFile()) {
        return fs.copyFile(srcPath, destPath);
      }
      // Return early if recursive false
      if (!recursive) return;
      // Copy child directory
      return copyDir(srcPath, destPath, recursive);
    }),
  );
}

module.exports = {
  // Check if file exists
  fileExists: fileExists,
  // Write file
  writeFile: fs.writeFile,
  // Read file
  readFile: fs.readFile,
  // Copy file
  copyFile: fs.copyFile,
  // Delete file
  deleteFile: deleteFile,
  // Check if directory exists
  directoryExists: fileExists,
  // Recursively create directory
  createDir: createDir,
  // Recursively get file names in dir
  readDir: readDir,
  // Recursively copy directory
  copyDir: copyDir,
  // Recursively delete directory & contents
  deleteDir: deleteDir,
};
