export function removeCwd(path: string): string {
  return path.replace(process.cwd() + '/', '');
}
