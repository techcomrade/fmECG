import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiLoadingStatus } from '../../utils/loadingStatus';
import { createAsyncThunkWrap } from '../handler';
import { MessageSchema, MessageRequest, Service } from '../../api';

interface IChatState {
    messages: MessageSchema[];
    latestMessages: MessageSchema[];
    loadGetMessageStatus: ApiLoadingStatus;
    loadSendMessageStatus: ApiLoadingStatus;
    loadGetLatestMessageStatus: ApiLoadingStatus;
    errorMessage: string | undefined;
}

const initialState: IChatState = {
    messages: [],
    latestMessages: [],
    loadGetMessageStatus: ApiLoadingStatus.None,
    loadSendMessageStatus: ApiLoadingStatus.None,
    loadGetLatestMessageStatus: ApiLoadingStatus.None,
    errorMessage: undefined,
};

export const loadMessages = createAsyncThunkWrap(
    "/chat/messages",
    async (messageRequest: { groupChatId: string }) => {
        return await Service.chatService.loadMessages(messageRequest.groupChatId)
    }
);

export const sendMessage = createAsyncThunkWrap(
    "/chat/send",
    async (messageRequest: MessageRequest) => {
        return await Service.chatService.sendMessage(messageRequest)
    }
);

export const getLatestMessages = createAsyncThunkWrap(
    "/chat/latest_messages",
    async () => {
        return await Service.chatService.getLatestMessages();
    }
)


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        resetGetMessageStatus: (state) => {
            state.loadGetMessageStatus = ApiLoadingStatus.None;
        },
        resetSendMessageStatus: (state) => {
            state.loadSendMessageStatus = ApiLoadingStatus.None;
        },
        resetGetLatestMessageStatus: (state) => {
            state.loadGetLatestMessageStatus = ApiLoadingStatus.None;
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMessages.pending, (state) => {
                state.loadGetMessageStatus = ApiLoadingStatus.Loading;
            })
            .addCase(loadMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.loadGetMessageStatus = ApiLoadingStatus.Success;
            })
            .addCase(loadMessages.rejected, (state, action) => {
                state.errorMessage = (action.payload as any)?.message || "Unknown error";
                state.loadGetMessageStatus = ApiLoadingStatus.Failed;
            })
            .addCase(sendMessage.pending, (state) => {
                state.loadSendMessageStatus = ApiLoadingStatus.Loading;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loadSendMessageStatus = ApiLoadingStatus.Success;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.errorMessage = (action.payload as any)?.message || "Unknown error";
                state.loadSendMessageStatus = ApiLoadingStatus.Failed;
            })
            .addCase(getLatestMessages.pending, (state) => {
                state.loadGetLatestMessageStatus = ApiLoadingStatus.Loading;
            })
            .addCase(getLatestMessages.fulfilled, (state, action) => {
                state.latestMessages = action.payload;
                state.loadGetLatestMessageStatus = ApiLoadingStatus.Success;
            })
            .addCase(getLatestMessages.rejected, (state, action) => {
                state.errorMessage = (action.payload as any)?.message || "Unknown error";
                state.loadGetLatestMessageStatus = ApiLoadingStatus.Failed;
            })
    },
});

export const {
    resetGetMessageStatus,
    resetSendMessageStatus,
    resetGetLatestMessageStatus
} = chatSlice.actions;

export default chatSlice.reducer;
