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
import confetti from 'canvas-confetti';

const fileTypes = ["JPG", "PNG", "GIF"];

export default function UploadForm() {
  const [count, setCount] = useState(50);
  const [files, setFile] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const addFile = (value) => {
    console.log(value);
    setFile((prevData) => [value].concat(prevData));
    // confetti({
    //   particleCount: 40,
    //   spread: 20
    // });
  };

  const draggingState = (fileOverForm) => {
    console.log(dState);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <main>
      <div className={isActive ? "animate__animated animate__pulse" : ""}>
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

          {files.map((transaction) => (
            <div
              className="list-item animate__animated animate__backInDown"
              key={transaction.name}
            >
              <div className="item-inner grow-item">
                <p>{transaction.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
