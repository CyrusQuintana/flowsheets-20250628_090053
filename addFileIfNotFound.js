function addFileIfNotFound(folderId, fileName, mimeType) {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByName(fileName);
  
  if (!files.hasNext()) {
    const file = folder.createFile(fileName, '', mimeType);
    return file;
  }
  
  return files.next();
}