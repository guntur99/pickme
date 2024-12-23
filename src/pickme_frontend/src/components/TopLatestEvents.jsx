import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { pickme_backend } from 'declarations/pickme_backend';

// let listTime = [
//     { id: 0, val: 'Week' },
//     { id: 1, val: 'Month' },
//     { id: 2, val: '3 Month' },
//     { id: 3, val: 'Year' },
// ];

export default function TopLatesEvents() {

    // const [times, setTimes] = useState(listTime);
    const [latestEvent, setLatestEvent] = useState([]);
    const [logged] = useState(window.localStorage.getItem('logged') !== null ? true : false);

    useEffect(() => {
        pickme_backend.getAllEvent().then((res) => {
            const data = res.ok;
            const maxDate = format(new Date(), 'yyyy-MM-dd');
            const latestEvent = data.filter((event) => event.date < maxDate );
            setLatestEvent(latestEvent);
        });
    },[]);
    
    return (
        <>
            <div className="line"></div>

            <div className="container py-lg-5">
                <div className="row g-4">
                    <div className="col-12 text-lg-center mb-lg-5">
                        <div className="text-uppercase color ls-3 fw-bold mb-2">Latest Event</div>
                        <div className="hstack align-content-center justify-content-center">
                            <h2 className="display-5 fw-bold text-white mb-0">Top Latest Ordinary Event</h2>
                            {/* <div className="ms-3">
                                <select className="form-select form-select-lg color headeing-select mb-0" aria-label="example">
                                    {times.map(time => (
                                        <option key={time.id} value={time.val}>{time.val}</option>
                                    ))}
                                </select>
                            </div> */}
                        </div>
                    </div>
                    <div className="clear"></div>

                    {latestEvent.map(event => (
                        <div key={event.id} className="col-md-4">
                            <div className="card rounded-6 card-bg-dark">
                                <div className="card-body p-4">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-auto user-rank">#1</div>
                                        <div className="col-auto">
                                            <img src={event.poster} className="square square-md rounded-6" alt="..."/>
                                                <span className="position-absolute top-0 mt-1 translate-middle p-2 bg-color border-0 rounded-circle"><span className="visually-hidden">Online</span></span>
                                        </div>
                                        <div className="col">
                                            <h5 className="mb-0">
                                                <Link className="text-white" to={`/event/${event.uuid}`}>{event.title}</Link>
                                            </h5>
                                            <h6 className="card-subtitle m-2 text-white-50">${event.price}</h6>
                                        </div>
                                        {/* <div className="col-auto">
                                            <div className="dropdown">
                                                <button className="btn btn-secondary btn-sm rounded-circle bg-transparent" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi-three-dots text-light text-opacity-50"></i>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                                    <li><a className="dropdown-item" href="#">Facebook</a></li>
                                                    <li><a className="dropdown-item" href="#">Whatsapp</a></li>
                                                    <li><a className="dropdown-item" href="#">Email</a></li>
                                                </ul>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}