import AppInfo from '../components/appInfo/AppInfo';
import AppFilter from '../components/appFilter/AppFilter';
import EmployeesAddForm from '../components/employeesAddForm/EmployeesAddForm';
import EmployeesList from '../components/employeesList/EmployeesList';

const MainPage = () => {
    return (
        <div className='app'>
            <AppInfo />
            <div className="search-panel">
                <AppFilter />
            </div>
            <EmployeesAddForm />
            <EmployeesList />

        </div>
    );
}

export default MainPage;