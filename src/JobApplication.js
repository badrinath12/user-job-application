import React from 'react'
import axios from 'axios'

class JobApplication extends React.Component{
    constructor(){
        super()
        this.state= {
            name : '',
            email : '',
            phone : undefined,
            jobTitle : '',
            experience : '',
            skills : ''

        }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e)=>{
     e.preventDefault()
     console.log(this.state)

     axios.post('http://dct-application-form.herokuapp.com/users/application-form', this.state)
     .then(response=>{
      console.log(response.data)
      this.setState({ redirect:"/Dashboard" })
     })

     .catch((err)=>{
         console.log(err)
     })

    }

    
    render(){
        return (
            <div>
                <h1> Apply for job</h1>
                <form onSubmit = {this.handleSubmit}>
                    <label htmlFor= 'name'>Full name</label>   
                    <input type ='text' id ='name' name ='name' value = { this.state.name} onChange= {this.handleChange}/>
                    <br/>
                    <br/>

                    <label htmlFor= 'email'>Email address</label>   
                    <input type ='text' id ='email' name='email'value = { this.state.email} onChange= {this.handleChange}/>
                    <br/>
                    <br/>

                    <label htmlFor= 'phone'>Phone Number</label>   
                    <input type ='number' id ='phone' name='phone' value = { this.state.phone} onChange= {this.handleChange}/>
                    <br/>
                    <br/>

                    <label htmlFor= 'jobTitle'>Applying for job</label>   
                    <select  id ='jobTitle' name = 'jobTitle' value={this.state.jobTitle} onChange={this.handleChange}>
                        <option value =''>--select--</option>
                        <option  value='Front-End Developer'>Front-End Developer </option>
                        <option value='Node.js Developer'>Node.js Developer </option>
                        <option value='MEAN Stack Developer'>MEAN Stack Developer </option>
                        <option value='FULL Stack Developer'>FULL Stack Developer </option>
  
                        </select>
                     <br/>
                     <br/>

                    <label htmlFor= 'experience'>Experience</label>   
                    <input type ='text' id ='experience' name='experience' value = { this.state.experience} onChange= {this.handleChange}/>
                    <br/>
                    <br/>

                    <label htmlFor= 'skills'>Technical Skills</label>   
                    <input type ='text' id ='skills' name='skills' value = { this.state.skills} onChange= {this.handleChange}/>
                    <br/>
                    <br/>

                    <input type ='submit' value='Send Application' />
                 </form>
                </div>
        )
    }
}

export default  JobApplication