"use client"

import {FormEvent, useEffect, useRef} from 'react'
import React, { useState } from "react";
import Webcam from "react-webcam";
import {getSession} from "next-auth/react";
export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const webcamRef = useRef<Webcam | null>(null);
    const [photo, setPhoto] = useState("");
    async function isSession() {
        const session = await getSession();
        if (!session) {
            window.location.href = "/api/auth/signin";
        }
        setIsLoading(false);
        sessionStorage.setItem('user-email', String(session?.user?.email));
    }

    useEffect(() => {
        isSession();
    }, []);

    // Rest of your component

    if (isLoading) {
        return <div>Loading...</div>;
    }

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

        formData.append('user-email', String(sessionStorage.getItem('user-email')));

        const fetchResponse = await fetch('/api/plants',
            {
                method: 'POST',
                body: formData,
            })

        window.location.reload();
    }

    return (
        <>
            <form onSubmit={onSubmit} encType="multipart/form-data" className='pt-16'>
                <input type="text" name="plant-name" placeholder="Nom de la plante" required={true}/>
                <input type="file" name="images" multiple/>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                />
                <br></br>
                {photo && <img src={photo} alt="The taken photo"/>}
                <br></br>
                <button type="button" onClick={capture}>Capture photo</button>
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}