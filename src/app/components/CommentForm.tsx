"use client";
import {SessionProvider} from "next-auth/react";
import CommentFormServer from "@/app/components/CommentFormServer";

export default function CommentForm({session, plantId}) {
    return (
       <SessionProvider session={session}>
           <CommentFormServer plantId={plantId}></CommentFormServer>
       </SessionProvider>
    )
}