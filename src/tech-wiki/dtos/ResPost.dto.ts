export class ResPostDTO {
  id: number;
  thumbnail: string;
  title: string;
  date: string;
  content: string;
  writer: {
    profile_img: string;
    nickname: string;
  };
}
