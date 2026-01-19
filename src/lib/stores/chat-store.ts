import { create } from "zustand";
import type {
  User,
  Conversation,
  Message,
  ConversationWithParticipants,
} from "@/types/database.types";

interface ChatState {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // Conversations
  conversations: ConversationWithParticipants[];
  setConversations: (conversations: ConversationWithParticipants[]) => void;
  addConversation: (conversation: ConversationWithParticipants) => void;
  updateConversation: (
    id: string,
    updates: Partial<ConversationWithParticipants>,
  ) => void;

  // Active conversation
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;

  // Messages for active conversation
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;

  // UI state
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Typing indicators
  typingUsers: Record<string, string[]>; // conversationId -> userIds
  setTypingUsers: (conversationId: string, userIds: string[]) => void;

  // Online users
  onlineUsers: Set<string>;
  setOnlineUsers: (users: Set<string>) => void;
  addOnlineUser: (userId: string) => void;
  removeOnlineUser: (userId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  // Current user
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  // Conversations
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
    })),
  updateConversation: (id, updates) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, ...updates } : c,
      ),
    })),

  // Active conversation
  activeConversationId: null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),

  // Messages
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, ...updates } : m,
      ),
    })),

  // UI state
  isSidebarOpen: true,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  // Typing
  typingUsers: {},
  setTypingUsers: (conversationId, userIds) =>
    set((state) => ({
      typingUsers: { ...state.typingUsers, [conversationId]: userIds },
    })),

  // Online users
  onlineUsers: new Set(),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  addOnlineUser: (userId) =>
    set((state) => {
      const newSet = new Set(state.onlineUsers);
      newSet.add(userId);
      return { onlineUsers: newSet };
    }),
  removeOnlineUser: (userId) =>
    set((state) => {
      const newSet = new Set(state.onlineUsers);
      newSet.delete(userId);
      return { onlineUsers: newSet };
    }),
}));
