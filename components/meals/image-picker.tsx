'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import classes from './image-picker.module.css';

type Props = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: Props) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);

  function handleImageClick() {
    imageInput.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const fileReader = new FileReader();

      fileReader.onload = () => {
        setPickedImage(fileReader.result as string);
      };

      fileReader.readAsDataURL(file);
    } else {
      setPickedImage(null);
      return;
    }
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image selected yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image selected by the user." fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleImageClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
