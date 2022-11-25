import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import MaskedInput from "react-text-mask";

import { useHttp } from "../../hooks/http.hook";

const EditEmployeeForm = () => {
    const { currentEmployeeId } = useSelector(state => state);
    const [employee, setEmployee] = useState({});

    const [name, setName] = useState('');
    const [isArchive, setIsArchive] = useState(false);
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthDay] = useState('');

    const { request } = useHttp();

    const roleEng = (role) => {
        switch (role) {
            case 'Водитель':
                return 'driver'
            case 'Повар':
                return 'cook'
            case 'Официант':
                return 'waiter'
            default:
                return null
        }
    }

    useEffect(() => {
        request(`http://localhost:3001/employees/${currentEmployeeId}`)
            .then(data => setEmployee(data))
            .catch(error => console.log(error));
    }, []) // eslint-disable-line



    useEffect(() => {
        if (employee) {
            const { name, isArchive, role, phone, birthday } = employee;
            console.log(isArchive)
            setName(name);
            setIsArchive(isArchive);
            setRole(role);
            setPhone(phone);
            setBirthDay(birthday);
        }
    }, [employee])

    const onSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            id: currentEmployeeId,
            name: name,
            isArchive: isArchive,
            role: roleEng(role),
            phone: phone,
            birthday: birthday
        }

        request(`http://localhost:3001/employees/${currentEmployeeId}`, "PUT", JSON.stringify(newEmployee))
            .then(res => console.log(res, 'Отправка успешна'))
            .catch(err => console.log(err))

        setName('');
        setIsArchive(false);
        setRole('');
        setPhone('');
        setBirthDay('');
    }

    return (
        <div className="app-add-form">
            <h3>Отредактируйте данные сотрудника</h3>
            <form
                className="add-form d-flex"
                onSubmit={onSubmit}
            >
                <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Имя Фамилия"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                />
                <MaskedInput
                    mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    className="form-control"
                    placeholder="Телефон"
                    guide={false}
                    id="phone"
                    name='phone'
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <MaskedInput
                    mask={[/[1-9]/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                    className="form-control"
                    placeholder="Дата рождения"
                    guide={false}
                    id="birthday"
                    name='birthday'
                    defaultValue={birthday}
                    onChange={(e) => setBirthDay(e.target.value)}
                    required
                />
                <select
                    className='form-select'
                    required
                    id='role'
                    name='role'
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option selected={'all' === role}>Выберите должность</option>
                    <option selected={'cook' === role}>Повар</option>
                    <option selected={'waiter' === role}>Официант</option>
                    <option selected={'driver' === role}>Водитель</option>
                </select>

                <span>
                    <label htmlFor="isArchive">В архиве</label>
                    <input type="checkbox" id="isArchive" onChange={(e) => setIsArchive(e.target.checked)} checked={isArchive} />
                </span>

                <button
                    type="submit"
                    className="btn btn-outline-light"
                >
                    Редактировать
                </button>

            </form >
            <NavLink to={'/'}>
                <button
                    type="button"
                    className="btn btn-outline-light"
                >
                    Вернуться к списку сотрудников
                </button>
            </NavLink>
        </div >
    )
}

export default EditEmployeeForm;