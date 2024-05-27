"use client"

import Header from '@/components/header';
import { FormEvent, useRef } from 'react'
import React, { useState } from "react";
import Webcam from "react-webcam";

export default function Page() {
    const webcamRef = useRef(null);
    const [photo, setPhoto] = useState("");

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPhoto(imageSrc);
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        if (photo !== "") {
            const response = await fetch(photo);
            const blob = await response.blob();
            const file = new File([blob], "photo.png", { type: "image/png" });

            formData.append('images', file);
        }

        console.log(formData.getAll('images'))

        const fetchResponse = await fetch('/api/plants',
            {
                method: 'POST',
                body: formData,
            })

        window.location.reload();
    }

    return (
        <>
            <form onSubmit={onSubmit} encType="multipart/form-data" className='flex flex-col'>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    className='mb-4 max-h-screen'
                />
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-between mx-auto my-4 space-x-4'>
                        <input className='border-2 border-[#80CC28] rounded-lg p-2' type="text" name="name" placeholder="Votre nom" required={true} />
                        <input className='border-2 border-[#80CC28] rounded-lg p-2' type="text" name="plant-name" placeholder="Nom de la plante" required={true} />
                    </div>
                    <button className='group flex flex-row items-center border-2 border-[#80CC28] rounded-lg p-2 mx-auto space-x-3 my-4 hover:bg-[#80CC28] hover:text-[#FCFCFC] hover:p-0' onClick={capture}>
                        <img className='group-hover:bg-[#FCFCFC] group-hover:p-2 group-hover:rounded-l-md' src="/img/camera.svg" alt="Appareil Photo" />
                        <span className='group-hover:pr-2'>Prendre une photo</span>
                    </button>
                    <div className='flex items-center justify-between mx-auto my-4 space-x-4'>
                        <input className='w-full' type="file" name="images" multiple />
                        <button className='bg-[#80CC28] hover:bg-[#6cb821] px-2 py-1 rounded-md text-[#FCFCFC]' type="submit">Submit</button>
                    </div>
                </div>
            </form>
            {photo && <img src={photo} alt="The taken photo" />}
        </>
    )
}