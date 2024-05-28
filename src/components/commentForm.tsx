"use client";
import {SessionProvider} from "next-auth/react";
import CommentFormServer from "@/components/commentFormServer";

export default function CommentForm({session, plantId}) {
    return (
       <SessionProvider session={session}>
           <CommentFormServer plantId={plantId}></CommentFormServer>
       </SessionProvider>
    )
}