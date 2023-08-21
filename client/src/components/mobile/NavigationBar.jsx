import IonIcon from '@reacticons/ionicons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function AppNavigation({ data }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return(
        <div className="
            bg-white
            bottom-6
            fixed
            h-16
            left-1/2
            rounded-2xl
            shadow-mobileNav
            text-black
            transform -translate-x-1/2
            w-[95%]
            z-[9999]
            flex
            flex-row">
            
            {
                data.map((element, index) => (
                    <Link to={element.link} className="text-2xl flex items-center justify-center flex-1" key={element.text} onClick={() => setActiveIndex(index)}>
                        <IonIcon
                            className={index === activeIndex ? "text-red-500" : "text-gray-400"}
                            name={index === activeIndex ? element.iconSolid : element.iconOutline}/>
                    </Link>
                ))
            }
        </div>
    );
}
export default AppNavigation;