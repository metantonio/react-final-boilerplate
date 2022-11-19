import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";
import { AdvancedVideo } from '@cloudinary/react';

//librerías para transformación de video
// Import required actions and qualifiers.
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

export const SubirCloudinary = () => {
    const { store, actions } = useContext(Context);
    const cloudName = "dbvcycuqu"; // replace with your own cloud name
    const uploadPreset = "aplicacionPrueba";
    let cloudConfig = new CloudConfig({ cloudName: 'dbvcycuqu' });
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'demo'
        }
    });

    let urlConfig = new URLConfig({ secure: true });

    // Instantiate and configure a CloudinaryImage object.
    let myImage = new CloudinaryImage('../super/komccsy9homxbml3zhcu', cloudConfig, urlConfig);
    const myVideo = cld.video('docs/walking_talking');

    // Apply the transformation.
    myVideo.resize(fill().width(150).height(150)
        .gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces())))) // Crop the video, focusing on the faces.
        .roundCorners(byRadius(20));    // Round the corners.


    function showUploadWidget() {
        Cloudinary.openUploadWidget({
            cloudName: "dbvcycuqu",
            uploadPreset: "super",
            sources: ["local", "url", "camera", "image_search", "google_drive", "facebook", "dropbox", "instagram", "shutterstock", "getty", "istock", "unsplash"], googleApiKey: "<image_search_google_api_key>",
            showAdvancedOptions: true,
            cropping: true,
            multiple: false,
            defaultSource: "local",
            styles:
            {
                palette: { window: "#FFFFFF", windowBorder: "#90A0B3", tabIcon: "#0078FF", menuIcons: "#5A616A", textDark: "#000000", textLight: "#FFFFFF", link: "#0078FF", action: "#FF620C", inactiveTabIcon: "#0E2F5A", error: "#F44235", inProgress: "#0078FF", complete: "#20B832", sourceBg: "#E4EBF1" },
                fonts: { default: { active: true } }
            }
        },
            (err, info) => {
                if (!err) {
                    console.log("Upload Widget event - ", info);
                }
            });
    }

    const myWidget = cloudinary.createUploadWidget({
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        folder: 'super'
    }, async (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info); //en result.info.public_id cotiene la ruta de la imagen en cloudinary
            let response = await actions.fetchProtegido("/subirImagen", { ruta: result.info.url }, "POST")
            response = await response.json()
            console.log(response)
        }
    })

    useEffect(() => {
        document.getElementById("upload_widget").addEventListener(
            "click",
            function () {
                myWidget.open();
            },
            false
        );
    }, [])


    return (
        <>
            <h1>vista de subir imagen a cloudinary</h1>
            <div>
                <AdvancedImage cldImg={myImage} />
                <AdvancedVideo cldVid={myVideo} controls />
            </div>
            <button id="upload_widget" className="cloudinary-button">Upload files</button>
            <img src="http://res.cloudinary.com/dbvcycuqu/image/upload/v1668822072/super/tllduqpquh1fowsnfjc8.jpg"></img>

        </>
    )
}