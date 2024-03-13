"use client";
import {SessionProvider} from "next-auth/react";
import CommentForm from "@/app/components/CommentForm";

export default function Form({session, plantId}) {
    return (
       <SessionProvider session={session}>
           <CommentForm plantId={plantId}></CommentForm>
       </SessionProvider>
    )
}