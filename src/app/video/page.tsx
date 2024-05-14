import VideoCall from "@/components/ui/videoCall/videoCall";
import { Container } from "@mui/material";
import React from "react";

const VideoCalling = ({
    searchParams,
}: {
    searchParams: { videoCallingId: string };
}) => {
    const videoCallingId = searchParams.videoCallingId;

    return (
        <Container sx={{ height: "100vh" }}>
            <VideoCall videoCallingId={videoCallingId} />
        </Container>
    );
};

export default VideoCalling;
