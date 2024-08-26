import React, { useEffect, useRef } from "react"

interface CheckboxProps {
    labelText: string,
    isChecked: boolean,
    onCheckedHandler: () => void,
    isIndeterminate?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({labelText, isChecked, onCheckedHandler, isIndeterminate = false}) => {
    const checkboxRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(checkboxRef.current) {
            checkboxRef.current.indeterminate = isIndeterminate
        }
    }, [isIndeterminate])

    return (
        <label><input ref={checkboxRef} type="checkbox" name={labelText} checked={isChecked} onChange={onCheckedHandler} /> {labelText}</label>
    )
}

export default Checkbox