'use client';

import React, {useEffect, useState} from "react";
import Plant from "@/interface/plantInterface";

export function DisplayPlant({plant} : {plant: Plant}) {
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