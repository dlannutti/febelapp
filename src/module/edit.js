import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

class EditComponent extends React.Component{
 
  constructor(props){
    super(props);
    this.state = {
      dataEmployee:{},
      campName: "",
      campEmail:"",
      campPhone:"",
      campAddress:"",
      stringRole:"",
      selectRole:0
    }
  }

  componentDidMount(){
    let userId = this.props.match.params.employeeId;
    
    const baseUrl ="https://slkeku6cr3.execute-api.us-east-1.amazonaws.com/items";
    const url = baseUrl + "/" + userId;
    
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.get(url)
      .then(response=>{
        if (response.data.Item) {
          const data = response.data.Item
          
          this.setState({
            dataEmployee: data,
            campName: data.name,
            campEmail: data.email,
            campPhone: data.phone,
            campAddress: data.address,
            campRole: data.role,
            stringRole: data.role.role,
            selectRole: data.role.id
          })
        }
        else {
          alert("Error web service")
        }
      })
      .catch(error=>{
        alert("Error server "+error)
      })
  }

  sendUpdate(){
    
    let userId = this.props.match.params.employeeId;
    let baseUrl = "https://slkeku6cr3.execute-api.us-east-1.amazonaws.com/items/" + userId;

    //parameter data post
    const data = {
      name: this.state.campName,
      email: this.state.campEmail,
      phone: this.state.campPhone,
      address: this.state.campAddress,
      //role: this.state.campRole
      role: {'role': 'Admin', 'id': '1'}
    }
    
    //this.props.history.push('/');

    axios.put(baseUrl, data)
    .then(response => this.setState({ campName: response.data.Item.name }))
    .catch(error => {
        this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
    })
    .finally(()=>{
      this.props.history.push('/');
    });
  }
  
  onLogout() {
    this.props.history.push('/');
  }

  render(){
    let userId = this.props.match.params.id;
    return (
     <div>
       <div className="form-row justify-content-center">
         <div className="form-group col-md-6">
           <label for="inputPassword4">Name {userId}</label>
           <input type="text" className="form-control"  placeholder="Name"
           value={this.state.campName} onChange={(e)=> this.setState({campName:e.target.value})}/>
         </div>
         <div className="form-group col-md-6">
           <label for="inputEmail4">Email</label>
           <input type="email" className="form-control"  placeholder="Email"
           value={this.state.campEmail} onChange={(e) => this.setState({campEmail:e.target.value})}/>
         </div>
       </div>
       <div className="form-row">
         <div className="form-group col-md-6">
           <label for="inputState">Role</label>
           <select id="inputState" class="form-control" onChange={(value)=> this.setState({selectRole:value.target.value})}>
             <option selected value={this.state.dataEmployee.roleId}>{this.state.stringRole}</option>             
             <option value="1">Admin</option>
             <option value="2">Project Manager</option>
             <option value="3">Programer</option>
           </select>
         </div>
         <div className="form-group col-md-6">
           <label for="inputEmail4">Phone</label>
           <input type="number" className="form-control"  placeholder="Phone"
           value={this.state.campPhone} onChange={(e) => this.setState({campPhone:e.target.value})}/>
         </div>
       </div>
       <div className="form-group">
         <label for="inputAddress">Address</label>
         <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"
         value={this.state.campAddress} onChange={(e) => this.setState({campAddress:e.target.value})}/>
       </div>
       <button type="submit" class="btn btn-primary" onClick={() => this.sendUpdate()}>Update</button>
       <h4 onClick={this.onLogout.bind(this)}>Volver</h4>
     </div>
   );
  } 

}

export default EditComponent;