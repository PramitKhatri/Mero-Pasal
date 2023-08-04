import axios from "axios";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";


const SellerRegister = () => {
    const navigate = useNavigate()
    // const USER_REGEX=/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/   //username must start with a-zA-Z and can have more letters or numbers as well as _  and must be 3 to 23 character

    const [email, setEmail] = useState('')  //sets the email
    const [password, setpassword] = useState('')
    const [Cpassword, setCpassword] = useState('')
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [company_name, setCompanyName] = useState('')
    const [seller_desc, setSellerDesc] = useState('')
    const [seller_image, setSellerImage] = useState(null)
    const [seller_verification, setSellerVerification] = useState(null)

    const [formErrors, setFormErrors] = useState({})
    const [success, setSuccess] = useState(false)


    const ValidateForm = () => {
        const errors = {}
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/  //password must have one lowecase one uppercase one number one sprecial character must be atleast 8 character
        const NameRegex = /^[a-zA-Z0-9_]+$/
        const company_nameRegex = /^[a-zA-Z0-9._\s]+$/  //can have alphanumeric character and spaces, underscore, fullstop

        if (!email) {
            errors.email = ('email is required')
        } else if (!EmailRegex.test(email)) {
            errors.email = ('this is not a valid email')
        }

        if (!password) {
            errors.password = ('password is required and must be atleast 4 characters')
        } else if (!PasswordRegex.test(password)) {
            errors.password = ('password must contain one alpahbet, one number and one special character ')
        }

        if (!Cpassword || password !== Cpassword) {
            errors.Cpassword = ("passwords don't match")
        }

        if (!first_name) {
            errors.first_name = ('firstname is required')
        } else if (!NameRegex.test(first_name)) {
            errors.first_name = ("first name must be alphanumeric character and musn't contain any spaces or special character")
        }
        if (!last_name) {
            errors.last_name = ('firstname is required')
        } else if (!NameRegex.test(last_name)) {
            errors.last_name = ("first name must be alphanumeric character and musn't contain any spaces or special character")
        }

        if (!company_name) {
            errors.company_name = ("Input your own username or your company's name")
        } else if (!company_nameRegex.test(company_name)) {
            errors.company_name = ('company name cannot contain special characters')
        }

        if (!seller_desc) {
            errors.seller_desc = ('this field is required')
        }
        if (!seller_image) {
            errors.seller_image = ('this field is required')
        }
        if (!seller_verification) {
            errors.seller_verification = ('this field is required')
        }

        return errors
    }

    const sellersubmit = async (e) => {
        e.preventDefault()
        const geterrors = ValidateForm()  //call the validateform function and store the output in geterrors instance
        setFormErrors(geterrors)

        if (Object.keys(formErrors).length === 0) {
            try {
                const formData = new FormData()  //formdata is an instance of FormData. FormData is a bult in javascript class that is used to handle multiple types of data post. when the data being sent is not just json data. Here we haave file uploads as well.
                formData.append('email', email)  //the first 'email' refers to the name of the field that will be sent in the HTTP request as part of the form data. The second email is the variable that holds the value of the email input field in your front-end form.
                formData.append('password', password)
                formData.append('first_name', first_name)
                formData.append('last_name', last_name)
                formData.append('company_name', company_name)
                formData.append('seller_desc', seller_desc)
                formData.append('seller_image', seller_image)
                formData.append('seller_verification', seller_verification)

                await axios.post('http://localhost:8000/sellerregister/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'  //Set the appropriate content type for form data since the data also has files else it would be application/json
                    }
                })
                toast.success('Registration Successful')
                setEmail('')
                setpassword('')
                setCpassword('')
                setFirstname('')
                setLastname('')
                setCompanyName('')
                setSellerDesc('')
                setSellerImage(null)
                setSellerVerification(null)
                setSuccess(true)
            }
            catch (err) {
                toast.error(err.response.data.error)
            }
        } else {
            toast.error('Registration failed')
        }




    }
    useEffect(() => {
        if (success) {
            navigate('sellerlogin')
        }

    })



    return (
        <>
            <section>
                <ToastContainer theme="colored" position="top-right" />
                <form onSubmit={sellersubmit} encType="multipart/form-data">
                    <div >
                        <div >
                            <div >
                                <label htmlFor="email">Email:</label>
                                <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="off" className="" />
                                {formErrors.email && (
                                    <p className="text-red-500 text-xs italic">{formErrors.email}</p>)}
                            </div>
                            <div className="block mb-5">
                                <label htmlFor="password">Password:</label>
                                <input id="password" type="password" onChange={(e) => setpassword(e.target.value)} value={password} autoComplete="off" className="" />
                                {formErrors.password && (
                                    <p className="text-red-500 text-xs italic">{formErrors.password}</p>)}
                            </div>
                            <div className="block mb-5">
                                <label htmlFor="cpassword">Confirm password:</label>
                                <input id="cpassword" type="password" onChange={(e) => setCpassword(e.target.value)} value={Cpassword} className="" />
                                {formErrors.Cpassword && (
                                    <p className="text-red-500 text-xs italic">{formErrors.Cpassword}</p>)}
                            </div>
                            <div className="block mb-5">
                                <label htmlFor="fname">First Name:</label>
                                <input id="fname" type="text" onChange={(e) => setFirstname(e.target.value)} value={first_name} className="" />
                                {formErrors.first_name && (
                                    <p className="text-red-500 text-xs italic">{formErrors.first_name}</p>)}
                            </div>
                            <div className="block mb-5">
                                <label htmlFor="lname">Last Name:</label>
                                <input id="lname" type="text" onChange={(e) => setLastname(e.target.value)} value={last_name} className="" />
                                {formErrors.last_name && (
                                    <p className="text-red-500 text-xs italic">{formErrors.last_name}</p>)}
                            </div>
                            <div className="block mb-5">
                                <label htmlFor="compname">Company Name:</label>
                                <input id="compname" type="text" onChange={(e) => setCompanyName(e.target.value)} value={company_name} className="" />
                                {formErrors.company_name && (
                                    <p className="text-red-500 text-xs italic">{formErrors.company_name}</p>)}
                            </div>
                            <div className="block mb-5">
                                <label htmlFor="sellerdesc">Description</label>
                                <input id="sellerdesc" type="textarea" onChange={(e) => setSellerDesc(e.target.value)} value={seller_desc} className="" />
                                {formErrors.seller_desc && (
                                    <p className="text-red-500 text-xs italic">{formErrors.seller_desc}</p>)}
                            </div>
                            <div className="block mb-5">
                                <label htmlFor="sellerimage">Your Profile Image:</label>
                                <input id="sellerimage" type="file" onChange={e => setSellerImage(e.target.files[0])} className="" />
                                {formErrors.seller_image && (
                                    <p className="text-red-500 text-xs italic">{formErrors.seller_image}</p>)}
                            </div>
                            <div className="block mb-5">
                                <label htmlFor="sellerverify">Your Identification:</label>
                                <input id="sellerverify" type="file" onChange={e => setSellerVerification(e.target.files[0])} className="" />
                                {formErrors.seller_verification && (
                                    <p className="text-red-500 text-xs italic">{formErrors.seller_verification}</p>)}
                            </div>

                        </div>



                    </div>
                    <button className="flex-shrink-0  bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                        Sign Up
                    </button>
                </form>
            </section>
        </>
    )

}
export default SellerRegister


//appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none


































//--------------too long and just wasted my time----------------------
// const SellerRegister = () => {
//     const userRef = useRef()   //this will allow to set focus to user input when the component loads. probably done to check the validity
//     const errRef = useRef()

//     const [email, setEmail] = useState('')  //sets the email
//     const [validEmail, setValidEmail] = useState(false)  //this is to validate email
//     const [emailFocus, setEmailFocus] = useState(false)  //this is to focus in email to check validity. the conditions for email should only be visible when user focuses on email

//     const [password, setpassword] = useState('')
//     const [validpassword, setValidPassword] = useState(false)
//     const [passwordfocus, setPasswordFocus] = useState(false)

//     const [Cpassword, setCpassword] = useState('')
//     const [validCpassword, setValidCpassword] = useState(false)
//     const [CpasswordFoces, setCpasswordFocus] = useState(false)


//     const [first_name, setFirstname] = useState('')
//     const [validFirstname, setValidFirstname] = useState(false)
//     const [fnamefocus,setFnameFocus]=useState(false)
//     //no focus here since putting required will be enough

//     const [last_name, setLastname] = useState('')
//     const [validLastname, setValidLastname] = useState(false)
//     const [lnamefocus,setLnameFocus]=useState(false)

//     const [company_name,setCompanyName]=useState('')
//     const [validcname,setCvalidname]=useState(false)
//     const [cnamefocus,setCnameFocus]=useState(false)

//     const [seller_desc, setSellerDesc] = useState('')


//     const [seller_image, setSellerImage] = useState(null)

//     const [seller_verification, setSellerVerification] = useState(null)

//     const [errMsg, setErrMsg] = useState('')
//     const [success, setSuccess] = useState(false)

//     useEffect(() => {  //this sets the focus to email so that it can be typed without having to click on the email box
//         userRef.current.focus()
//     }, [])

//     useEffect(() => {
//         const result = EmailRegex.test(email) //return true or false
//         setValidEmail(result) //will check if result is true or false so that error can be viewed

//         const passwordResult = PasswordRegex.test(password)
//         setValidPassword(passwordResult)  //will check validity of password in boolean

//         const match = password === Cpassword  //check if password and cpassword are same and sets match true or false
//         setValidCpassword(match)

//         const fnameresult=NameRegex.test(first_name)
//         setValidFirstname(fnameresult)

//         const lnameresult=NameRegex.test(last_name)
//         setValidLastname(lnameresult)

//         const cnameresult=company_nameRegex.test(company_name)
//         setCvalidname(cnameresult)

//     }, [email,password,Cpassword,first_name,last_name,company_name])

//     useEffect(()=>{
//         setErrMsg('')
//     },[email,password,Cpassword,first_name,last_name,company_name])

//     return (
//         <>
//         <section>
//             <p className={errMsg ? 'errmsg':'offscreen'} aria-live="assertive">{errMsg}</p>
//             <h1>Seller Registration Form</h1>
//             <form action="" onSubmit={handleSellerSubmit}>
//                 <label htmlFor="email">Email:</label>
//                 <input type="email" ref={userRef} id="email" autoComplete="off" onChange={(e)=>setEmail(e.target.value)} value={email} required aria-invalid={validEmail ? 'false':'true'} aria-describedby="emailnote" onFocus={()=>setEmailFocus(true)} onBlur={()=>setEmailFocus(false)} />
//                 <p id="emailnote" className={emailFocus && email && !validEmail ? 'instructions':'offscreen'}>email is invalid</p>  {/*if email is focused and email exists and email is not valid we will have instruction class else we well have offscreen class */}

//                 <label htmlFor="password">PassWord:</label>
//                 <input type="password" id="password" onChange={(e)=>setpassword(e.target.value)} value={password} required aria-invalid={validpassword ? 'false':'true'} aria-describedby="passwordnote" onFocus={()=>setCpasswordFocus(true)} onBlur={()=>setPasswordFocus(false)} />

//             </form>
//         </section>
//         </>
//     )
// }

// export default SellerRegister