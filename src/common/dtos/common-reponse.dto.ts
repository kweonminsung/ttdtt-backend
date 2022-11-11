export class commonResponseDto<T> {
  message: string;

  constructor(message: string, object: T) {
    this.message = message;
    Object.assign(this, object);
  }
}
