import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'
import '../../styles/brunchesPage.css'
function BrunchesPage() {
    const [brunches, setBrunches] = useState([
        {id: 1, brunchName: 'Юнусабад Универсам', brunchLocation: 'махалля Акбаробод', locationPosition: [41.363374, 69.288652]},
        {id: 2, brunchName: 'MaxWay Ройсон', brunchLocation: 'улица Заркайнар, 4', locationPosition: [41.322688, 69.241819]},
        {id: 3, brunchName: 'MaxWay Некст', brunchLocation: 'улица Бабура, 6', locationPosition: [41.297954, 69.249332]},
        {id: 4, brunchName: 'MaxWay Мукумий', brunchLocation: '1-й квартал, 1', locationPosition: [41.287808, 69.229239]},
        {id: 5, brunchName: 'Master Food Ганга', brunchLocation: 'Master Food', locationPosition: [41.325069, 69.245295]},
        {id: 6, brunchName: 'Master Food Гостиница Россия ', brunchLocation: 'улица Шота Руставели, 9А', locationPosition: [41.295056, 69.268023]},
        {id: 7, brunchName: 'MAX WAY Сайрам', brunchLocation: 'Сайрам', locationPosition: [41.371951, 69.310624]},
        {id: 8, brunchName: 'MAX WAY Максим Горький', brunchLocation: 'улица Буюк Ипак Йули, 4', locationPosition: [41.326661, 69.330004]},
        {id: 9, brunchName: 'Masterfood Сергели', brunchLocation: 'массив Сергели-VIIIА, 11', locationPosition: [41.226296, 69.219911]},
        {id: 10, brunchName: 'MAX WAY Юнусабад Фонтан', brunchLocation: '3-й квартал, 21', locationPosition: [41.363024, 69.289105]},
        {id: 11, brunchName: 'MAX WAY Минор', brunchLocation: 'MaxWay', locationPosition: [41.328014, 69.282477]},
    ])

    useEffect(() => {
        localStorage.setItem('brunchs',JSON.stringify(brunches))
        console.log('salom');
    },[])

    const onClickBrunchCard = async (item) => {
        localStorage.setItem('brunchItem',JSON.stringify(item))
    }

    return (
        <div className="brunches">
            <div className="container">
                <div className="brunches_wrapper">
                    {
                        brunches.map(item => 
                        <Link to={`${item.brunchName}`}>
                            <div className="brunches_card d_flex_between" key={item.id} onClick={()=>onClickBrunchCard(item)}>
                                <div className="brunches_name">
                                    <h2>{item.brunchName}</h2>
                                    <h5>{item.brunchLocation}</h5>
                                </div>
                                <div className="brunches_work">
                                    <h5>Часы работы</h5>
                                    <h4>Ежедневно: 11:00-03:00</h4>
                                </div>
                                <div className="brunches_icon"><AiOutlineArrowRight /></div>
                            </div>
                        
                        </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default BrunchesPage
