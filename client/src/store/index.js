import { createSlice, configureStore } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        userMessages: [],
        isLoading : false,
        language : ""
    },
    reducers: {
        addLanguageHandler: (state, action) => {
            const language = action.payload;
            state.language = language
        },
        addMessagesHandler: (state, action) => {
            const { text, time, sender, isLoading } = action.payload;

            // Add user message
            state.userMessages.push({ msg: text, time, sender });
            state.isLoading = isLoading
        },

        closeSectionHandler : (state,action) => {
            console.log('closing session...')
            state.isLoading = false
        }
    }
});

export const projectActions = projectSlice.actions;

const store = configureStore({
    reducer: {
        project: projectSlice.reducer
    }
});

export default store;
