import {
    createApiBuilder,
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { TChatMessage } from "@/types/common";
import { tagTypes } from "../tagTypes";

const chatApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMessages: singleQueryApiBuilder<TChatMessage[]>(build, "/chat", [
            tagTypes.chat,
        ]),
        updateMessage: updateApiBuilder(build, "/chat", [tagTypes.chat]),

        countUnread: queryApiBuilder<number>(build, "/chat/countUnread", [
            tagTypes.chat,
        ]),

        uploadFileMsg: createApiBuilder(
            build,
            "/chat/upload",
            [tagTypes.chat],
            { contentType: "multipart/form-data" }
        ),
    }),
});

export const {
    useGetMessagesQuery,
    useUpdateMessageMutation,
    useCountUnreadQuery,
    useUploadFileMsgMutation,
} = chatApi;
