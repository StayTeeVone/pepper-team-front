export interface IMessage {
    id_messages: number;
    message: string;
    id_user: number;
    id_friend: number;
    status: number;
    messageDate: string;
    unFormatDate: string;
}