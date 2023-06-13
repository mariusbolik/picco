import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";

// Icons
import OpenNewWindowIcon from "iconoir/icons/open-new-window.svg";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function UploadForm() {
  const [files, setFile] = useState<FilePreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [uploadResult, setUploadResult] = useState<UploadResult>({});

  const addFile = async (file: File) => {
    if (!file) {
      return;
    }

    const _5mb = 5242880;
    if (file.size > _5mb) {
      alert("Max. 5mb per file!");
      return;
    }

    const filePreview = {
      name: file.name,
      previewUrl: URL.createObjectURL(file),
      ext: file.type.split("/")[1].toUpperCase(),
      megabytes: humanFileSize(file.size),
      progress: 0,
    };
    console.log(filePreview);

    if (files.find((item) => item.name === file.name)) {
      console.log("File already exists!");
      return;
    }

    setFile((prevData) => [filePreview].concat(prevData as any) as any);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.floor(
            (progressEvent.loaded * 100) / (progressEvent?.total || file.size)
          );
          console.log("progressEvent", progressEvent);
          setUploadProgress((prevState) => ({
            ...prevState,
            [file.name]: percentCompleted,
          }));
        },
      });

      console.log("Upload completed");

      setUploadResult((prevState) => ({
        ...prevState,
        [file.name]: `${location.protocol}//${location.host}/f/${response.data.$id}`,
      }));
    } catch (error) {
      console.error("Error while uploading file: ", error);
    }
  };

  function humanFileSize(size: number) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (
      Number((size / Math.pow(1024, i)).toFixed(2)) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  }

  return (
    <main id="upload-form">
      <div className="card animate__animated animate__fadeInDown">
        <Player
          autoplay
          loop
          src="https://assets1.lottiefiles.com/packages/lf20_GxMZME.json"
          style={{ height: "250px", width: "250px" }}
          className="lottie-upload-animation"
        ></Player>
        <FileUploader handleChange={addFile} name="file" types={fileTypes} />

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
                    <div
                      className="progress"
                      style={{
                        width: (uploadProgress[file.name] || 0) + "%",
                        background:
                          (uploadProgress[file.name] || 0) === 100
                            ? "#b1d6c9"
                            : "#75b0ff",
                      }}
                    ></div>
                  </div>
                </span>
                <a
                  className="fab"
                  href={uploadResult[file.name]}
                  target="_blank"
                  style={{
                    opacity: (uploadProgress[file.name] || 0) === 100 ? 1 : 0,
                  }}
                >
                  <img src={OpenNewWindowIcon} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

interface FilePreview {
  name: string;
  previewUrl: string;
  ext: string;
  megabytes: number;
  progress: number;
}

interface UploadProgress {
  [key: string]: number;
}

interface UploadResult {
  [key: string]: string;
}
