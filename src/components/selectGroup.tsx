import { ChangeEventHandler } from "react"

export const SelectGroup = ({ value, onChange, groups }: { value: string, onChange: ChangeEventHandler<HTMLSelectElement>, groups: string[]}) => {
    return <>
        <label>Grupo</label>
        <select
            id='group'
            data-testid='group'
            value={value}
            onChange={onChange}
        >
            <option value="">
                Todos
            </option>
            {groups.map(group => <option value={group} key={group}>{`Grupo ${group}`}</option>)}
        </select>
    </>
}
