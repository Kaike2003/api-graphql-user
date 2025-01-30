export class UserExistedError extends Error {
  constructor(message: string, ...args: any[]) {
    super(message, ...args);

    this.message = message;
    this.name = "UserExistedError";
  }
}
