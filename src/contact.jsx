import { useRef,useState} from "react"

export default function FormContact() { 

    const nameField = useRef()
    const emailField = useRef()
    const messageField = useRef()
    const countryField = useRef()
    const acceptConditionsField = useRef() 
    const [errors, setErrors] = useState([])
    const [isFormSent, setIsFormSent] = useState(false)
    const minMessageLength=10
    let isFormValid=true
   //*******************function that validate individial input ***********
   const validateRequiredInput = (ref) => {
        //check if input is umpty
        if(ref.current.value.trim() === '')
        { 
            ref.current.style.border='red 1px solid'//change the border color of input to red when its incorrect 
            setErrors(prevState => {
                        return [...prevState, {name:ref.current.id ,message:ref.current.id+' required!'}]
                    })
                isFormValid = false  
        }else ref.current.style.border='green 1px solid'//change the border color of input to green when its correct 
   }

    //*******************function validation form *****************************************************************/
    const validateForm = () => {   
        setErrors([])
        //check if name is umpty///////////////////////////////////////
        // if(nameValue.trim() === '')
        // { 
        //     nameField.current.style.border='red 1px solid'//change the border color of input to red when its incorrect 
        //     setErrors(prevState => {
        //                 return [...prevState, {name:'name',message:'Name required!'}]
        //             })
        //         isFormValid = false  
        // }else nameField.current.style.border='green 1px solid'//change the border color of input to green when its correct 
        //*****change the lines above with this line to minimize the code  
        validateRequiredInput(nameField)
          
        //check if email is umpty or is not an email format///////////////////////////////////////
        // if(emailValue.trim()==="")
        // {    
        //     emailField.current.style.border='red 1px solid'//change the border color of input to red when its incorrect
        //     setErrors(prevState => {
        //                 return [...prevState, {name:'email',message:'Email required!'}]
        //             })
        //     isFormValid = false      
        //}else 

        //*****change the lines above with this line to minimize the code
        //validateRequiredInput(emailField)
        if(!emailField.current.value.match(/^\S+@\S+\.\S+$/)||emailField.current.value.trim()==="") {
            emailField.current.style.border='red 1px solid'//change the border color of input to red when its incorrect
            setErrors(prevState => {
                return [...prevState, {name:'email',message:'Email format is invalid and should not be umpty!'}]
            })
            isFormValid = false
        }else emailField.current.style.border='green 1px solid'//change the border color of input to green when its correct 

        //check if country is umpty///////////////////////////////////////
        // if(countryValue.trim()==="")
        // {             
        //     countryField.current.style.border='red 1px solid'//change the border color of input to red when its incorrect
        //     setErrors(prevState => {
        //                 return [...prevState, {name:'country',message:'Country required!'}]
        //             })
        //     isFormValid = false
        // }else countryField.current.style.border='green 1px solid'//change the border color of input to green when its correct 
        //*****change the lines above with this line to minimize the code
        validateRequiredInput(countryField)

        //check if message length is greater than minMessageLength=50///////////////////////////////////////
        
         if(messageField.current.value.length<minMessageLength){
            messageField.current.style.border='red 1px solid'//change the border color of input to red when its incorrect
            setErrors(prevState => {
                        return [...prevState, {name:'message',message:`Message length should be greater than ${minMessageLength} characters!(${messageField.current.value.length}/${minMessageLength})`}]
                    })
        isFormValid = false 
        }else messageField.current.style.border='green 1px solid'//change the border color of input to green when its correct 

        //check if acceptcondition is not checked///////////////////////////////////////
        if(!acceptConditionsField.current.checked)
        {              
            acceptConditionsField.current.style.border='red 1px solid'//change the border color of input to red when its incorrect
            setErrors(prevState => {
                        return [...prevState, {name:'condition',message:'accept condition is not checked!'}]
                    })
            isFormValid = false
        }else acceptConditionsField.current.style.border='green 1px solid'//change the border color of input to green when its correct 
     return isFormValid
    }

    //*******************function to ampty all the fields form *********************************************/
    const ResetForm=()=>{ 
        nameField.current.value=""
        emailField.current.value =""
        messageField.current.value="" 
        countryField.current.value="" 
        acceptConditionsField.current.checked=false
         
    }

  //*******************function to display all errors ********************************************************/ 
    const displayErrors=()=>{  
        return <div className="alert alert-danger" role="alert">
                  <strong>Error</strong>
                  <ul>
                      {errors.map((er,key)=><li key={key}>{er.name}:{er.message}</li>)}
                   </ul>
             </div>
    }

   //*******************function to display individual error ************************************************/ 
    const displayErrorind=(r)=>{ 
        const t=errors.find((er)=>er.name===r)
        return (
                t && (<div className={'text-danger'}>{t.message}</div>)   
            )
    }

    //*******************function handelchange ************************************************************/
    const handelChange=(e)=>{
        validateForm()
   }
    //*******************function handel submit ************************************************************/
     const handelSubmit=(e)=>{
            setErrors([])
            e.preventDefault()
            if(validateForm()){
                setIsFormSent(true)
                ResetForm()
            }   
    } 

    //*******************css in js *******************************************************************/
    const spancolor={color: "red"}
    //*******************function render *******************************************************************/
    return (
        <div className={'container-fluid w-75 mx-auto my-5'}>
               {//**********if form sent display this lines******* */
                isFormSent?
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-3" style={{color:"green"}}>Message sent successfully !!</h1>
                        <p className="lead">Thank you for your message</p>
                        <hr className="my-2"/>
                        <p>More info</p>
                        <p className="lead">
                            <a className="btn btn-primary btn-lg" href="/" role="button">Return to contact page</a>
                        </p>
                    </div>
                </div>
           :
           <>
            <a href="/">contact using Yup and Formik</a>
            <form onSubmit={handelSubmit} onChange={handelChange} >
            {
            /* //////////////////////if errors exist display all errors */
                errors.length>0 ?displayErrors():<></>
            }
            <h1>Contact form</h1>
            <hr/>

            {/*<-- Name input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">Name<span style={spancolor}>*</span></label>
                <input type="text" id="name" className="form-control" ref={nameField} />   
                {displayErrorind("name")} 
            </div>

            {/*<-- Email input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email address<span style={spancolor}>*</span></label>
                <input type="text" id="email" className="form-control" ref={emailField}/>
                {displayErrorind("email")}
            </div>

            {/*<-- Message input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="message">Message<span style={spancolor}>*</span></label>
                <textarea className="form-control" id="message" rows="4" ref={messageField} />
                {displayErrorind("message")}
                
            </div>

            {/*<-- Country select -->*/}
            <div className="form-group mb-4">
                <label>Country<span style={spancolor}>*</span></label>
                <label htmlFor="country"></label>
                <select className="form-control" id="country" ref={countryField} >
                    <option value=''>Select country</option>
                    <option value='MA'>Maroc</option>
                    <option value='DZ'>Algérie</option>
                    <option value='TN'>Tunisie</option>
                </select>
                {displayErrorind("country")}
            </div>

            {/*<-- Checkbox -->*/}
            <div className="form-check mb-4">
                <div className="d-flex">
                    <input className="form-check-input me-2" type="checkbox" id="acceptAllConditions" ref={acceptConditionsField}/>
                    <label className="form-check-label" htmlFor="acceptAllConditions">
                        Accept all conditions<span style={spancolor}>*</span>
                    </label>
                </div>
                {displayErrorind("condition")}
            </div>

            {/*<-- Submit -->*/}
            <button type="submit" className="btn btn-primary w-100 mb-4">Submit</button>
        </form>
        </>
        }
    </div>
   )          
}