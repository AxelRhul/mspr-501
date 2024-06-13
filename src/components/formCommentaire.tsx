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
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-start justify-center space-y-2 md:space-y-4">
        <input className="border-2 border-[#80CC28] w-full rounded-lg p-2" type="text" name="name" placeholder="Votre nom" required={true} />
        <input className="border-2 border-[#80CC28] w-full rounded-lg p-2" type="text" name="comment" placeholder="Votre Commentaire" required={true} />
        <button className="bg-[#80CC28] p-2 w-full rounded-xl text-[#FCFCFC] text-base md:text-lg font-semibold" type="submit">Submit</button>
      </div>
    </form>
  )
}

export default FormCommentaire;