export default interface IGetChatsResponse {
  _id: string;
  roomId: string;
  senderId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  senderData: {
    user_id: number;
    email: string;
    firstname: string;
    lastname: string;
    profile_picture: string;
    birthdate: string;
    nickname: string;
    job: string;
    age: number;
  };
}
