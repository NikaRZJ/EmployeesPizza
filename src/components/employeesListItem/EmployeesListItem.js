import { NavLink } from 'react-router-dom';
import './EmployeesListItem.css';

const EmployeesListItem = ({ id, name, isArchive, role, phone, birthday, onDelete, onEdit }) => {
    let classNames = "list-group-item d-flex justify-content-between";
    const roleRus = () => {
        switch (role) {
            case 'driver':
                return 'Водитель'
            case 'cook':
                return 'Повар'
            case 'waiter':
                return 'Официант'
            default:
                return null
        }
    }

    return (
        <li className={classNames}>
            <span className="list-group-item-label">
                {name}
            </span>
            <span className='list-group-item-label'>
                {roleRus()}
            </span>
            <span className='list-group-item-label'>
                {phone}
            </span>
            <span className='list-group-item-label'>
                {birthday}
            </span>
            <NavLink to={'/edit'}>
                <button type='button' className='btn btn-secondary' style={{ 'marginRight': '10px' }} onClick={onEdit}>Редактировать</button>
            </NavLink>
            <button type="button" className="btn-close btn-close" aria-label="Close" onClick={onDelete}></button>
        </li >
    )
}

export default EmployeesListItem;