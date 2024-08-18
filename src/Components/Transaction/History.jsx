import { MoveToInboxSharp, MovieCreation, MovieCreationOutlined } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Server } from "../../Constants/Config";


export const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { Fromusername } = useParams();

    const Navigate = useNavigate();

    const config = {
        withCredentials: true,
    };

    

    const openHome = () => Navigate("/Dashboard");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get(`${Server}/api/v1/account/history/${Fromusername}`, config);

                if (!res.data.data) {
                    console.log("Transaction history does not exist");
                }
                setHistory(res.data.data);

                console.log("This is my history of transactions", res.data.data);
            } catch (error) {
                setError("Cannot fetch the transaction history. Please try again later.");
                console.log("Cannot fetch the transaction history", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [Fromusername]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col items-center p-4">

<div>
<Button onClick={openHome} >
<MovieCreation/>
</Button>
</div>


        <div>
        </div>
            <div className="max-w-4xl w-full bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">To</th>
                                <th className="py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((his) => (
                                <tr key={his._id}>
                                    <td className="border px-4 py-2">{his.Tousername}</td>
                                    <td className="border px-4 py-2">{his.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
