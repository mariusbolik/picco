import { useState } from "react";
import { Container, Row, Col } from 'react-grid-system';

const directLink = "https://picco.co/img/jhHS89edhWe8.png";
const embedCode = `<img src="${directLink}" alt="Name of the Pic" />`;
const bbCode = `[url=https://ibb.co/Pz6MdVf][img]${directLink}[/img][/url]`;

export default function ImagePreview() {
  const [count, setCount] = useState(50);
  const [files, setFile] = useState([]);
  const [isActive, setIsActive] = useState(false);

  function humanFileSize(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  }

  return (
    <main id="image-preview">
      <Container className="animate__animated animate__fadeInDown">
        <Row>
          <Col lg={8}>
            <div className="card">
              <img
                className="uploaded-image"
                src="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?cs=srgb&dl=pexels-pixabay-36717.jpg&fm=jpg"
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="card">
              <div className="file-sidebar">
                <div className="sidebar-item">
                  <p className="title">Name</p>
                  <p className="text">
                    amazing-animal-beautiful-beautifull.jpg
                  </p>
                </div>
                <div className="sidebar-item">
                  <p className="title">Uploaded</p>
                  <p className="text">2023/02/05 by Anonymous</p>
                </div>
                <div className="sidebar-item">
                  <p className="title">Direct Link</p>
                  <p className="text">
                    <a href="+" style={{ textDecoration: "none" }}>
                      {directLink}
                    </a>
                  </p>
                </div>
                <div className="sidebar-item">
                  <p className="title">HTML Embed Code</p>
                  <pre>
                    <code>{embedCode}</code>
                  </pre>
                </div>
                <div className="sidebar-item">
                  <p className="title">Forum Embed Code</p>
                  <pre>
                    <code>{bbCode}</code>
                  </pre>
                </div>
                <div className="sidebar-item">
                  <p className="title">Expires</p>
                  <p className="text">2023/07/03 • in 2 months</p>
                </div>
                <div className="sidebar-item">
                  <p className="title">Actions</p>
                  <span className="button" style={{ marginTop: "10px" }}>
                    Download
                  </span>
                  <span className="button" style={{ marginTop: "10px" }}>
                    Crop and Download
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
