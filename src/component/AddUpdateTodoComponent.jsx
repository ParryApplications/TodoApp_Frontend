import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { addTodo, getTodoById, updateTodo } from "../restApis/AddUpdateTodoComponentApi";
import moment from "moment/moment";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

export default function AddUpdateTodoComponent() {

    const { id } = useParams();
    const auth = useAuth();
    const navigateTo = useNavigate();
    const [description, setDescription] = useState("");
    const [targetedDate, setTargetDate] = useState("");
    const [status, setStatus] = useState(false);

    useEffect(() => retrieveTodoOnUpdateOperation(), [id]);

    function retrieveTodoOnUpdateOperation() {
        if (id === -1)
            return;

        getTodoById(id)
            .then((res) => {
                setDescription(res.data.description);
                setTargetDate(res.data.targetedDate);
                setStatus(res.data.completed)
            })
            .catch((error) => console.error("Error fetching todo: {} ", error));
    }

    function onSubmit(values) {
        const todo = {
            description: values.description,
            targetedDate: values.targetedDate,
            completed: values.status
        }


        console.log("Submit Result :: {}", todo);

        if (id === "-1") {
            //Add new Todo:
            addTodo(todo)
                .then(res => {
                    auth.setResp("Todo Created Successfully");
                    navigateTo("/todos");
                })
                .catch(err => {
                    console.error("Error while creating new todo :: {}", err);
                    auth.setResp("Error while creating new todo");
                });
        } else {
            //Update existed Todo:
            todo.id = id;
            updateTodo(todo)
                .then(res => {
                    console.log(res);
                    auth.setResp("Todo Updated Successfully");
                    navigateTo("/todos");
                })
                .catch(err => {
                    console.error("Error while updating todo :: {}", err);
                    auth.setResp("Error while updating todo");
                });
        }
    }


    function formValidation(values) {
        let errors = {};
        const minLength = 5;
        if (values.description.length < minLength) {
            errors.description = "Description length should be greater than " + minLength;
        }

        if (values.targetedDate === null || values.targetedDate === "" || !moment(values.targetedDate).isValid()) {
            errors.targetedDate = "Invalid Target Date";
        }

        return errors;
    }

    return (
        <div className="container pt-2">
            <h2 className="p-2 bg-light mb-4">Todo Details</h2>
            <Formik
                onSubmit={onSubmit}
                validate={formValidation}
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{ description, targetedDate, status }}
                enableReinitialize={true}>
                {
                    (props) => (
                        <Form>
                            <fieldset className="from-group mb-3">
                                <label className="p-2 fw-bold">Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>

                            <fieldset className="from-group mb-3">
                                <label className="p-2 fw-bold">Target Date</label>
                                <Field type="date" className="form-control" name="targetedDate" />
                            </fieldset>

                            <fieldset className="from-group">
                                <label className="p-2 fw-bold">Status</label>
                                <Field as="select" className="form-control" name="status" value={status}>
                                    <option value="true" >Completed</option>
                                    <option value="false">Incomplete</option>
                                </Field>
                            </fieldset>

                            <ErrorMessage name="description" className="alert alert-danger m-2 mt-4" component="div" />
                            <ErrorMessage name="targetedDate" className="alert alert-danger m-2" component="div" />

                            <div>
                                <button type="submit" className="btn btn-primary mt-4 w-25">Add</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div >
    );
}