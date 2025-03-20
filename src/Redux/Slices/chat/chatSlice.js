import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axioInstance';
import websocketService from '../../../services/websocketService';


export const sendMessage = (messageData) => (dispatch) => {
    try {
      websocketService.sendMessage(messageData);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
// Fetch user's conversations
export const fetchUserConversations = createAsyncThunk(
  'chat/fetchUserConversations',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/conversations/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to load conversations.');
    }
  }
);


// Fetch conversation 
export const fetchConversationHistory = createAsyncThunk(
    'chat/fetchConversationHistory',
    async (conversation_id, { rejectWithValue }) => {
      try {
        // Connect to WebSocket for this conversation
        websocketService.connect(conversation_id);
        
        const response = await axiosInstance.get(`conversations/${conversation_id}/`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to load messages.');
      }
    }
  );

// Create a new conversation
export const createConversation = createAsyncThunk(
    'chat/createConversation',
    async (participantIds, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`conversations/create/`, { participants: participantIds });
        
        // After successfully creating the conversation, connect the WebSocket
        if (response.data && response.data.id) {
          websocketService.connect(response.data.id);
        }
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error || 'Failed to create conversation.');
      }
    }
  );

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: [],
    messages: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    clearChatError: (state) => {
      state.error = null;
    },
    receiveMessage: (state, action) => {
        const { conversationId, message } = action.payload;
        if (!state.messages[conversationId]) {
          state.messages[conversationId] = [];
        }
        state.messages[conversationId].push(message);
      },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Conversations
      .addCase(fetchUserConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchUserConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Conversation History
      .addCase(fetchConversationHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchConversationHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages[action.meta.arg] = action.payload.messages;
      })
      .addCase(fetchConversationHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Conversation
      .addCase(createConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations.push(action.payload);
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearChatError,receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
