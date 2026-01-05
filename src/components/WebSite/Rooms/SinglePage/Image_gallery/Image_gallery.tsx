"use client";

import { RoomImage } from "@prisma/client";
import React from "react";
import ImageGallery from "react-image-gallery";
import Image from "next/image";
import "react-image-gallery/styles/css/image-gallery.css";

const MyGallery = ({ images }: { images: RoomImage[] }) => {
    const imageSlides = images.map((img) => ({
        original: img.imageUrl,
        thumbnail: img.imageUrl,
    }));

    const renderItem = (item: { original: string }) => (
        <div className="image-gallery-image">
            <Image
                src={item.original}
                alt="room"
                width={800} // الحجم المناسب حسب تصميمك
                height={500}
                className="rounded-md object-cover"
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    );

    return <ImageGallery items={imageSlides} renderItem={renderItem} />;
};

export default MyGallery;
