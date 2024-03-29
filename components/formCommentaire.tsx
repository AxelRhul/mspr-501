"use client";

import { FormEvent } from "react";

interface Plant {
  id: string;
}

const FormCommentaire = ({ id }: Plant) => {

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await fetch(`/api/plants/${id}/comments`,
      {
        method: 'POST',
        body: formData,
      })

    window.location.reload();
  }

  return (
    <form className="absolute left-32 top-[600px] w-96" onSubmit={handleSubmit}>
      <div className="flex flex-col items-start justify-center space-y-2">
        <input className="border-2 border-[#80CC28] w-full rounded-lg py-2 px-2" type="text" name="name" placeholder="Votre nom" required={true} />
        <input className="border-2 border-[#80CC28] w-full rounded-lg py-2 px-2" type="text" name="comment" placeholder="Votre Commentaire" required={true} />
        <button className="bg-[#80CC28] py-2 px-2 w-full rounded-xl text-[#FCFCFC]" type="submit">Submit</button>
      </div>
    </form>
  )
}

export default FormCommentaire;