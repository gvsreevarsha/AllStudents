import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Button,Card,Table} from 'reactstrap';
import axios from 'axios';
import Students from './AllRecordsList';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
export default class AllStudents extends Component{    
    constructor(props){
        super(props);
        this.onChangecategory = this.onChangecategory.bind(this);
        this.onChangebatch = this.onChangebatch.bind(this);
        this.onChangeejobs = this.onChangeejobs.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onChangejobs = this.onChangejobs.bind(this);
        this.onChangesortby = this.onChangesortby.bind(this);
        this.onChangecgpa = this.onChangecgpa.bind(this);
        this.onChangetenth = this.onChangetenth.bind(this);
        this.onChangetwelve = this.onChangetwelve.bind(this);
        this.onChangeback = this.onChangeback.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            category:'Any',
            batch:'nill',
            jobeligible:'yes',
            gender:'nill',
            jobsinhand:'nill',
            sortby:'user_id',
            students:[],
            cgpa:'10',
            tenth:'50',
            twelve:'50',
            back:'11'
        }
    }

    onChangecategory(e) {
            this.setState({
                category: e.target.value
            });
    }
    onChangecgpa(e) {
            this.setState({
                cgpa: e.target.value
            });
    }
    onChangebatch(e) {
            this.setState({
                batch: e.target.value
            });
        }
    onChangegender(e) {
            this.setState({
                gender: e.target.value
            });
        }

    onChangeejobs(e) {
            this.setState({
                jobeligible: e.target.value
            });
        }
    onChangejobs(e) {
            this.setState({
                jobsinhand: e.target.value
            });
        }
    onChangesortby(e) {
            this.setState({
                sortby: e.target.value
            });
        }
    onChangetenth(e) {
        this.setState({
            tenth: e.target.value
        });
    }
    onChangetwelve(e) {
        this.setState({
            twelve: e.target.value
        });
    }
    onChangeback(e) {
        this.setState({
            back: e.target.value
        });
    }
    onSubmit(e) {
            e.preventDefault();//Value will be submitted through react js
            const obj = {
                category : this.state.category,
                batch : this.state.batch,
                gender : this.state.gender,
                jobeligible : this.state.jobeligible,
                jobsinhand : this.state.jobsinhand,
                sortby : this.state.sortby,
                cgpa : this.state.cgpa,
                tenth: this.state.tenth,
                twelve: this.state.twelve,
                back: this.state.back
            };
            console.log(obj);
            axios.post("http://localhost/GBGCGCV-2.0/admin/src/components/Allstudent-details.php",obj)
            .then((response)=>{
            console.log(response.data);
            this.setState({students: response.data})
            })
            .catch(err=>console.log(err));
            console.log(this.state.students);
        }

   /* componentDidMount(){
        axios.get('http://localhost/GBGCGCV-2.0/admin/src/components/Allstudent-details.php?category='+this.state.category)
        .then(response=>{
            this.setState({students: response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }*/
    StudentsList(){
        return this.state.students.map(function(object,i){
            return <Students obj={object} key={i}/>;
        });
    }
    render(){   
        return(
            <div className="AllStudents">
            <Container fluid>
                <Row>
                    <Col className="Heading">
                    Manage Students
                    </Col>
                </Row>
                <Row style={{backgroundColor:"blue",color:"white"}}>
                    <Col xs="6" className="p-2">
                        <div>Search Filter</div>
                    </Col>
                    <Col xs="6" className="p-2">
                        <div align="right">Total Students:</div>
                    </Col>
                </Row>
                <Row style={{backgroundColor:"white"}}>
                    <Col>
                        <form onSubmit={this.onSubmit}>
                            <Row className="p-2" style={{marginTop:5}}>
                                <Col style={{fontSize:15}}>Education Filter</Col>
                            </Row>
                            <hr style={{margin:2}}></hr>
                            <Row>   
                                <Col lg="4" md="6" xs="12">
                                    <Row>
                                        <Col>Degree</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                          <select name="category" id="selectcolor" onChange={this.onChangecategory}>
                                            <option value="Any">Any</option>
                                            <option value="B.Tech">BTech</option>
                                            <option value="MBA">MBA</option>
                                        </select>  
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="4" md="6" xs="12">
                                    <Row>
                                        <Col xs="12">Branch</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="4" md="6" xs="12">
                                    <Row>
                                        <Col className="container">CGPA(<span id="CGPA">0</span>-10)</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                           <input type="range" name="mincgpa" id="mincgpa" min="0" max="10" step="0.5" className="w-100" onChange={this.onChangecgpa}/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="p-2" style={{marginTop:5}}>
                                <Col style={{fontSize:15}}>Other Filter</Col>
                            </Row>
                            <hr style={{margin:2,marginBottom:4}}></hr>
                            <Row>
                                <Col lg="2" md="4" xs="12">
                                    Batch
                                </Col>
                                <Col lg="4" md="8" xs="12">
                                    <select name="batch" className="runningtext container" onChange={this.onChangebatch}>
                                      <option value="nill">No Preference</option>
                                      <option value="2016" >2016</option>
                                      <option value="2017" >2017</option>
                                      <option value="2018" >2018</option>
                                      <option value="2019" >2019</option>
                                      <option value="2020" >2020</option>
                                      <option value="2021"  >2021</option>
                                    </select> 
                                </Col>
                                    <Col lg="2" md="4" xs="12">
                                        Sort By
                                    </Col>
                                    <Col lg="4" md="8"  xs="12">
                                        <select className="runningtext container" name="sortby" onChange={this.onChangesortby}>
                                            <option value="first_name">Name</option>
                                            <option value="Branch">Branch</option>
                                            <option value="user_id">Roll No</option>
                                            <option value="b_tech_gpa">Institute marks</option>
                                            <option value="SSC_percent">10th Marks</option>
                                            <option value="inter_percent">12th Marks</option>
                                        </select>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col lg="2" md="4" xs="12">
                                        Gender
                                    </Col>
                                    <Col lg="4" md="8" xs="12">
                                        <select className="runningtext container" name="gender" onChange={this.onChangegender}>
                                            <option value="nill">No Preference</option>
                                            <option value="M" >Male</option>
                                            <option value="F" >Female</option>
                                        </select>
                                    </Col>
                                    <Col lg="2" md="4" xs="12">
                                        Eligible For Job
                                    </Col>
                                    <Col lg="4" md="8" xs="12">
                                        <select className="runningtext container" name="jobeligible" onChange={this.onChangeejobs}>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col lg="2" md="4" xs="12">
                                        Jobs In Hand
                                    </Col>
                                    <Col lg="4" md="8" xs="12">
                                        <select name="jobsinhand" className="runningtext container" onChange={this.onChangejobs}>
                                            <option value="nill">No Preference</option>
                                            <option value="0">0 jobs</option>
                                            <option value="1">less than or equal to 1 job</option>
                                            <option value="2">less than or equal to 2 jobs</option>
                                            <option value="3">less than or equal to 3 jobs</option>
                                            <option value="4">less than or equal to 4 jobs</option>
                                        </select>
                                    </Col>
                                    <Col>
                                    </Col>
                                    <Col>
                                    </Col>
                            </Row>
                            <Row className="p-2" style={{marginTop:5}}>
                                <Col style={{fontSize:15}}>Other Filter</Col>
                            </Row>
                            <hr style={{margin:2,marginBottom:4}}></hr>
                            <Row>
                                <Col lg="1" md="6" xs="12" className="p-2 pl-4">
                                    10th
                                </Col>
                                <Col lg="5" md="6" xs="12">
                                <input type="range" name="minten" id="minten" min="0" max="100" step="5" className="w-100" onChange={this.onChangetenth}/>
                                </Col>
                                <Col lg="1" md="6" xs="12" className="p-2 pl-4">
                                    12th
                                </Col>
                                <Col lg="5" md="6" xs="12">
                                    <input type="range" name="mintwelve" id="mintwelve" min="0" max="100" step="5" className="w-100" onChange={this.onChangetwelve}/>
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col lg="1" md="6" xs="12" className="p-2 pl-4">
                                    Backlogs
                                </Col>
                                <Col lg="5" md="6" xs="12">
                                    <input type="range" name="backlogs" id="backlogs" min="-1" max="11" step="1" className="w-100" onChange={this.onChangeback}/>
                                </Col>  
                                <Col></Col>
                                <Col></Col>
                            </Row>
                            <div className={"form-group"}>
                                <input type={"submit"} value={"Submit"} className={"btn btn-primary"}/>
                            </div>
                        </form> 
                    </Col>
                </Row>
            </Container>
            <Table responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First_Name</th>
                            <th>Middle_Name</th>
                            <th>Last_Name</th>
                            <th>Branch</th>
                            <th>X Marks</th>
                            <th>XII Marks</th>
                            <th>College Marks</th>
                            <th>Batch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.StudentsList()}
                    </tbody>
                </Table>
        </div>
        );
    }
}
