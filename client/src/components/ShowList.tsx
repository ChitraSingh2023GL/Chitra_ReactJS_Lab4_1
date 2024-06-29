import { useEffect, useState } from "react";
import IDataList from "../models/IDataList";
import '../App.css';
import ExpenseTracker from "./ExpenseTrackerForm";
import { getItemData } from "../services/ItemService";
import ExpenseTrackerForm from "./ExpenseTrackerForm";

export default function ShowData(){

    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [sum, setSum] = useState<number|null>(0);
    const [chitraSpent, setChitraSpent] =  useState<number>(0);
    const [raniSpent, setRaniSpent] =  useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(()=>{
        const fetchMenu = async () => {
            try{
                const data = await getItemData();
                console.log(data);
                setItems(data);
                // data.reduce
                setSum(data.reduce((result,v) =>  result + v.price , 0 ))
                calculateOnItems(data);
               
            }
            catch(error: any){
                console.error(error);
                setError(error);
            }
        }
        fetchMenu();
    },[showForm]);
 
    const calculateOnItems = (data: IDataList[]) => {
        // Use data.map... 
        // figure out how much rahul, ramesh spent
        // setRahulSpent
        //setRameshSpent
        var chitraspent1 : number = 0
        var ranispent1 : number = 0
        data.map(
            sams => (
                sams.payeeName === "Chitra" ? (
                    chitraspent1 = chitraspent1 + sams.price
                ):
                (
                    ranispent1 = ranispent1 + sams.price
                )
            )
        )
        setChitraSpent(chitraspent1)
        setRaniSpent(ranispent1)
        setSum(chitraspent1+ranispent1)
    }

    const getTableHeader=()=>{
        return(
            <>
              
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline payee header-color">Payee</div>
                <div className="use-inline date header-color">Date</div>
            </>
        )
    }
    const renderExpense=(expense:IDataList)=>{
        return(
            <>
               
                <div className="use-inline header-color" style={{backgroundColor:'rgb(230, 137, 15)'}}>{expense.product}</div>
                <div className="use-inline price header-color" style={{backgroundColor:'rgb(163, 103, 219)'}}>{expense.price}</div>
                <div className={'use-inline payee header-color expense.payeeName}'}  style={{backgroundColor:'rgb(10, 253, 172)'}}>{expense.payeeName}</div>
                <div className="use-inline date header-color" style={{backgroundColor:'rgb(230, 137, 15)'}}>{expense.setDate}</div>
            </>
        )
    }
    const renderSummary=()=>{
        return(
        
        <>
            <div className="use-inline ">Total: </div>
        <span className="use-inline total">{sum}</span> <br />
        <div className="use-inline ">Chitra paid: </div>
        <span className="use-inline total Chitra">{chitraSpent}</span> <br />
        <div className="use-inline ">Rani paid: </div>
        <span className="use-inline total Rani">{raniSpent}</span> <br />
        <span className="use-inline payable">{chitraSpent>raniSpent? "Pay Chitra " : "Pay Rani"}</span>
        <span className="use-inline payable price"> {Math.abs((chitraSpent-raniSpent)/2)}</span>
        </>
        
    )


    }
    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            {/* Add button */}
            <button id="Add-Button" onClick={()=>setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <ExpenseTrackerForm onTrue={()=>setShowForm(false)} onClose={()=>setShowForm(false)}></ExpenseTrackerForm>
                    </div>
                )
            } 
            {
                getTableHeader()
        }

            {
                items && items.map((expense)=>renderExpense(expense))
                
            }
            
        <hr/>
        { renderSummary()}
         {
               error && (
                    <>
                        {error?.message}
                    </>
                )
            }  
        </>
    );
}