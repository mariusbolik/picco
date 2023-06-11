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

  const addFile = (value) => {
    value.ext = value.type.split("/")[1].toUpperCase();
    value.megabytes = humanFileSize(value.size);
    value.progress = 0;
    console.log(value);

    if (files.find((file) => file.name === value.name)) {
      console.log("File already exists!");
      return;
    }
    setFile((prevData) => [value].concat(prevData));
    // confetti({
    //   particleCount: 40,
    //   spread: 20
    // });
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
      <div className="card">
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
                  <img src="https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*" />
                </div>

                <span className="file-meta">
                  <p className="file-name">{file.name}</p>
                  <p className="file-info">
                    {file.ext} • {file.megabytes}
                  </p>
                  <div className="progress-bar">
                    <div className="progress" style={{'width': file?.progress}}></div>
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
