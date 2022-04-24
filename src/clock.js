import {useEffect, useState} from "react";
import moment from "moment"

export default function Clock({id, timeZone, offset, onCloseClick}) {
    let [time, setTime] = useState(null)
    let timeoutID

    useEffect(() => {
        intervalSetTime()
    }, [])

    useEffect(() => {
        timeoutID = setTimeout(intervalSetTime, 1000)
        return () => {
            clearTimeout(timeoutID)
        }
    }, [time])

    function intervalSetTime() {
        setTime(moment().utc().add(Number(offset), 'h').format('HH:mm:ss'))
    }

    function closeClick(e) {
        onCloseClick(e.currentTarget.dataset.key)
    }

    return (
        time === null ? <></> :
            <div className={"clock"}>
                <span className="close" data-key={id} onClick={closeClick}> X </span>
                <div className={"clock-time-zone"}>{timeZone}</div>
                <span>{time}</span>
            </div>
    )
    // return (
    //     <article className="clock">
    //         <div className="hours-container">
    //             <div className="hours"></div>
    //         </div>
    //         <div className="minutes-container">
    //             <div className="minutes"></div>
    //         </div>
    //         <div className="seconds-container">
    //             <div className="seconds"></div>
    //         </div>
    //     </article>)
}