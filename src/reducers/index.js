const initialState = {
    employees: [],
    employeesLoagingStatus: 'idle',
    filter: 'all',
    isArchive: false,
    sort: 'all',
    currentEmployee: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EMPLOYEES_FETCHING':
            return {
                ...state,
                employeesLoagingStatus: 'loading'
            }
        case 'EMPLOYEES_FETCHED':
            return {
                ...state,
                employees: action.payload,
                employeesLoagingStatus: 'idle'
            }
        case 'EMPLOYEES_ERROR':
            return {
                ...state,
                employeesLoagingStatus: 'error'
            }
        case 'FILTER_SELECT':
            console.log(action.payload);
            return {
                ...state,
                filter: action.payload
            }
        case 'ISARCHIVE_SELECT':
            console.log(action.payload)
            return {
                ...state,
                isArchive: action.payload
            }
        case 'SORT_SELECT':
            console.log(action.payload);
            return {
                ...state,
                sort: action.payload
            }
        case 'EMPLOYEE_ADD':
            return {
                ...state,
                employees: [...state.employees, action.payload]
            }
        case 'EMPLOYEE_DELETE':
            return {
                ...state,
                employees: state.employees.filter(item => item.id !== action.payload)
            }
        case 'CURRENT_EMPLOYEE_CHANGE':
            return {
                ...state,
                currentEmployeeId: action.payload
            }
        default: return state;
    }
}

export default reducer;