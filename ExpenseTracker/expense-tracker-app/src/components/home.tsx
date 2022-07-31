import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Stack, Table } from 'react-bootstrap';
import IItem from "../models/IItem";
import { getItems } from "../services/item-service";
import Expense from './add-expense';

import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
    const [items, setItems] = useState<IItem[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>();
    const [karanPaid, setKaranPaid] = useState<number>(0);
    const [arjunPaid, setArjunPaid] = useState<number>(0);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    var karanAmt: number = 0;
    var arjunAmt: number = 0;

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getItems();
                setItems(data);
                setSum(
                    data.reduce(
                        (result, currentObject) => (result = result + currentObject.price),
                        0
                    )
                );
                Shares(data);
            } catch (error: any) {
                setError(error);
            }
        };
        fetchMenu();
    }, [showAddForm]);

    const Shares = (data: IItem[]) => {
        data.map((sams) =>
            sams.payeeName === "Karan"
                ? (karanAmt = karanAmt + sams.price)
                : (arjunAmt = arjunAmt + sams.price)
        );
        setKaranPaid(karanAmt);
        setArjunPaid(arjunAmt);
    };

    const success = () => {
        setShowAddForm(false);
    };
    const cancel = () => {
        setShowAddForm(false);
    };

    const handleShow = () => {console.log("entered");setShowAddForm(true)};

    return (
        <>
            <header>Expense Tracker</header>
            <Stack>
                <Stack direction="horizontal" gap={1}>
                    <Table striped bordered hover>
                        <thead>
                            <tr id="thead">
                                <th>S.No.</th>
                                <th>Date</th>
                                <th>Nature of expense</th>
                                <th>Price</th>
                                <th>Payee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items &&
                                items.map((user, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{user.date}</td>
                                        <td>{user.expense}</td>
                                        <td>{user.price}</td>
                                        <td>{user.payeeName}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    <Button variant="success" className="mb-auto" onClick={handleShow}>
                        Add New Expense
                    </Button>
                </Stack>
                <Stack direction="horizontal">
                    <Table striped bordered hover responsive>
                        <tbody>
                            <tr id="total">
                                <td>Total</td>
                                <td>{sum}</td>
                            </tr>
                            <tr>
                                <td>Karan Paid</td>
                                <td>{karanPaid}</td>
                            </tr>
                            <tr>
                                <td>Arjun Paid</td>
                                <td>{arjunPaid}</td>
                            </tr>
                            <tr id="pending" >
                                <td>{karanPaid > arjunPaid ? "Arjun to Pay Karan " : "Karan to Pay Arjun"}</td>
                                <td>{Math.abs((karanPaid - arjunPaid) / 2)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Stack>

            </Stack>
                {showAddForm && (<Expense onTrue={success} onClose={cancel}/> )}

        </>
    );
}
export default Home;
