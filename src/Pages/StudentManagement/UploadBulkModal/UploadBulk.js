import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, ListGroupItem, Row, Col, ListGroup } from 'reactstrap';
import Dropzone from 'react-dropzone'
import xlsxParser from 'xlsx-parse-json';
import { connect } from 'react-redux';
import { addMultipleStudents } from '../../../store/actions/studentAction'

var fileDownload = require('js-file-download');
const template = ["Name", "Roll No.", "Date of Birth", "Class", "Street", "Town", "Address", "Parent Name", "Parent Email", "Parent Phone Number"]

class UploadBulk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            files: []
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        console.log("Hello World")
        this.setState({
            modal: !this.state.modal
        });
    }

    onDrop(files) {
        this.setState({ files });
    }

    onCancel() {
        this.setState({
            files: []
        });
    }

    handleUpload = async () => {
        let students = [];
        const formattedStudent = [];
        await xlsxParser
            .onFileSelection(this.state.files[0])
            .then(data => { students = data });

        for (const student of students.Sheet1) {
            formattedStudent.push({
                student: {
                    schoolId: this.props.schoolId,
                    name: student["Name"],
                    studentId: student["Roll No."],
                    dob: student["Date of Birth"],
                    class: student["Class"],
                    street: student["Street"],
                    town: student["Town"],
                    address: student["Address"],
                    recognized: false,
                    assigned: false,
                    deleted: false,
                    pictures: "",
                    busId: null
                },
                parentDetails: {
                    name: student["Parent Name"],
                    email: student["Parent Email"],
                    contact: student["Parent Phone Number"]
                }
            })
        }

        this.props.addMultipleStudents(formattedStudent)
        this.toggle()
        //console.log(formattedStudent)
    }

    render() {
        const files = this.state.files.map(file => (
            <ListGroupItem style={{ overflow: 'hidden' }} key={file.name}>
                {file.name} - {file.size} bytes
            </ListGroupItem>
        ))

        return (
            <span className="d-inline-block mr-2">
                {/* <Button className="btn-wide mb-2 mr-2 btn-icon " size="lg" color="primary" onClick={this.toggle}>
                    <i className="pe-7s-users btn-icon-wrapper"> </i> */}
                <span onClick={this.toggle}>
                    Upload Multiple Students Data
                </span>
                {/* </Button> */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <div className="card-header-info">
                            <div className="info">
                                <div className="title">Add Multiple Students</div>
                                <div className="info-items">
                                    <div className="item">
                                        Note: Upload an excel sheet consisting or following columns in sequence. Or <a style={{ color: "#5667D8", cursor: "pointer" }} onClick={() => { fileDownload(template, 'template.xlsx'); }}>download this templete</a>.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Row>
                            <Col md="8">
                                <div className="dropzone-wrapper dropzone-wrapper-lg">
                                    <Dropzone
                                        onDrop={this.onDrop.bind(this)}
                                        onFileDialogCancel={this.onCancel.bind(this)}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <div className="dropzone-content">
                                                    <p>Upload an excel file which contains the data of students</p>
                                                </div>
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                            </Col>
                            <Col md="4">
                                <b className="mb-2 d-block">Dropped Files</b>
                                <ListGroup>
                                    {files}
                                </ListGroup>
                            </Col>
                            <Col size="12" className="text-center">
                                <Button disabled={!files.length} color="primary" className="mt-4" onClick={this.handleUpload}>
                                    Upload
                                </Button>
                            </Col>
                        </Row>
                        <div className="modal-close">
                            <button className="close-button" onClick={this.toggle}>
                                <i className="lnr-cross-circle"> </i>
                            </button>
                        </div>
                    </ModalBody>
                </Modal>
            </span>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        schoolId: state.auth.user.result.userExist._id
    }
}

const mapDipatchToProps = dispatch => {
    return {
        addMultipleStudents: students => dispatch(addMultipleStudents(students))
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(UploadBulk);
