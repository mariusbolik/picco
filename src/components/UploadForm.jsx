import {
  Card,
  Title,
  Text,
  Grid,
  List,
  ListItem,
  Flex,
  Icon,
  Bold,
  ProgressBar,
} from "@tremor/react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Player } from "@lottiefiles/react-lottie-player";
import confetti from "canvas-confetti";

import Link from 'iconoir/icons/link.svg'

const fileTypes = ["JPG", "PNG", "GIF"];

export default function UploadForm() {
  const [count, setCount] = useState(50);
  const [files, setFile] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const addFile = async (value) => {

    if (!value) {
      return;
    }

    await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(value)
  
      reader.onload = (e) => {
        const blob = new Blob([e.target.result], { type: value.type});
        value.previewUrl = URL.createObjectURL(blob);
        resolve(value.previewUrl);
      }
    });
    value.ext = value.type.split("/")[1].toUpperCase();
    value.megabytes = humanFileSize(value.size);
    value.progress = 0;

    console.log(value);

    if (files.find((file) => file.name === value.name)) {
      console.log("File already exists!");
      return;
    }
    setFile((prevData) => [value].concat(prevData));
    confetti({
      particleCount: 40,
      spread: 20,
      colors: ['#b1d6c9', '#74b1ff', '#f7d6c8']
    });

    console.log('File List:', files)
    // setInterval(() => {
    //   const fileName = 'Bildschirmfoto 2023-05-22 um 21.53.37.png';
    //   setFile((prevData) => prevData.find(file => file.name === fileName).progress = 50);
    //   // if (files.length) {
    //   //   files[0].progress++;
    //   //   console.log('Progress:');
    //   // }

    // }, 500);
  };

  function humanFileSize(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  }

  return (
    <main>
      {/* <div className={isActive ? "animate__animated animate__pulse" : ""}> */}
      <div className="card animate__animated animate__fadeInDown">
        <Player
          autoplay
          loop
          src="https://assets1.lottiefiles.com/packages/lf20_GxMZME.json"
          style={{ height: "250px", width: "250px" }}
          className="lottie-upload-animation"
        ></Player>
        <FileUploader
          onDraggingStateChange={setIsActive}
          handleChange={addFile}
          name="file"
          types={fileTypes}
        />

        <div className="file-list">
          {files.map((file) => (
            <div
              className="list-item animate__animated animate__backInDown"
              key={file.name}
            >
              <div className="item-inner grow-item">
                <div className="img-preview">
                  <img src={file?.previewUrl} />
                </div>

                <span className="file-meta">
                  <p className="file-name">{file?.name}</p>
                  <p className="file-info">
                    {file.ext} • {file.megabytes}
                  </p>
                  <div className="progress-bar">
                    <div className="progress" style={{'width': file?.progress + 'px'}}></div>
                  </div>
                </span>
                <span className="fab">
                  <img src={Link} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
