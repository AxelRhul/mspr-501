"use client"
import {FormEvent, useEffect, useRef} from 'react'
import React, { useState } from "react";
import Webcam from "react-webcam";

export default function PhotoTaker({plantId} : {plantId: string}) {
    const [photo, setPhoto] = useState("");

    const webcamRef = useRef<Webcam | null>(null);

    const capture = () => {
        if(webcamRef.current === null) return;
        const imageSrc = webcamRef.current.getScreenshot();
        setPhoto(String(imageSrc));
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        if (photo !== "") {
            const response = await fetch(photo);
            const blob = await response.blob();
            const file = new File([blob], "photo.png", {type: "image/png"});

            formData.append('images', file);
        }

        const fetchResponse = await fetch('/api/plants/'+plantId+'/image',
            {
                method: 'POST',
                body: formData,
            })

        window.location.reload();
    }

    return (
        <>
        <form onSubmit={onSubmit} encType="multipart/form-data">
                    <input type="file" name="images" multiple/>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                    />
                    <button type="submit">Submit</button>
                </form>
                <button onClick={capture}>Capture photo</button>
                {photo && <img src={photo} alt="The taken photo"/>}
        </>
    )
}
