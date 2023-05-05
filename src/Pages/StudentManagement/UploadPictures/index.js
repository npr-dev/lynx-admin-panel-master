import React, { Fragment, useState } from 'react';
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import {
    Row, Col,
    Card, CardBody,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, ListGroup, ListGroupItem
} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import ActionCenter from '../../../Layout/ActionCenter/ActionCenter';
import { Count, Search } from '../../../Layout/ActionCenter';
import './UploadPictures.scss'
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone'
import { uploadMulitpleStudentImages } from '../../../store/actions/studentAction';
import { connect } from 'react-redux';


const UploadPictures = (props) => {
    console.log("UPLOAD PICTURES",props)
    const { schoolId, uploadMulitpleStudentImages } = props;
    const [files, setFiles] = useState({
        value: []
    })
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState({
        value: 1
    })

    const onDrop = (files) => {
        setFiles({ value: files })
    }

    const onCancel = () => {
        setFiles({ value: [] })

    }

    const handleUpload = async () => {
        const imagesData = []

        for (const image of files.value) {
            const flag = beforeUpload(image);
            if (!flag) {
                alert("only upload jpeg / png")
                return;
            }
        }

        setLoading(true);
        for (const image of files.value) {
            imagesData.push(await uploadImage(image));
        }
        uploadMulitpleStudentImages({ schoolId: schoolId, imagesData });
        setCount({ value: 1 });
        setFiles({ value: [] })
        setLoading(false);
    }

    const uploadImage = async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'lynx-admin');
        const res = await fetch('https://api.cloudinary.com/v1_1/n4beel/image/upload', {
            method: "POST",
            body: data
        })
        const fileUrl = await res.json()
        const url = fileUrl.secure_url;
        const studentImage = {
            rollNo: file.name.replace(/\.[^/.]+$/, ""),
            file: url
        }
        setCount({ value: count.value++ });
        return studentImage
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        return isJpgOrPng;
    };

    const filesList = files.value.map(file => (
        <ListGroupItem key={file.name}>
            {file.name} - {file.size} bytes
        </ListGroupItem>
    ))
    return (
        <Fragment>

            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Row>
                    <Col md="12">
                        <Card className="main-card mb-3">
                            {
                                !loading
                                    ? <CardBody>
                                        <div className="card-header-info">
                                            <div className="info">
                                                <div className="title">Upload Multiple Pictures</div>
                                                <div className="info-items">
                                                    <div className="item">
                                                        Note: The image should be named with respect to student's ID
                                            </div>
                                                </div>
                                            </div>
                                            <div className="action">
                                                <Link className="close-button" to="/studentManagement/list">
                                                    <i className="lnr-cross-circle"> </i>
                                                </Link>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col md="8">
                                                <div className="dropzone-wrapper dropzone-wrapper-lg">
                                                    <Dropzone
                                                        onDrop={onDrop.bind(this)}
                                                        onFileDialogCancel={onCancel.bind(this)}
                                                    >
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div {...getRootProps()}>
                                                                <input {...getInputProps()} />
                                                                <div className="dropzone-content">
                                                                    <p>Try dropping some files here, or click to select files to upload.</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <b className="mb-2 d-block">Dropped Files</b>
                                                <ListGroup>
                                                    {filesList}
                                                </ListGroup>
                                            </Col>

                                            <Col size="12" className="text-center">
                                                <Button color="primary" className="mt-4" onClick={handleUpload}>
                                                    Upload
                                    </Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    : <h4 style={{ textAlign: "center", padding: 80 }}>Uploading {count.value} of {files.value.length} images</h4>
                            }
                        </Card>
                    </Col>

                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        schoolId: state.auth.user.result.userExist._id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadMulitpleStudentImages: imagesData => dispatch(uploadMulitpleStudentImages(imagesData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadPictures);
