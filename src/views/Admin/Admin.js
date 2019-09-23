import React, { Component } from 'react'; 
//import { DropdownMenu} from 'reactstrap';

import { Button, ButtonDropdown, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, FormGroup, Input } from 'reactstrap';


import {
   // Button,
   
   // Container,
   // Form,
   // Input,
    //InputGroup,
   // InputGroupAddon,
   // InputGroupText, 
    Table
  } from "reactstrap";

  import DefaultHeader from '../../containers/DefaultLayout/DefaultHeader';
  
  import '../../App.scss';
//import fire from '../../config/config';



class Admin extends Component{

   /* constructor(props){
        
        super(props);
       // this.logout = this.logout.bind(this);
    }*/

    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: new Array(19).fill(false),
      };
    }
  
    toggle(i) {
      const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
      this.setState({
        dropdownOpen: newArray,
      });
    }

   /* logout=()=>{

        fire.auth().signOut();
        
    }*/

    render(){
        return(
         
        
          
        

          <div className="animated fadeIn">
           
          {/** <DefaultHeader/> */}

          <Row>
            <Col xl={40}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Sujet 
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Sujets</th>
                      <th scope="col">Présentateur</th>
                      <th scope="col">Date</th>
                     
                    
                    </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td>je suis la partie Admin</td>
                     
                      <td> <input name="combobox"></input></td>
                      <td> 
                      <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[8]} toggle={() => { this.toggle(8); }}>
                  <Button id="caret" color="secondary">Secondary</Button>
                  <DropdownToggle caret color="secondary" />
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action Disabled</DropdownItem>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                  </td>
                      <td>
                   <FormGroup row>
                        <Col xs="40" md="9">
                      <Input type="date" id="date-input" name="date-input" placeholder="date" />
                    </Col>
                  </FormGroup>
                    </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>


        
            
            
                
            
        );
    }
}

export default Admin ;