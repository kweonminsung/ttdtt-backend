export class CommonResponseDto<T = void> {
  message: string;

  constructor(message: string, object?: T) {
    this.message = message;
    object && Object.assign(this, object);
  }
}
