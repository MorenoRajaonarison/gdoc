"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
const params = useParams()

  return (
    <LiveblocksProvider publicApiKey={"pk_dev_0dR2n06o3S4JthM81f7-LafgvrAgvZFNB-jock_puS3be9MyHVe0VkSz37Xn5F2x"}>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}