import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { BottomWarning } from '../Components/Transaction/BottomWarning';
import { Server } from "../Constants/Config";


export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Extract id, username, and fullname from query parameters
    const _id = searchParams.get("id");

// ------------------------------------------------------------------
    // const username = searchParams.get("username");
    // const fullname = searchParams.get("fullname");
// ------------------------------------------------------------------

    const [amount, setAmount] = useState(0);


    console.log("This is my id" ,_id);
 
    const config = {
        withCredentials: true,
        // headers: {
        //   "Content-Type": "application/json",
        // },
      };

    const initiateTransfer = async() => {

        if( amount <= 0){
            console.log("Amount must be valid ");
            return ;
        }
        try {
            const response =  await axios.post(`${Server}/api/v1/account/transfer`,
             {       

                to:_id,
                amount:Number(amount)
            },
            config
            )

            console.log("Transfer successfull" , response.data);
            navigate("/home") 



            
        } catch (error) {
            console.log("Error in transfrering money");
        }
    }

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                             
                                {/* <span className="text-2xl text-white">{
                                    fullname[0].toUpperCase()
                                    }</span> */}

                                    <span className="text-2xl text-white">{_id}</span>
                                
                            </div>
                            {/* <h3 className="text-2xl font-semibold">{fullname}</h3> */}
                            <h3 className="text-2xl font-semibold">{_id}</h3>
                            {/* <h3 className="text-2xl font-semibold">{username}</h3> */}

                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    value={amount}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={initiateTransfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                                <BottomWarning label={"Already have an account?"} buttonText={"Dashboard"} to={"/Dashboard"} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
