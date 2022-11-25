import { useDispatch, useSelector } from 'react-redux';
import { filterSelect, isArchiveSelect, sortSelect } from '../../actions';

const AppFilter = () => {
    const { filter, sort } = useSelector(state => state);
    const buttonsData = [
        { name: 'all', label: 'Все сотрудники' },
        { name: 'cook', label: 'Повара' },
        { name: 'waiter', label: 'Официанты' },
        { name: 'driver', label: 'Водители' }
    ];

    const sortData = [
        { name: 'all', label: 'Без сортировки' },
        { name: 'name', label: 'По имени' },
        { name: 'birthday', label: 'По дате рождения' }
    ]

    const sortButtons = sortData.map(({ name, label }) => {
        const active = sort === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light'
        return (
            <button
                className={`btn ${clazz}`}
                type="button"
                key={name}
                onClick={() => dispatch(sortSelect(name))}
            >
                {label}
            </button>
        )
    })

    const dispatch = useDispatch();

    const buttons = buttonsData.map(({ name, label }) => {
        const active = filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light'
        return (
            <button
                className={`btn ${clazz}`}
                type="button"
                key={name}
                onClick={() => dispatch(filterSelect(name))}
            >
                {label}
            </button>
        )
    })

    return (
        <>
            <div>
                {buttons}
            </div>
            <div>
                <label htmlFor="archive" style={{ 'margin': '0 10px', 'paddingTop': '' }}>В архиве</label>
                <input type="checkbox" id="archive" onChange={(e) => dispatch(isArchiveSelect(e.target.checked))} />
            </div>
            <div>
                Сортировка: {sortButtons}
            </div>
        </>

    )
}

export default AppFilter;