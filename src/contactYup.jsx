import * as Yup from "yup";
import {useFormik} from "formik"
import { useNavigate } from 'react-router-dom';

export default function FormContact() { 

    //*******************//start by defining a schema. This is an object that specifies all values you want to check
        const schema = Yup.object().shape({
            name: Yup.string().required("Name is required!"),
            email: Yup.string().email("Invalid email address format!").required("Email is required!"),
            phone: Yup.string().matches( /^[1-9]\d{2}-\d{3}-\d{4}$/,"Invalid phone number! (###-###-#### format)")
                                .required("Phone Number is required!"),
            message: Yup.string().required("Message is required!").min(10,"Message must be 10 characters at minimum!"),
            country: Yup.string().required("Country is required!"),        
            //acceptCondition: Yup.boolean().required("cheke acceptCondition is required!"),
            acceptCondition: Yup.bool().oneOf([true], "Accept Terms & Conditions is required")
        });
        
        const navigate = useNavigate();
    //*******************onsubmit function
    const onSubmit = (values) => {console.log('submit form', values);
                                navigate('succesform');}

    //*******************//////////////////////////////           
    const {handleChange,values, handleSubmit, errors, touched}=useFormik({
                    initialValues:{
                        name:"",
                        email:"",
                        phone:"",
                        message:"", 
                        country:"", 
                        acceptCondition:false
                    },
                    validationSchema: schema,
                    onSubmit: onSubmit
                    
                  })
     
    //*******************function render *******************************************************************/       
           return (
              <div className={'container-fluid w-75 mx-auto my-5'}>
             <p className="alert alert-info">contact form validation using <strong>Yup and Formik</strong>. 
             <br/>Yup is a popular validation library for Reactjs that makes it easy to create and manage form validation
             <br/>Formik eliminates the work involved in setting up a state for form fields.
             </p>
            <a href="contactRef">contact using useRef</a>
             <form onSubmit={handleSubmit} >

            <h1>Contact form </h1>
            <hr/>
            {/*<-- Name input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">Name</label>
                <input type="text" id="name" className={errors.name && touched.name? " form-control border-danger ": "form-control"} value={values.name} onChange={handleChange}/>
                {errors.name && touched.name && <div className={'text-danger'}>{errors.name}</div>}
            </div>

            {/*<-- Email input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email address</label>
                <input type="text" id="email" className={errors.email && touched.email? " form-control border-danger ": "form-control"} value={values.email} onChange={handleChange}/>
                {errors.email && touched.email && <div className={'text-danger'}>{errors.email}</div>}
            </div>

            {/*<-- Phone Number input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" className={errors.phone && touched.phone? " form-control border-danger ": "form-control"} value={values.phone} onChange={handleChange}/>
                {errors.phone && touched.phone && <div className={'text-danger'}>{errors.phone}</div>}
            </div>

            {/*<-- Message input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea className={errors.message && touched.message? " form-control border-danger ": "form-control"} id="message" rows="4" value={values.message} onChange={handleChange}></textarea>
                {errors.message && touched.message && <div className={'text-danger'}>{errors.message}</div>}
            </div>

            {/*<-- Country select -->*/}
            <div className="form-group mb-4">
                <label>Country</label>
                <label htmlFor="country"></label>
                <select className={errors.country && touched.country? " form-control border-danger ": "form-control"} id="country" value={values.country} onChange={handleChange}>
                    <option value=''>Select country</option>
                    <option value='MA'>Maroc</option>
                    <option value='DZ'>Algérie</option>
                    <option value='TN'>Tunisie</option>
                </select>
                {errors.country && touched.country && <div className={'text-danger'}>{errors.country}</div>}
            </div>

            {/*<-- Checkbox -->*/}
            <div className="form-check mb-4">
                <div className="d-flex">
                    <input className="form-check-input me-2" type="checkbox" id="acceptCondition" value={values.acceptCondition} onChange={handleChange}/>
                    <label className={errors.acceptCondition && touched.acceptCondition? " form-check-label border-danger ": "form-check-label"} htmlFor="acceptCondition">
                        Accept all conditions
                    </label>
                </div>
                {errors.acceptCondition && touched.acceptCondition && <div className={'text-danger'}>{errors.acceptCondition}</div>}
            </div>

            {/*<-- Submit -->*/}
            <button type="submit" className="btn btn-primary w-100 mb-4">Submit</button>
        </form>
    </div>
           )
           
}