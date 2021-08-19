import NumberFormat from "react-number-format";

export function balanceFormatter (cell,row) {
    return (
        <span>
        <strong ><NumberFormat value={cell} displayType={'text'} thousandSeparator={","} defaultValue={0} prefix={"$"} /></strong>
        </span>
    );
};

export function soldFormatter (cell,row) {
    return (
        <span>
        <strong >{cell} Item</strong>
        </span>
    );
};

export function imageFormatter (cell,row) {
    return (
        <img src={cell[0]} style={{width : "120px",height:"80px"}}/>
    );
};