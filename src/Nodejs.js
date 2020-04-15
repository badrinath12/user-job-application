import React from 'react'
import axios from 'axios'


class Nodejs extends React.Component{
    constructor() {
        super()
        this.state={
            nodejsDevelopers : []
        }
    }
    componentDidMount(){
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then(response=>{
            console.log(response.data)
            const nodejsDevelopers= response.data.filter(ele=>ele.jobTitle == "Node.js Developer")
            this.setState({nodejsDevelopers})
        })

        .catch(err=>{
            console.log(err)
        })
    }

    handleDetails = (id) => {
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
        .then((response) => {
            //console.log(response.data)
            let object = response.data
            

        window.alert(`${object.name} Profile
        -------------------------------------------------
                Contact Number :  ${object.phone}, 
        
                Email :  ${object.email}, 
        
                Skills:  ${object.skills}, 
        
                Experience:  ${object.experience}`)
        })
    }

    handleShortlisted = (id) => {
        const body = {
            status: 'shortlisted'
        }

        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, body )
        .then((response) => {
            console.log(response.data)           
        })
        
    }

    handleRejected = (id) => {
        const body = {
            status: 'rejected'
        }

        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`, body )
        .then((response) => {
            console.log(response.data)           
        })
    }

    render(){
    return (
      <div>
        <h1> Nodejs Developers</h1>
        <h3> List of candidates applied for nodejs developer job</h3>
        <table border='1'>
            <thead>
                <tr>
                    <th> Name</th>
                    <th> Technical skills</th>
                    <th> Experience</th>
                    <th> Applied Date</th>
                    <th> View Details</th>
                    <th> Update Application Status</th>
  
                </tr>
            </thead>

            <tbody>
                {
                   this.state.nodejsDevelopers.map((ele,i) =>{
                       return(
                            <tr key={i}>
                                <td> {ele.name}</td>
                                <td> {ele.skills}</td>
                                <td> {ele.experience}</td>
                                <td> {ele.createdAt.slice(0,10)}</td>
                                <td> { <button onClick={()=>{
                                    this.handleDetails(ele._id)}}> View Details</button>}</td>
                                <td> 
                                    {(ele.status=="applied") && 
                                    <div>
                                    <button onClick= {()=>{
                                        this.handleShortlisted(ele._id)}}>Shortlist</button>
                                      <button onClick={()=>{
                                          this.handleRejected(ele._id)}}>Reject</button>
                                    </div>
                                    }
                                  {(ele.status== "shortlisted") && <button >Shortlisted</button>}

                                  {(ele.status== "rejected") && <button >Rejected</button>}


                                   </td>



                            </tr>
                       )
                   }) 
                }
            </tbody>
        </table>
      </div>
      
      
  )
 }
}
export default Nodejs