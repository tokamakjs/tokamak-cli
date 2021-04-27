export class NoProjectFoundError extends Error {
  constructor() {
    super(`Could not find a valid tokamak project.`);
  }
}
