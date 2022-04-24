import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addPost } from "../redux/actions/PostDetail";

function CreateUserForm({ setIsOpen }) {
  const initialValues = { name: "", body: "" };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    body: Yup.string().email().required(),
  });

  const dispatch = useDispatch();

  const submitUserdetail = (values) => {
    const name = values.name;
    const body = values.body;

    dispatch(addPost(name, body));
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          submitUserdetail(values);

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            setIsOpen(false);
          }, 1000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <div className="content" style={{ width: "24rem" }}>
            <Form>
              <div className="form-input">
                Name:<br></br>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Full name"
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <span style={{ color: "red" }}>{errors.name}</span>
                ) : null}
              </div>
              <div className="form-input">
                Email:<br></br>
                <input
                  className="form-control"
                  name="body"
                  placeholder="Enter body description"
                  value={values.body}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                ></input>
                {errors.body && touched.body ? (
                  <span style={{ color: "red" }}>{errors.body}</span>
                ) : null}
              </div>

              <button
                className="add-users"
                type="submit"
                disabled={isSubmitting === true}
              >
                <div className="primary-btn text">
                  {isSubmitting ? "Wait" : "Add"}
                </div>
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default CreateUserForm;
