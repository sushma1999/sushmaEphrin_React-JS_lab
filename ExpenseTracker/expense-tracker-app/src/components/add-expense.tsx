import React, { FormEvent, ChangeEvent } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addItem } from '../services/item-service';

import 'bootstrap/dist/css/bootstrap.min.css';


type Props = {
    onTrue: any;
    onClose: any;
};

type State = {
    payeeName: string,
    expense: string,
    price: number,
    date: string,
    errors: { "payeeName": string, "expense": string, "price": string, "date": string }
};

class Expense extends React.Component<any, State> {
    constructor(props: Props) {
        super(props);
        this.state =this.getInitialState();
        this.setpayee = this.setpayee.bind(this);
        this.setProduct = this.setProduct.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.setExpenseDate = this.setExpenseDate.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    getInitialState = () => ({
        payeeName: '',
        expense: '',
        price: 0,
        date: '',
        errors: { "payeeName": '', "expense": '', "price": '', "date": '' }
    })

    reset() {
        this.setState(this.getInitialState());
    }


    setpayee = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            payeeName: event.target.value,
        });

    };

    setProduct = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            expense: event.target.value,
        });
    };

    setPrice = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            price: parseInt(event.target.value),
        });
    };

    setExpenseDate = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            date: e.target.value,
        });
    };

    submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        if (this.handleValidation()) {
            const finalData = {
                ...this.state,
            };
            const data = await addItem(finalData);
            this.reset();
            this.props.onClose && this.props.onTrue();
        }
    };

    handleValidation = () => {
        let errors = { "payeeName": '', "expense": '', "price": '', "date": '' }
        let formIsValid = true;
        if (this.state.payeeName === '') {
            formIsValid = false;
            errors["payeeName"] = "Please enter a value!";
        }
        if (!this.state.expense) {
            formIsValid = false;
            errors["expense"] = "Please enter a value!";
        }
        if (!this.state.date) {
            formIsValid = false;
            errors["date"] = "Cannot be empty";
        }
        if (!this.state.price && this.state.price <= 0) {
            formIsValid = false;
            errors["price"] = "Please enter a value greater than 0!";
        }
        this.setState({
            errors: errors
        });

        this.setState({ errors: errors });
        return formIsValid;
    }

    el = document.createElement("div");
    render() {
        const element = (
            <>
                <Modal
                    show={this.props.onTrue}
                    backdrop="static"
                    keyboard={false}
                >
                    <Form onSubmit={this.submitHandler}>
                        <Modal.Header>
                            <Modal.Title>Add New Expense</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group className="mb-3" controlId="formPerson">
                                <Form.Label>Name</Form.Label>
                                <Form.Select
                                    name="name"
                                    id="person"
                                    required
                                    value={this.state.payeeName}
                                    onChange={this.setpayee}>
                                    <option>Select Person</option>
                                    <option value="Karan">Karan</option>
                                    <option value="Arjun">Arjun</option>
                                </Form.Select>
                                <span className="error">{this.state.errors["payeeName"]}</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formExpense">
                                <Form.Label>Nature of Expense</Form.Label>
                                <Form.Control type="text" placeholder="Enter expense details"
                                    required
                                    value={this.state.expense}
                                    onChange={this.setProduct} />
                                <span className="error">{this.state.errors["expense"]}</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formExpenseAmount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="number" placeholder="Enter Amount"
                                    required
                                    value={this.state.price}
                                    onChange={this.setPrice}
                                />
                                <span className="error">{this.state.errors["price"]}</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formExpenseDate">
                                <Form.Label>Date of Expense</Form.Label>
                                <Form.Control type="date"
                                    required
                                    value={this.state.date}
                                    onChange={this.setExpenseDate}
                                />
                                <span className="error">{this.state.errors["date"]}</span>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"
                                onClick={this.props.onClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">Add</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
        return element;
    }
}


export default Expense;