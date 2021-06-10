import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl ="https://slkeku6cr3.execute-api.us-east-1.amazonaws.com/items";

class listComponent extends React.Component  {

    constructor(props){
        super(props);
        this.state = { listEmployees : [] }
    }

    componentDidMount(){

      const url = baseUrl;
      
      //axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.get(url)
      .then(res => {
        if(res.data){
          this.setState({listEmployees: res.data.Items});
        }else{
          alert("Error web service");
        }
      })
      .catch(err => alert("Error server " + err))
    }
    //this.setState({invoices:body, isLoading:false});            

  render()
  {
    return (
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
            {this.loadFillData()}         
        </tbody>
      </table>
    );
  }

  loadFillData(){
    return this.state.listEmployees.map( (item) => 
      <tr>
        <th>{item.id}</th>
        <td>{item.role ? item.role.role : ''}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.address}</td>
        <td>{item.phone}</td>
        <td>
          <Link class="btn btn-outline-info" to={"/edit/" + item.id} > Edit </Link>
        </td>
        <td>
          <button class="btn btn-outline-danger" onClick={()=> this.onDelete(item.id)}> Delete </button>
        </td>
      </tr>
    );
  }

  onDelete(id){
    Swal.fire({
      text: 'Eliminar registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar'
    }).then(result => result.value? this.sendDelete(id):'')
  }
  
  sendDelete(userId){

    const url = baseUrl + "/" + userId;
    
    axios.delete(url,{id:userId})
    .then(response =>{
      if (response.data === "SUCCESS"){
        let updatedEmployees = [...this.state.listEmployees].filter(i => i.id !== userId);
        this.setState({listEmployees: updatedEmployees});         
      }
    })
    .catch ( error => {
      alert("Error 325 " + error.message)
    })    
  }    
}

export default listComponent;