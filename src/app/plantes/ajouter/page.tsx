"use client"

import {FormEvent, useEffect, useRef} from 'react'
import React, { useState } from "react";
import Webcam from "react-webcam";
import {getSession} from "next-auth/react";
export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const webcamRef = useRef(null);
    const [photo, setPhoto] = useState("");
    async function isSession() {
        const session = await getSession();
        if (!session) {
            window.location.href = "/api/auth/signin";
        }
        console.log(session.user.email);
        setIsLoading(false);
        sessionStorage.setItem('user-email', session.user.email);
    }

    useEffect(() => {
        isSession();
    }, []);

    // Rest of your component

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
            const file = new File([blob], "photo.png", {type: "image/png"});

            formData.append('images', file);
        }

        formData.append('user-email', sessionStorage.getItem('user-email'));

        const fetchResponse = await fetch('/api/plants',
            {
                method: 'POST',
                body: formData,
            })

        window.location.reload();
    }

    return (
        <>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <input type="text" name="plant-name" placeholder="Nom de la plante" required={true}/>
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