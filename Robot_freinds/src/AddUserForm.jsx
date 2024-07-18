import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeForm } from "./userSlice";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="txtin">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default function AddUserForm({ addUser }) {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [street, setStreet] = useState("");
  // const [city, setCity] = useState("");
  // const [phone, setPhone] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newUser = {
  //     id: users.length + 1,
  //     name,
  //     username,
  //     email,
  //     address: {
  //       street,
  //       city,
  //     },
  //     phone,
  //     pic: `https://robohash.org/${username}`,
  //   };
  //   addUser(newUser);
  //   dispatch(closeForm());
  // };

  return (
    <Formik
      initialValues={{
        id: "",
        pic: "",
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          city: "",
        },
        phone: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(40, "Must be 40 characters or less")
          .matches(
            /^(([a-zA-Z]+\s[a-zA-Z]+)+|[a-zA-Z]+)$/,
            "Name can only contain letters"
          )
          .required("Required"),
        username: Yup.string()
          .matches(/.*[a-zA-Z].*/, "Username should have at least 1 letter")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        phone: Yup.string()
          .matches(/^(\d+)$/, "Phone number is not valid")
          .required("Required"),
        address: Yup.object({
          street: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Street can only contain letters")
            .required("Required"),
          city: Yup.string()
            .matches(/^[a-zA-Z]+$/, "City can only contain letters")
            .required("Required"),
        }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const newUser = {
          id: users.length + 1,
          name: values.name,
          username: values.username,
          email: values.email,
          address: {
            street: values.address.street,
            city: values.address.city,
          },
          phone: values.phone,
          pic: `https://robohash.org/${values.username}`,
        };
        //////////////////////////////////////
        // fetch("https://jsonplaceholder.typicode.com/posts", {
        //   method: "POST",
        //   body: JSON.stringify(newUser),
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((json) => console.log(json))
        //   .catch((error) => console.error("Error:", error));
        ///////////////////////////////////////
        addUser(newUser);
        dispatch(closeForm());
        setSubmitting(false);
      }}
    >
      <div className="Form">
        <div className="FormContent">
          <span className="closeButton" onClick={() => dispatch(closeForm())}>
            X
          </span>
          <h2>Add New User</h2>
          <Form className="addUserForm">
            <MyTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="John Doe"
            />
            <MyTextInput
              label="Username"
              name="username"
              type="text"
              placeholder="johndoe123"
            />
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
            />
            <MyTextInput
              label="Street"
              name="address.street"
              type="text"
              placeholder="Elm"
            />
            <MyTextInput
              label="City"
              name="address.city"
              type="text"
              placeholder="Springfield"
            />
            <MyTextInput
              label="Phone"
              name="phone"
              type="text"
              placeholder="1234567890"
            />
            <button type="submit">Add User</button>
          </Form>
        </div>
      </div>
    </Formik>
  );
}
