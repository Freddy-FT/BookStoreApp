export default function TrueOrFalse({label, value}) {
    if (value === true) {
        return (
            <>
            <div>{label} True</div>
            </>
        )
    }
    else if (value === false){
        return (
            <>
            <div>{label} False</div>
            </>
        )
    }
    else {
        return (
            <>
            <div>You are not allowed to see that</div>
            </>
        )
    }
}

