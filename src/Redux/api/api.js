import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Provided Tags - IT IS USED IN QUERIES  -It is a query . It specifies the tag that this query provide This SPECIFIC data . Thus when we apply INVALIDATE TAGS on a mutation then it will refetch the data of the query which provides this tag on the given mutation

// invalidatesTags: IT IS USED IN MUTATION - Specifies the tags that this mutation invalidates. After the mutation is performed, the associated tags are invalidated, triggering re-fetches for any queries that use those tags.

// Simple words

// Query - when the query is executed the data is fetched and it is cached with the Specified tags

// Mutation - when a muatation is executed the data , It Invalidates the specified tags causing any queries associated with those tags to be refetched

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  tagTypes: ["Chat", "User", "Messages"],
  //   Done for caching the data

  endpoints: (builder) => ({
    // Define the endpoints as per the backend API

    myChats: builder.query({
      query: () => ({
        url: "chat/Mychats",
        credentials: "include",
        // This specifies that the request should include cookies for the authentication purpose
      }),
      providesTags: ["Chat"],
      // It is used for cahing the data and it provide tags which signifiess that the data is related to chat and whenever the data is updated it can trigger refetching of the chats data
    }),

    searchUser: builder.query({
      query: (username) => ({
        url: `chat/Search?username=${username}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "notif/sendnotif",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getNotification: builder.query({
      query: () => ({
        url: "notif/getmynotif",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
      // we are not doing its caching
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "notif/accept",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    chatDetails: builder.query({
      query: (chatId) => ({
        url: `chat/Chatdetails/${chatId}`,
        // : is used in server side not in the url String side
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    // Infinite Scrool
    // Query for pages
    GetMessages: builder.query({
      query: ({ chatId, page = 1, limit = 10 }) => ({
        url: `message/GetMessage/${chatId}`,
        params: { page, limit }, // Query parameters for pagination
        // : is used in server side not in the url String side
        method: "GET",
        credentials: "include",
      }),
      // keepUnusedDataFor: 0,
      providesTags: (result, error, { chatId }) => [{ type: 'Messages', id: chatId }],
      //  providesTags: (result, error, { chatId }) => [{ type: 'Messages', id: chatId }],

      //  We wil not save data in cache because it poses problem because of frquent reloading needs
    }),

    // Problem
    // I have to send chatId as well as data which includes file or message
    sendAttachments: builder.mutation({
      query: ({ chatId, data }) => ({
        url: `message/sendAttachment/${chatId}`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Messages"],
      // wherever we will add this tag then at point Messages will be refetched
    }),



    sendMessageOnly: builder.mutation({
      query: ({ chatId, message }) => ({
        url: `message/send/${chatId}`,
        method: "POST",
        credentials: "include",
        body: {message},
      }),
      invalidatesTags: (result , error , {chatId}) => [{type: "Messages", id:chatId}],
      // wherever we will add this tag then at point Messages will be refetched
    }),

    myGroups: builder.query({
      query: () => ({
        url: "chat/Mygroupchats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "chat/Group",
        method: "POST",
        credentials: "include",
        body: { name, members },
      }),
      invalidatesTags: ["Chat"],
    }),


    newChat: builder.mutation({
      query: ( {receiverId} ) => ({
        url: "chat/Onechat",
        method: "POST",
        credentials: "include",
        body: { receiverId },
      }),
      invalidatesTags: ["Chat"],
    }),

    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/RenameGroup/${chatId}`,
        method: "POST",
        credentials: "include",
        body: { name },
        // This data will be sent
      }),
      invalidatesTags: ["Chat"],
    }),

    removeGroupMember: builder.mutation({
      query: ({ chatId, memberId }) => ({
        url: `chat/RemoveMembers`,
        method: "POST",
        credentials: "include",
        body: { chatId, memberId },
        // This data will be sent
      }),
      invalidatesTags: ["Chat"],
    }),

    addGroupMember: builder.mutation({
      query: ({ chatId, memberId }) => ({
        url: `chat/AddMembers`,
        method: "POST",
        credentials: "include",
        body: { chatId, memberId },
        // This data will be sent
      }),
      invalidatesTags: ["Chat"],
      // 1. The invalidate tags tells the RTK query that the associated data is now outdated if some or changes mutation happens and thus should be refetched so that the application is uptodate with the server

      // 2. Tags helps the RTK query which cached data needs to be invalidated and potentially refetched.
      // whne mutation occurs tags are invalidated( means outdated) thus promptinf to reftch the latest data
    }),

    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chat/DeleteGroup/${chatId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),


    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/LeaveGroup/${chatId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useSendMessageOnlyMutation,
  useMyGroupsQuery,
  useNewGroupMutation,
  useNewChatMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMemberMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
} = api;
// this endpoints are generated by redux
