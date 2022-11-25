import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MaskedInput from 'react-text-mask';
import { v4 as uuidv4 } from 'uuid';
import { employeeAdd } from '../../actions';

import { useHttp } from '../../hooks/http.hook';
import './EmployeesAddForm.scss';

const EmployeesAddForm = () => {
    const [name, setName] = useState('');
    const [isArchive, setIsArchive] = useState(false);
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthDay] = useState('');

    const dispatch = useDispatch();
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

    const onSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            id: uuidv4(),
            name: name,
            isArchive: isArchive,
            role: roleEng(role),
            phone: phone,
            birthday: birthday
        }

        request('http://localhost:3001/employees', "POST", JSON.stringify(newEmployee))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(employeeAdd(newEmployee)))
            .catch(err => console.log(err))

        setName('');
        setIsArchive(false);
        setRole('');
        setPhone('');
        setBirthDay('');
    }

    return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <form
                className="add-form d-flex"
                onSubmit={onSubmit}
            >
                <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Имя Фамилия"
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    value={name}
                />
                <MaskedInput
                    mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    className="form-control"
                    placeholder="Телефон"
                    guide={false}
                    id="phone"
                    name='phone'
                    value={phone}
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
                    value={birthday}
                    onChange={(e) => setBirthDay(e.target.value)}
                    required
                />
                <select
                    className='form-select'
                    required
                    id='role'
                    name='role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option>Выберите должность</option>
                    <option>Повар</option>
                    <option>Официант</option>
                    <option>Водитель</option>
                </select>

                <span>
                    <label htmlFor="isArchive">В архиве</label>
                    <input type="checkbox" id="isArchive" checked={isArchive} onChange={(e) => setIsArchive(e.target.checked)} />
                </span>

                <button
                    type="submit"
                    className="btn btn-outline-light"
                >
                    Добавить
                </button>
            </form>
        </div>
    )
}

export default EmployeesAddForm;