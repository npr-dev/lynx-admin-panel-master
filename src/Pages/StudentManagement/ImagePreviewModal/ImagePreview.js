import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Form,
  ListGroupItem,
  Row,
  Col,
  ListGroup,
} from "reactstrap";
// import ImageGallery from 'react-image-gallery';
import "./ImagePreview.scss";
import { uploadStudentImage } from "../../../store/actions/studentAction";
import { connect } from "react-redux";

const ImagePreview = (props) => {
  // console.log("props in preview -->", props);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(
    props.bgImage ||
    "https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg"
  );
  const [loading, setloading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [file, setfile] = useState({
    value: "",
  });

  const { uploadStudentImage } = props;

  const toggle = () => {
    setModal(!modal);
  };

  const uploadImage = async (file) => {
    console.log("file => ", file);
    console.log("filename =>", file.name);
    let filename = file.name;
    if (filename.includes(".jpeg")) {
      // filename = filename.substr(0, filename.lastIndexOf(".jpeg")) + ".jpg";
      file = new File([file], "name.jpg", { type: "image/jpg" });
    }
    console.log("file after name change => ", file);

    // return;
    const data = new FormData();
    const newData = new FormData();

    data.append("file", file);

    newData.append("Image", file);
    newData.append("user_name", props.studentId);

    data.append("upload_preset", "lynx-admin");
    setloading(true);
    console.log("data",data)
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/n4beel/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    console.log("res",res)
    const fileUrl = await res.json();
    const url = fileUrl.secure_url;
    console.log("URL", url);
    const studentImage = {
      id: props.studentId,
      file: url,
    };
    const studentImageAI = {
      "0":{
        std_id: props.studentId,
        std_url: url,
      },
    }
    console.log("STUDENT IMAGE AI", studentImageAI);

    console.log("student Image", studentImage);
    const newRes = await fetch(
      "https://buspect-backend.tk/api/encode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" , 'Access-Control-Allow-Origin': "*"},
        body: JSON.stringify(studentImageAI),
      }
    );
    // console.log("AI Server Response", newRes);
    const data1 = await newRes.json()
    console.log('AI', data1)

    uploadStudentImage(studentImage);
    setloading(false);
    setfile({
      value: "",
    });
    toggle();
  };

  // const removeImage = async () => {
  //   const newData = new FormData();
  //   setDelLoading(true);

  //   newData.append("user_name", props.studentId);

  //   const newRes = await fetch("https://face-recognition-app.tk/api/delete", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: newData,
  //   });
  //   console.log("AI Server Response", newRes);

  //   uploadStudentImage({
  //     id: props.studentId,
  //     file: "",
  //   });
  //   setDelLoading(false);
  //   setImage(
  //     "https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg"
  //   );
  //   setfile({
  //     value: "",
  //   });
  //   toggle();
  // };

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    if (!beforeUpload(file)) {
      return;
    } else {
      setfile({
        value: file,
      });
    }

    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file && file.type === "image/jpeg";
    if (!isJpgOrPng) {
      alert("You can only upload JPG / PNG file!");
    }
    return isJpgOrPng;
  };
  // console.log("image -->", image);
  return (
    <div>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="avatar"
          onClick={toggle}
        ></div>
      )}

      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalBody>
          <div className="card-header-info">
            <div className="info">
              <div className="info-items">
                <div className="item">
                  ID:
                  <span>{props.data && props.data.id}</span>
                </div>
                <div className="item">
                  Name:
                  <span>{props.data && props.data.name}</span>
                </div>
                <div className="item">
                  Parent Name:
                  <span>{props.data && props.data.parent}</span>
                </div>
                <div className="item">
                  Locality:
                  <span>{props.data && props.data.locality}</span>
                </div>
                <div className="item">
                  Bus No:
                  <span>{props.data && props.data.busNo}</span>
                </div>
              </div>
            </div>
          </div>

          {delLoading ? (
            <h4 style={{ textAlign: "center", margin: "32px 0" }}>
              Removing...
            </h4>
          ) : loading ? (
            <h4 style={{ textAlign: "center", margin: "32px 0" }}>
              Uploading...
            </h4>
          ) : (
            <>
              <div className="profile-img">
                <div style={{ backgroundImage: `url(${image})` }}></div>
              </div>
              <div className="d-flex justify-content-center align-items-start">
                {/* {
                      props.data.pictures
                        ? <Button
                          color="danger"
                          className="mr-2"
                          onClick={removeImage}
                        >
                          REMOVE
                        </Button>
                        : */}
                <div className="mr-2">
                  <label className="custom-file-input ">
                    {props.bgImage || file.value ? "CHANGE" : "ADD"}
                    <input type="file" onChange={handleImageChange} />
                  </label>
                </div>
                <div>
                  <Button
                    color="secondary"
                    className=""
                    disabled={!file.value || loading}
                    onClick={() => {
                      uploadImage(file.value);
                    }}
                  >
                    UPLOAD
                  </Button>
                </div>
              </div>
            </>
          )}
          <div className="modal-close">
            <button className="close-button" onClick={toggle}>
              <i className="lnr-cross-circle"> </i>
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadStudentImage: (studentImage) =>
      dispatch(uploadStudentImage(studentImage)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ImagePreview);
