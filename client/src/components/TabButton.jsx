function TabButton({ className, text, onClick }) {    
    return(
        <button className={`${className} flex items-center justify-center w-1/3 font-semibold px-4 py-2 rounded-2xl text-sm`} onClick={onClick}>{text}</button>
    );
}

export default TabButton;