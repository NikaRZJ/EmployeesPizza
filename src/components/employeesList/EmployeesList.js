import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { currentEmployeeChange, employeeDelete, employeesFetched, employeesFetching, employeesFetchingError } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import EmployeesListItem from "../employeesListItem/EmployeesListItem";
import Spinner from "../spinner/Spinner";
import './EmployeesList.css';


const EmployeesList = () => {
    const { employees, employeesLoagingStatus, filter, isArchive, sort } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(employeesFetching());
        request("http://localhost:3001/employees")
            .then(data => dispatch(employeesFetched(data)))
            .catch(() => dispatch(employeesFetchingError()))
    }, []) // eslint-disable-line


    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/employees/${id}`, 'DELETE')
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(employeeDelete(id)))
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [employees])

    const onEdit = (id) => {
        dispatch(currentEmployeeChange(id))
    }

    if (employeesLoagingStatus === 'loading') {
        return <Spinner />
    } else if (employeesLoagingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const sortItems = (arr) => {
        switch (sort) {
            case 'all':
                return arr;
            case 'name':
                return arr.sort((prev, next) => { // eslint-disable-line
                    if (prev.name < next.name) return -1;
                    if (prev.name > next.name) return 1;
                })
            case 'birthday':
                return arr.sort((prev, next) => { // eslint-disable-line
                    const prevDate = new Date(prev.birthday.split('.').reverse().join('-'));
                    const nextDate = new Date(next.birthday.split('.').reverse().join('-'));
                    if (prevDate < nextDate) return -1;
                    if (prevDate > nextDate) return 1;
                })
            default:
                return null
        }
    }

    const renderEmployeesList = (arr) => {
        let visibleArr = [...arr];
        if (visibleArr.length === 0) {
            return <h5 className="text-center mt-5">Работников пока нет</h5>
        }
        visibleArr = sortItems(visibleArr);
        // console.log(visibleArr);

        if (isArchive) {
            visibleArr = visibleArr.filter(item => item.isArchive)
        }
        switch (filter) {
            case 'all':
                return visibleArr.map(({ id, ...props }) => {
                    return <EmployeesListItem key={id} {...props} onDelete={() => onDelete(id)} onEdit={() => onEdit(id)} />
                })
            case 'cook':
                visibleArr = visibleArr.filter(item => item.role === 'cook');
                return visibleArr.map(({ id, ...props }) => {
                    return <EmployeesListItem key={id} {...props} onDelete={() => onDelete(id)} onEdit={() => onEdit(id)} />
                })
            case 'waiter':
                visibleArr = visibleArr.filter(item => item.role === 'waiter');
                return visibleArr.map(({ id, ...props }) => {
                    return <EmployeesListItem key={id} {...props} onDelete={() => onDelete(id)} onEdit={() => onEdit(id)} />
                })
            case 'driver':
                visibleArr = visibleArr.filter(item => item.role === 'driver');
                return visibleArr.map(({ id, ...props }) => {
                    return <EmployeesListItem key={id} {...props} onDelete={() => onDelete(id)} onEdit={() => onEdit(id)} />
                })
            default:
                return null
        }

    }

    const elements = renderEmployeesList(employees);
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;