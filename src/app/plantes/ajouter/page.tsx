"use client"

import { FormEvent } from 'react'


export default function Page() {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const fetchResponse = await fetch('/api/plants',
            {
                method: 'POST',
                body:  formData,
            })

    }
    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <input type="text" name="name" />
            <input type={"text"} name={"plant-name"}/>
            <input type="file" name="images" multiple />
            <button type="submit">Submit</button>
        </form>
    )
}