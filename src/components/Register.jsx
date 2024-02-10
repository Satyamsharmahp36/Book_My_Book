import { useState,useEffect,useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";




// making our form with the help of useForm method

function Register() {
  // using some properties of use form like , "formstate error handling" and getVlaues to approch the values of input field
  const {register,handleSubmit,formState: { errors },getValues} = useForm();  
  const [submit, setSubmit] = useState(false);
  // useing state to save the response
  const [save,setSave]=useState([]);


  const linkRef = useRef(null);

  // this state is used to make a reverse counter
  const [counter, setCounter] = useState(3);

  //this function will help to identify that wether the password and comfirm password field have same values or not
  const validateConfirmPassword = (value) => {
    const passwordValue = getValues("password"); 
    return value === passwordValue || "Passwords do not match";
  };

  // fuction to change state when we do submit and also saving it in state

  function doneSubmit(data) {
    setSave(data)
    setSubmit(true);
  }

  // function to redirect us too the main page automatically after 3 sec 



  useEffect(() => {
    if (submit && Object.keys(errors).length === 0) {
      setTimeout(() => {
        linkRef.current.click();
      }, 3000);
    }
  }, [submit, errors]);

// this is used to update the counter values when regestration is sucessfull

  useEffect(() => {
    if (submit && Object.keys(errors).length === 0) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1); // decrement the coounter timer every second
      }, 1000);

      // Clear the interval when it reaches 0
      return () => clearInterval(timer);
    }
  }, [submit, errors]);

  // here we are finding the length of error obj as if it's emplty only in that case we will show registration sucessful
  const objectLength = Object.keys(errors).length;

  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1528460033278-a6ba57020470?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover">
      {/* this button changes the url nad navigate us to home */}
      <nav className="bg-gradient-to-r from-sky-500 to-indigo-500">
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold  p-1.5 rounded m-2 ">
          Home
        </button>
      </Link>
      </nav>
      <Link to="/"  ref={linkRef}></Link>
      

      {/* showing sucessful only when submition is done and there is no errors */}

      <div className="flex items-center justify-center h-40 fixed w-svw">
        {submit && objectLength === 0 ? (
          <h1 className="text-3xl font-semibold text-center">
            Registration Successful <br />
            <span className="text-center text-sm">"You will be redirected to Home page in {counter}"</span>  
          </h1>
        ) : null}
      </div>

      <div className="p-2 flex items-center justify-center h-dvh">
        {/* in this form we have used different condition and when anything is not fullfilled then we add and error to that key */}
        <form
          onSubmit={handleSubmit(doneSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-5/6 bg-gradient-to-r
       from-cyan-500 to-blue-500 max-w-sm"
        >
          <h1 className="text-center mt-1 font-semibold text-2xl">
            Register Here
          </h1>

          {/* in this input we want input first and also it shoud be between 3 to 30 words  */}
          <input
            type="text"
            placeholder="First Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
        focus:outline-none focus:shadow-outline text-center mt-4"
            {...register("firstName", {
              required: "Enter The Name",
              minLength: {
                value: 3,
                message: "Name should be of minimum 3 words",
              },
              maxLength: {
                value: 30,
                message: "Name should be of maximum 30 words",
              },
            })}
          />
          <br />
          {/* when conditin didn't fullfil then we throw error below it */}

          <h1 className="text-center mt-1">{errors.firstName?.message}</h1>


            {/* /here in the input text thing we are using regex to validate the pattenrn of email */}
          <input
            type="email"
            placeholder="Email ID"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
        focus:outline-none focus:shadow-outline text-center mt-4"
            {...register("email", {
              required: "Enter The Email",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
          />
          <br />
          <h1 className="text-center mt-1">{errors.email?.message}</h1>

            {/* here we are adding errors then size to password is less than 10 and when it didn't have any special char which is checked bt regex */}
          <input
            type="password"
            placeholder="Enter Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
        focus:outline-none focus:shadow-outline text-center mt-4"
            {...register("password", {
              required: "Enter The Password",
              minLength: {
                value: 10,
                message: "Password should be of minimum 10 digits",
              },
              pattern: {
                    // patten of special keyword in password
                value: /[!@#$%^&*()_+{}|:"<>?/\[\];',.\\]/,
                message: "Password Should have a special character",
              },
            })}
          />
          <br />
          <h1 className="text-center">{errors.password?.message}</h1>

            {/* here we call our validate function which will compare it input with password field */}
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
        focus:outline-none focus:shadow-outline text-center mt-4"
            placeholder="Confirm Password"
            {...register("confirm", {
              required: "Confirm the Password",
              validate: validateConfirmPassword,
            })}
          />
          <br />
          <h1 className="text-center">{errors.confirm?.message}</h1>

          {/* at last this submit button will lead to call the donesubmit function which chage our state */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-white hover:bg-blue-500 text-black-700 font-semibold hover:text-white
              p-1 border border-blue-500 hover:border-transparent rounded mt-2 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
