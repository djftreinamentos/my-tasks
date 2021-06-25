import React from 'react';

export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.file = React.createRef();
        this.state = {
            name:""
        }
    }
    setField = (event)=>{
        const target = evbent.target;
        const name = target.name;
        value = target.value;
        this.setState({[name]:value});
    }
    send = async()=>{
        const fileImage = this.file.current;
        const image = fileImage.fi
        let data = new FormData()
        data.append('file', fileImage.files[0])
        data.append('name', this.state.name)
        const response = awaitfetch('/api/v1/users', {
            method: 'POST',
            headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkpvYW5hIiwiZW1haWwiOiJqb2FuYUB0ZXN0ZS5jb20iLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTYyMzg3NzY1MCwiZXhwIjoxNjIzOTIwODUwfQ.C45pBMGzow-W3JOiA174K7RQcRvgRFD022Ik2eZzp6U"},
            body: data
          })

          
    }
    render(){
        return(
            <div>
                <input name="file" type="file"/>
                <input name="name" type="text" />
                <button onClick={this.send}></button>
            </div>
        )
    }
}

