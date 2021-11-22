import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Member extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      id:'',
      age:'',
      status:'',
      activated:false,
      isRep:false
    };
  }
  
  handleActivateChange(e){
    if(e.target.checked){
      this.setState({
        activated:true,
        status:'activated'
      })
    }else{
      this.setState({
        activated:false,
        status:'inactivated',
        isRep:false
      })
    }
  }
  handleRepresentChange(e){
    if(this.state.activated && e.target.checked){
      e.target.checked = true;
      this.setState({
        isRep:true
      })
    }else if(!e.target.checked){
      this.setState({
        isRep:false
      })
    }
  }
  handleNameChange(e){
    this.setState({
      name:e.target.value,
      id:e.target.value
    })
  }
  handleAgeChange(e){
    this.setState({
      age:e.target.value
    })
  }
  handleSaveClick(){
    this.props.parentCallback(this.state);
    // event.preventDefault();
  }
  render(){
    return (
      <div className="member">
        <div className="member-detail-item">
        <input type="text" className="member-name" onChange={this.handleNameChange.bind(this)} />
        </div>
        <div className="member-detail-item">
        <input type="text" className="member-age" onChange={this.handleAgeChange.bind(this)} />
        </div>
        <div className="member-detail-item"> 
        <input type="checkbox" className="activate-check"         
        onChange={(e) => this.handleActivateChange(e)}/>
        </div>
        <div className="member-detail-item">
        <input type="checkbox" className="represent-check"
        onChange={(e) => this.handleRepresentChange(e)} checked={this.state.isRep}/>
        </div>
        <div className="member-detail-item">
          <button onClick={() => this.handleSaveClick.bind(this)}>save data</button>
        </div>
      </div>
    );
  }
}

const Org = () => {
  const [memberList,setMemberList] = useState([]); 
  const addMember = event => {
    setMemberList(memberList.concat(<Member key={memberList.length} />));
  }
  // const handleCallback = memberData => {
  //   this.setState({member:memberData});
  //   console.log('bug 91',memberData);
  // }
  return(
    <div className="org">
      <div className="org-top-bar">
        org: <input type="text" className="org-name" />
      </div>
      <div className="org-members">
        <div className="members-titles-row">
          <div className="member-title users">users</div>
          <div className="member-title">name:</div>
          <div className="member-title">age:</div>
          <div className="member-title">activated</div>
          <div className="member-title">representation</div>
        </div>
        <Member />
        {memberList}
      </div>
      <div className="org-bottom-bar">
        <button className="add-new-member" onClick={addMember}>Add New Member</button>
      </div>
    </div>
  )
}

// in class Management,there should be an function to receive data from org,seem does org to member,then management will get all the members and orgs data.

const Management = () => {
  const [orgList,setOrgList] = useState([]); 
  const addOrg = event => {
    setOrgList(orgList.concat(<Org key={orgList.length} />));
  }

  return(
    <div className="management">
      <h1 className="management-title">Org Management</h1>
      <Org />
      {orgList}
      <button className="add-new-org" onClick={addOrg}>Add New Organization</button>
      <div className="management-bottom-bar">
        <button className="save-btn">Save</button>
        <button className="cancel-btn">Cancel</button>
      </div>
    </div>
  )
}
ReactDOM.render(<Management />, document.getElementById("root"));


// 1.save data
// 2.clear data
// 3.show validation when is empty
// do movement function as the last step