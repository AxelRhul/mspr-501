'use client';

import React, {useEffect, useState} from "react";

export function DisplayPlant({plant}) {
    return (
        <>
            <h2>{plant.name}</h2>
            <p>Plante de {plant.user.name}</p>
            {plant.images.map((image) => (
                <img key={image.id} src={image.url} alt={plant.name}/>
            ))}
        </>
    )
}