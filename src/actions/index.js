export const employeesFetching = () => {
    return {
        type: "EMPLOYEES_FETCHING"
    }
}

export const employeesFetched = (employees) => {
    return {
        type: "EMPLOYEES_FETCHED",
        payload: employees
    }
}

export const employeesFetchingError = () => {
    return {
        type: "EMPLOYEES_FETCHING_ERROR"
    }
}

export const filterSelect = (filter) => {
    return {
        type: "FILTER_SELECT",
        payload: filter
    }
}

export const isArchiveSelect = (isArchive) => {
    return {
        type: "ISARCHIVE_SELECT",
        payload: isArchive
    }
}

export const sortSelect = (sort) => {
    return {
        type: "SORT_SELECT",
        payload: sort
    }
}

export const employeeAdd = (employee) => {
    return {
        type: 'EMPLOYEE_ADD',
        payload: employee
    }
}

export const employeeDelete = (id) => {
    return {
        type: 'EMPLOYEE_DELETE',
        payload: id
    }
}

export const currentEmployeeChange = (id) => {
    return {
        type: 'CURRENT_EMPLOYEE_CHANGE',
        payload: id
    }
}