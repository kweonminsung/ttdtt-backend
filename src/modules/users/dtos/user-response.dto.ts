export class userResponseDto {
  id: number;
  username: string;
  email: string;
  image_no: number;

  constructor(id: number, username: string, email: string, image_no: number) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.image_no = image_no;
  }
}
