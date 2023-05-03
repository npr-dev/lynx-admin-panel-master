import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Form,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  fetchUnassignedStudents,
  assignStudent,
} from '../../../store/actions/busAction';

class AssignStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      student: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.fetchUnassignedStudents({ id: this.props.schoolId });
    console.log(')))', this.props);
  }

  toggle() {
    console.log('jsd', this.props);
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      student: e.target.value,
    });
  };

  assign = () => {
    //console.log();
    console.log(this.props.history);
    // const filteredBus = this.props.buses.filter(
    //   (bus) => bus._id === this.props.busId
    // );
    // console.log(filteredBus);

    if (this.props.bus.studentCount + 1 <= this.props.bus.studentCapacity) {
      if (this.state.student !== '') {
        this.props.assignStudent({
          busId: this.props.busId,
          studentId: this.state.student,
        });
      }
    } else {
      console.log('Limit reached');
    }

    this.setState({ student: '' });
    this.toggle();
  };

  render() {
    return (
      <span className='d-inline-block mb-2 mr-2'>
        <Button
          color='primary'
          onClick={this.toggle}
          disabled={this.props.disabled}
        >
          <i className='dropdown-icon lnr-plus-circle'> </i>
          Assign a Student
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody>
            <Form>
              <div className='card-header-info'>
                <div className='info'>
                  <div className='title'>Select By Name</div>
                </div>
              </div>
              <FormGroup>
                <Input
                  type='select'
                  name='byName'
                  id='byName'
                  onChange={this.handleChange}
                  value={this.state.student}
                >
                  <option selected disabled value=''>
                    Select Name
                  </option>
                  {this.props.students && this.props.students.length > 0 ? (
                    this.props.students.map((student) => {
                      return (
                        <option value={student._id} key={student._id}>
                          {student.name}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled> No Students Available </option>
                  )}
                </Input>
              </FormGroup>
              <div className='separator'>OR</div>
              <div className='card-header-info'>
                <div className='info'>
                  <div className='title'>Select By ID</div>
                </div>
              </div>
              <FormGroup>
                <Input
                  type='select'
                  name='byId'
                  id='byId'
                  onChange={this.handleChange}
                  value={this.state.student}
                >
                  <option selected disabled value=''>
                    Select ID
                  </option>
                  {this.props.students && this.props.students.length > 0 ? (
                    this.props.students.map((student) => {
                      return (
                        <option value={student._id} key={student._id}>
                          {student.studentId}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled> No Students Available </option>
                  )}
                </Input>
              </FormGroup>
              <Button color='primary' className='mt-1' onClick={this.assign}>
                Assign
              </Button>
            </Form>
            <div className='modal-close'>
              <button className='close-button' onClick={this.toggle}>
                <i className='lnr-cross-circle'> </i>
              </button>
            </div>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('unassigned students', state.bus.unassignedStudents);
  return {
    schoolId: state.auth.user.result.userExist._id,
    students: state.bus.unassignedStudents,
    bus: state.bus.singleBus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUnassignedStudents: (schoolId) =>
      dispatch(fetchUnassignedStudents(schoolId)),
    assignStudent: (studentData) => dispatch(assignStudent(studentData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignStudent);
