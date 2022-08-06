import React, { Component } from 'react'

export default class Body extends Component {
  constructor(){
    super();
    this.state={
      error:null,
      data:[]
    };
    this.addquestion=this.addquestion.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleChange1=this.handleChange1.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
    this.value='';
   this.name='';
   this.tag='';
   this.link='';
  }

  handleChange(event) {
    this.state.name=event.target.value;
    // console.log(this.state.name);
  }
  handleChange1(event) {
    this.state.tag=event.target.value;
    // console.log(this.state.name);
  }
  handleChange2(event) {
    this.state.link=event.target.value;
    // console.log(this.state.name);
  }
 deletequestion = (question)=> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: question })
    };
    // console.log(question);
    const response = fetch('/deletequestion', requestOptions);
    window.location.reload(false);
  }

  addquestion = (event)=> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.state.name,link:this.state.link,tag:this.state.tag })
    };
    // console.log(this.state.name);
    const response = fetch('/addquestion', requestOptions);
    window.location.reload(false);
  }


  componentDidMount() {
    fetch("/getquestions")
      .then(res => res.json())
      .then(
        (ans) => {
          this.setState({
            data:ans
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }



  render() {
    const { error,data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
     else {
      var i=1;
    return (
      <div>
      <hr/>
      <table className="table table-dark table-striped">
      <thead>
  <tr>
    <th scope="col" style={{textAlign:"center"}}>S.No.</th>
    <th scope="col" style={{textAlign:"center"}}>Question</th>
    <th scope="col" style={{textAlign:"center"}}>Tag</th>
    <th scope="col" style={{textAlign:"center"}}>Link</th>
    <th scope="col" style={{textAlign:"center"}}>Delete</th>
  </tr>
</thead>


  {data.map(data=>(
  <tbody key={data._id}>
  <td className="table-dark" style={{textAlign:"center"}}>{i++}</td>
  <td className="table-dark" style={{textAlign:"center"}}>{data.name}</td>
  <td className="table-dark my-2" style={{color:"gray",textAlign:"center",paddingLeft:"3%",paddingRight:"3%"}}>    
<h6  style={{borderRadius:"10px"}}>#{data.tag}</h6>
  </td>
  <td className="table-dark my-2 mx-3" style={{textAlign:"center"}}>
  <a type="button" className="btn btn-outline-primary " href={data.link} style={{paddingTop:"0",paddingBottom:"0"}}>Link</a>
  </td>

  <td className="table-dark" style={{textAlign:"center"}}>
    {/* <img src='https://img.icons8.com/color/344/trash.png' alt="trash" width={"9%"} height={"9%"}/> */}
    <button className="fa fa-trash" onClick={()=>{ this.deletequestion(data.name)}} style={{borderRadius:"25px" ,backgroundColor:"red"}} aria-hidden="true"></button>
  </td>
</tbody>
))}



<tbody>
  <td className="table-dark" style={{textAlign:"center"}}>{i++}</td>
  <td className="table-dark mb-3 " style={{textAlign:"center",paddingLeft:"5px",paddingRight:"5px"}}>

  <input className="form-control" placeholder="Question Name"  style={{borderRadius:"10px"}} onChange={this.handleChange} value={this.state.name} /> 

  </td>
  <td className="table-dark mb-3 " style={{textAlign:"center",paddingLeft:"5px",paddingRight:"5px"}}>

<input className="form-control" placeholder="Question Tag" style={{borderRadius:"10px"}}  onChange={this.handleChange1} value={this.state.tag} />

  </td>

  <td className="table-dark mb-3 " style={{textAlign:"center",paddingLeft:"5px",paddingRight:"5px"}}>
  <input className="form-control" placeholder="Question Link" style={{borderRadius:"10px"}} onChange={this.handleChange2} value={this.state.link} />
  </td>

  <td className="table-dark" style={{textAlign:"center" }}>
  <button className="fa fa-plus" onClick={()=>{this.addquestion()}} style={{backgroundColor:"#90ee90" ,borderRadius:"25px"}} ></button>
  </td>
 
</tbody>


</table>

  </div>

    )
       }
      }
}
