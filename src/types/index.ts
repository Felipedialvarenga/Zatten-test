export type Chat = {
    id: number;
    title: string;
    thread_id: string;
    user_id: string;
    created_at: string;
  };

export type MessageRole = "user" | "assistant";

export type MessageText = {
    value: string;
}

export type MessageContent = {
  type: string;
  text: MessageText;
};

export type Message = {
  id: string;
  role: MessageRole;
  content: MessageContent[];
};
